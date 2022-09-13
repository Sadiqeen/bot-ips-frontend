<template>
    <section class="mt-5">
        <div class="title"><b-icon icon="cog-outline" /> ตั้งค่า</div>

        <div class="box my-5 has-background-primary p-2">
            <div class="box">
                <form @submit.prevent="submitForm()">
                    <div class="columns mb-5">
                        <div class="column is-6 mx-auto">
                            <b-field
                                label="ชื่อ"
                                :type="formErrors('name')"
                                :message="formErrors('name', true)"
                            >
                                <b-input
                                    value=""
                                    v-model="form.name"
                                    required
                                ></b-input>
                            </b-field>

                            <b-field
                                label="คีย์"
                                :type="formErrors('key')"
                                :message="formErrors('key', true)"
                            >
                                <b-input
                                    value=""
                                    v-model="form.key"
                                    required
                                ></b-input>
                            </b-field>

                            <b-field
                                label="ข้อมูล"
                                :type="formErrors('value')"
                                :message="formErrors('value', true)"
                            >
                                <b-input
                                    maxlength="200"
                                    type="textarea"
                                    v-model="form.value"
                                    required
                                ></b-input>
                            </b-field>
                            <b-button
                                type="is-success"
                                native-type="submit"
                                class="is-fullwidth"
                                :disabled="form_loading"
                            >
                                เข้าสู่ระบบ
                            </b-button>
                        </div>
                    </div>
                </form>

                <ConfigTable :table_reload="table_index"></ConfigTable>
            </div>
        </div>
    </section>
</template>

<script>
import ConfigTable from "~/components/ConfigTable.vue";

export default {
    name: "Config",
    middleware: "auth",

    data() {
        return {
            form: {
                name: "",
                key: "",
                value: "",
            },
            form_errors: {},
            form_loading: false,
            table_index: 0,
        };
    },

    components: {
        ConfigTable,
    },

    mounted() {},

    methods: {
        async submitForm() {
            this.form_loading = true;

            try {
                const response = await this.$axios.post("config", this.form);

                if (response.data.status == "success") {
                    this.$buefy.toast.open({
                        message: "บันทึกข้อมูลเสร็จสิ้น!!",
                        type: "is-success",
                    });
                }

                this.resetForm();
                this.form_errors = {};
                this.reloadTable();
            } catch (e) {
                if (e.response.status == 422) {
                    this.form_errors = e.response.data;
                } else {
                    console.error(e);

                    this.$buefy.toast.open({
                        message: "มีข้อผิดพลาด!!",
                        type: "is-danger",
                    });
                }
                this.is_loading = false;
            }

            this.form_loading = false;
        },

        resetForm() {
            this.form = {
                name: "",
                key: "",
                value: "",
            };
        },

        formErrors(field, messages = false) {
            if (this.form_errors.hasOwnProperty(field)) {
                return messages ? this.form_errors[field][0] : "is-danger";
            }
        },

        reloadTable() {
            this.table_index++;
        },
    },
};
</script>
