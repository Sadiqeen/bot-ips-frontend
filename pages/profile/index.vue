<template>
    <section class="mt-5">
        <h3 class="title"><b-icon icon="account" /> แก้ไขโปรไฟล์</h3>

        <div class="box mt-5 has-background-primary">
            <div class="box">
                <div class="columns is-centered">
                    <div class="column is-6">
                        <form @submit.prevent="submit">
                            <b-field label="รหัสผ่านใหม่">
                                <b-input type="password"></b-input>
                            </b-field>
                            <b-field label="กรอกรหัสผ่านอีกครั้ง">
                                <b-input type="password"></b-input>
                            </b-field>

                            <div class="is-flex is-justify-content-center">
                                <b-button type="is-success" native-type="submit" :disabled="is_loading"
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
                password : "",
                confirmPassword : "",
            },
            is_loading: false,
        }
    },

    methods: {
        async submit() {
            const delay = ms => new Promise(res => setTimeout(res, ms));

            this.is_loading = true;

            this.$buefy.toast.open("กำลังส่งข้อมูล...");
            await delay(2000);

            this.is_loading = false;
        },
    },
};
</script>
