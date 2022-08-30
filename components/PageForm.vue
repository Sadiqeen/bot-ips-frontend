<template>
    <div class="">
        <form @submit.prevent="submit">
            <b-field
                label="ชื่อเพจ"
                :type="formErrors('name')"
                :message="formErrors('name', true)"
            >
                <b-input v-model="formData.name" :disabled="readonly" required></b-input>
            </b-field>
            <b-field
                label="ลิ้งค์เพจ"
                :type="formErrors('url')"
                :message="formErrors('url', true)"
            >
                <b-input v-model="formData.url" :disabled="readonly" required></b-input>
            </b-field>
            <b-field
                label="เพจไอดี"
                :type="formErrors('page_id')"
                :message="formErrors('page_id', true)"
            >
                <b-input v-model="formData.page_id" :disabled="readonly" required></b-input>
            </b-field>
            <b-field
                label="โทเค็น"
                :type="formErrors('token')"
                :message="formErrors('token', true)"
            >
                <b-input v-model="formData.token" type="textarea" :disabled="readonly" required></b-input>
            </b-field>

            <div class="is-flex is-justify-content-center" v-if="!readonly">
                <b-button
                    type="is-success"
                    native-type="submit"
                    :disabled="is_loading"
                    >บันทึก</b-button
                >
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        preDefined: {
            type: Object,
            required: true,
        },
        submitTo: {
            type: String,
            required: true,
        },
        readonly: {
            type: Boolean,
            required: false,
            default: false,
        }
    },

    data() {
        return {
            formData: {},
            is_loading: false,
            form_errors: {},
            error: "",
        };
    },

    mounted() {
        this.formData = this.preDefined;
    },

    methods: {
        async submit() {
            this.is_loading = true;
            this.form_errors = {};

            try {
                const response = await this.$axios.post(this.submitTo , {
                    name: this.formData.name,
                    url: this.formData.url,
                    page_id: this.formData.page_id,
                    token: this.formData.token,
                });

                if (response.data.status == "success") {
                    this.$buefy.toast.open({
                        message: "บันทึกข้อมูลเสร็จสิ้น!!",
                        type: "is-success",
                    });

                    this.$router.push({ name: "page" });
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

        formErrors(field, messages = false) {
            if (this.form_errors.hasOwnProperty(field)) {
                return messages ? this.form_errors[field][0] : "is-danger";
            }
        },
    },
};
</script>
