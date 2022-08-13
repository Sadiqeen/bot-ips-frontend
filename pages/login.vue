<template>
    <section>
        <div class="columns is-centered mt-5">
            <div class="column is-6">
                <form @submit.prevent="login()">
                    <div class="box">
                        <div class="notification is-danger" v-if="error">
                            {{ error }}
                        </div>

                        <b-field
                            label="Email"
                            :type="formErrors('email')"
                            :message="formErrors('email', true)"
                        >
                            <b-input type="email" v-model="email"></b-input>
                        </b-field>

                        <b-field
                            label="Password"
                            :type="formErrors('password')"
                            :message="formErrors('password', true)"
                        >
                            <b-input
                                type="password"
                                v-model="password"
                            ></b-input>
                        </b-field>

                        <b-button
                            type="is-success"
                            native-type="submit"
                            class="is-fullwidth"
                            :disabled="is_loading"
                        >
                            เข้าสู่ระบบ
                        </b-button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    middleware: "guest",

    data() {
        return {
            email: "",
            password: "",
            is_loading: false,
            form_errors: {},
            error: "",
        };
    },

    methods: {
        async login() {
            this.is_loading = true;
            this.form_errors = {};
            this.error = "";

            try {
                await this.$auth.loginWith("laravelJWT", {
                    data: {
                        email: this.email,
                        password: this.password,
                    },
                });
                this.$router.push("/");
            } catch (e) {
                if (e.response.status == 422) {
                    this.form_errors = e.response.data;
                } else {
                    this.error = e.response.data.message;
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
