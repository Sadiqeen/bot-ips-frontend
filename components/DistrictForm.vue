<template>
    <section>
        <form @submit.prevent="submit">
            <div class="columns is-centered">
                <div class="column is-3">
                    <b-field
                        label="อำเภอ"
                        :type="formErrors('name')"
                        :message="formErrors('name', true)"
                    >
                        <b-input v-model="form.name"></b-input>
                    </b-field>
                </div>
                <div class="column is-3">
                    <b-field
                        label="ละติจูด"
                        :type="formErrors('lat')"
                        :message="formErrors('lat', true)"
                    >
                        <b-input v-model="form.lat"></b-input>
                    </b-field>
                </div>
                <div class="column is-3">
                    <b-field
                        label="ลองจิจูด"
                        :type="formErrors('long')"
                        :message="formErrors('long', true)"
                    >
                        <b-input v-model="form.long"></b-input>
                    </b-field>
                </div>
                <div class="column is-1">
                    <b-field label="###">
                        <b-button
                            type="is-primary"
                            native-type="submit"
                            :disabled="is_loading"
                        >
                            <b-icon icon="plus-circle-outline"></b-icon>
                        </b-button>
                    </b-field>
                </div>
            </div>
        </form>

        <section>
            <DistrictTable
                :page_id="page_id"
                :table_reload="table_index"
            ></DistrictTable>
        </section>
    </section>
</template>

<script>
import DistrictTable from "~/components/DistrictTable";

export default {
    props: {
        page_id: {
            type: Number | String,
            required: true,
        },
        table_reload: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            form: {
                name: "",
                lat: "",
                long: "",
            },
            is_loading: false,
            form_errors: {},
            table_index: 0,
        };
    },
    watch: {
        table_reload: function (newVal, oldVal) {
            this.reloadTable();
        },
    },
    methods: {
        async submit() {
            this.is_loading = true;
            this.form_errors = {};

            const storeRoute = "district/" + this.page_id + "/store/";

            try {
                const response = await this.$axios.post(storeRoute, {
                    name: this.form.name,
                    lat: this.form.lat,
                    long: this.form.long,
                });

                if (response.data.status == "success") {
                    this.$buefy.toast.open({
                        message: "บันทึกข้อมูลเสร็จสิ้น!!",
                        type: "is-success",
                    });

                    this.form = {
                        name: "",
                        lat: "",
                        long: "",
                    };

                    this.is_loading = false;
                    this.reloadTable();
                }
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
                this.password = "";
            }
        },

        reloadTable() {
            this.table_index++;
        },

        formErrors(field, messages = false) {
            if (this.form_errors.hasOwnProperty(field)) {
                return messages ? this.form_errors[field][0] : "is-danger";
            }
        },
    },

    components: {
        DistrictTable,
    },
};
</script>
