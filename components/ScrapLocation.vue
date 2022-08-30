<template>
    <form @submit.prevent="scrapData">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">ดึงข้อมูลอำเภอ</p>
                <button type="button" class="delete" @click="$emit('close')" />
            </header>
            <section class="modal-card-body">
                <b-field label="ไอดีจังหวัด">
                    <b-numberinput
                        type="is-success"
                        v-model="form.province_id"
                        min="0"
                        max="999"
                        required
                    >
                    </b-numberinput>
                </b-field>

                <b-field label="ไอดีอำเภอที่เริ่ม">
                    <b-numberinput
                        type="is-success"
                        v-model="form.first_district_id"
                        min="0"
                        max="999"
                        required
                    >
                    </b-numberinput>
                </b-field>

                <b-field label="ไอดีอำเภอสุดท้าย">
                    <b-numberinput
                        type="is-success"
                        v-model="form.last_district_id"
                        min="0"
                        max="999"
                        required
                    >
                    </b-numberinput>
                </b-field>
            </section>
            <footer
                class="modal-card-foot is-flex is-justify-content-space-between"
            >
                <b-button
                    label="ปิด"
                    type="is-danger"
                    @click="$emit('close')"
                />

                <div class="">
                    <b-button
                        tag="a"
                        type="is-link"
                        label="Muslim pro"
                        href="https://prayertime.muslimthaipost.com/index.php"
                        target="_blank"
                        outlined
                    />
                    <b-button
                        label="ดึงข้อมูล"
                        type="is-primary"
                        native-type="submit"
                        :disabled="is_loading"
                    />
                </div>
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
                province_id: 0,
                first_district_id: 0,
                last_district_id: 0,
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
                    this.$emit("close");
                    this.$emit("updateDistrictTable");
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
