<template>
    <form @submit.prevent="scrapData">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">ดึงข้อมูลอำเภอ</p>
                <button type="button" class="delete" @click="$emit('close')" />
            </header>
            <section class="modal-card-body">
                <b-field label="ไอดีจังหวัด">
                    <b-input type="text" v-model="form.province_id" required>
                    </b-input>
                </b-field>

                <b-field label="ไอดีอำเภอที่เริ่ม">
                    <b-input
                        type="text"
                        v-model="form.first_district_id"
                        required
                    >
                    </b-input>
                </b-field>

                <b-field label="ไอดีอำเภอสุดท้าย">
                    <b-input
                        type="text"
                        v-model="form.last_district_id"
                        required
                    >
                    </b-input>
                </b-field>
            </section>
            <footer class="modal-card-foot is-centered">
                <b-button label="ปิด" @click="$emit('close')" />
                <b-button
                    label="ดึงข้อมูล"
                    type="is-primary"
                    native-type="submit"
                    :disabled="is_loading"
                />
            </footer>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        page_id: {
            type: Number | String,
            required: true,
        },
    },

    data() {
        return {
            form: {
                province_id: "",
                first_district_id: "",
                last_district_id: "",
            },
            is_loading: false,
            form_errors: {},
        };
    },

    methods: {
        async scrapData() {
            this.is_loading = true;
            this.form_errors = {};

            this.$buefy.toast.open({
                message: "กำลังดึงข้อมูล!!",
                type: "is-success",
            });

            const scrapRoute = "scrap-district";

            try {
                const response = await this.$axios.post(scrapRoute, {
                    page_id: this.page_id,
                    province_id: this.form.province_id,
                    first_district_id: this.form.first_district_id,
                    last_district_id: this.form.last_district_id,
                });

                if (response.data.status == "success") {
                    this.$buefy.toast.open({
                        message: "บันทึกข้อมูลเสร็จสิ้น!!",
                        type: "is-success",
                    });

                    this.form = {
                        province_id: "",
                        first_district_id: "",
                        last_district_id: "",
                    };

                    this.is_loading = false;
                    this.$emit('close');
                    this.$emit('updateDistrictTable');
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
            }
        },
    },
};
</script>
