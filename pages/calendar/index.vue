<template>
    <section class="my-5">
        <h3 class="title"><b-icon icon="calendar" /> ปฏิทิน</h3>

        <div class="box mt-5 has-background-primary">
            <div class="is-flex-desktop">
                <div class="">
                    <b-datepicker
                        inline
                        v-model="date"
                        :indicators="indicators"
                        locale="TH"
                        :min-date="calendar.min"
                        :max-date="calendar.max"
                    >
                    </b-datepicker>

                    <div class="box my-2 mb-desktop-0">
                        <div class="date-form" v-if="date">
                            <div class="is-flex is-flex-direction-column">
                                <span>{{ dateFormat(date) }}</span>
                                <small class="has-text-grey-light">{{
                                    1 +
                                    " " +
                                    next_month[0] +
                                    " " +
                                    next_month[2]
                                }}</small>
                            </div>

                            <b-button
                                @click="submitStartMountDate(date)"
                                type="is-danger"
                                class="is-pulled-right"
                                size="is-small"
                                label="บันทึก"
                                :disabled="is_submit_date_loading"
                            />
                        </div>

                        <div class="" v-else>
                            <b-skeleton animated></b-skeleton>
                            <b-skeleton animated></b-skeleton>
                        </div>
                    </div>
                </div>
                <div class="is-fullwidth box ml-desktop-5">
                    <b-table
                        :data="data"
                        :loading="is_loading"
                        mobile-cards
                        striped
                        hoverable
                        :default-sort="['id', 'desc']"
                    >
                        <b-table-column
                            field="id"
                            label="ไอดี"
                            numeric
                            centered
                            sortable
                            v-slot="props"
                        >
                            {{ props.row.id }}
                        </b-table-column>

                        <b-table-column
                            field="month_th"
                            label="ฮิจเราะห์"
                            centered
                            v-slot="props"
                        >
                            <span class="has-text-grey-light"
                                >--{{ props.row.month_num }}--</span
                            >
                            {{ props.row.month_th }} {{ props.row.year }}
                        </b-table-column>

                        <b-table-column
                            field="international"
                            label="วันสากล"
                            centered
                            v-slot="props"
                        >
                            {{ dateFormat(props.row.international) }}
                        </b-table-column>

                        <b-table-column label="###" centered v-slot="props">
                            <b-button
                                @click="
                                    deleteDate(
                                        props.row.deletable,
                                        props.row.id
                                    )
                                "
                                :type="
                                    props.row.deletable
                                        ? 'is-danger'
                                        : 'is-light'
                                "
                                size="is-small"
                                :icon-right="
                                    props.row.deletable
                                        ? 'delete-forever'
                                        : 'lock'
                                "
                                :disabled="!props.row.deletable"
                            />
                        </b-table-column>
                    </b-table>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    computed: {
        indicators() {
            return this.bars ? "bars" : "dots";
        },
    },
    data() {
        return {
            date: null,
            calendar: {
                min: new Date(),
                max: new Date(),
            },
            bars: false,
            data: [],
            is_loading: false,
            next_month: [],
            is_submit_date_loading: false,
        };
    },

    mounted() {
        this.initTable();
    },

    methods: {
        async initTable() {
            this.is_loading = true;

            try {
                const response = await this.$axios.$get("hijris");
                if (response.status == "success") {
                    this.data = response.data.data;
                    this.next_month = response.data.nextMonth;
                    this.date = this.calendar.min = this.$dayjs(
                        response.data.probable[0],
                        "YYYY-MM-DD"
                    ).toDate();
                    this.calendar.max = this.$dayjs(
                        response.data.probable[1],
                        "YYYY-MM-DD"
                    ).toDate();
                }
            } catch (e) {
                console.error(e);

                this.$buefy.toast.open({
                    message: "มีข้อผิดพลาด!!",
                    type: "is-danger",
                });
            }

            this.is_loading = false;
        },

        async deleteDate(deletable, id) {
            if (!deletable) {
                this.$buefy.toast.open({
                    message: "ไม่สามารถลบข้อมูลนี้ได้!!",
                    type: "is-danger",
                });

                return;
            }

            this.$buefy.toast.open("กำลังส่งข้อมูล...");

            try {
                const response = await this.$axios.post("del-start-date", {
                    id: id,
                });

                if (response.data.status == "success") {
                    this.$buefy.toast.open({
                        message: "บันทึกข้อมูลเสร็จสิ้น!!",
                        type: "is-success",
                    });
                } else {
                    this.$buefy.toast.open({
                        message: "มีข้อผิดพลาด!!",
                        type: "is-danger",
                    });
                }
            } catch (e) {
                console.error(e);

                this.$buefy.toast.open({
                    message: "มีข้อผิดพลาด!!",
                    type: "is-danger",
                });
            }

            await this.initTable();
        },

        async submitStartMountDate(date) {
            this.$buefy.toast.open("กำลังส่งข้อมูล...");
            this.is_submit_date_loading = true;

            try {
                const response = await this.$axios.post("submit-start-date", {
                    date: this.$dayjs(date).format("YYYY-MM-DD"),
                });

                if (response.data.status == "success") {
                    this.$buefy.toast.open({
                        message: "บันทึกข้อมูลเสร็จสิ้น!!",
                        type: "is-success",
                    });
                } else {
                    this.$buefy.toast.open({
                        message: "มีข้อผิดพลาด!!",
                        type: "is-danger",
                    });
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

            await this.initTable();
            this.is_submit_date_loading = false;
        },

        dateFormat(date) {
            return this.$dayjs(date).format("DD MMMM YYYY");
        },

        isLastRow(row) {
            if (row.index == this.data.length - 1) {
                return false;
            }
            return true;
        },
    },
};
</script>

<style>
.is-fullwidth {
    width: 100%;
}

.date-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
