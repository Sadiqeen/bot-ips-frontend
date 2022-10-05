<template>
    <section class="py-5">
        <h3 class="title"><b-icon icon="account" /> แก้ไขโปรไฟล์</h3>

        <div class="box mt-5 has-background-primary p-2">
            <div class="box">
                <div class="columns is-centered">
                    <div class="column is-6">
                        <form @submit.prevent="submit">
                            <b-field
                                label="รหัสผ่านใหม่"
                                :type="formErrors('password')"
                                :message="formErrors('password', true)"
                            >
                                <b-input
                                    type="password"
                                    v-model="formData.password"
                                    required
                                ></b-input>
                            </b-field>
                            <b-field
                                label="กรอกรหัสผ่านอีกครั้ง"
                                :type="formErrors('password_confirmation')"
                                :message="
                                    formErrors('password_confirmation', true)
                                "
                            >
                                <b-input
                                    type="password"
                                    v-model="formData.password_confirmation"
                                    required
                                ></b-input>
                            </b-field>

                            <div class="is-flex is-justify-content-center">
                                <b-button
                                    type="is-success"
                                    native-type="submit"
                                    :disabled="is_loading"
                                    >บันทึก</b-button
                                >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    middleware: "auth",

    data() {
        return {
            formData: {
                password: "",
                password_confirmation: "",
            },
            form_errors: {},
            is_loading: false,
        };
    },

    methods: {
        async submit() {
            this.is_loading = true;
            this.form_errors = {};

            this.$buefy.toast.open("กำลังส่งข้อมูล...");

            try {
                const response = await this.$axios.post(
                    "change-password",
                    this.formData
                );

                if (response.data.status == "success") {
                    this.$buefy.toast.open({
                        message: "บันทึกข้อมูลเสร็จสิ้น!!",
                        type: "is-success",
                    });

                    this.formData = {
                        password: "",
                        password_confirmation: "",
                    };
                }
            } catch (e) {
                console.log(e)
                if (e.response.status == 422) {
                    this.form_errors = e.response.data;
                } else {
                    console.error(e);

                    this.$buefy.toast.open({
                        message: "มีข้อผิดพลาด!!",
                        type: "is-danger",
                    });
                }
            }

            this.is_loading = false;
        },

        formErrors(field, messages = false) {
            if (this.form_errors.hasOwnProperty(field)) {
                return messages ? this.form_errors[field][0] : "is-danger";
            }
        },
    },
};
</script>
