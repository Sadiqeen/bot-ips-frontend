<template>
    <section class="mt-5">
        <div class="title">
            <b-icon icon="text-box-search-outline" /> Facebook log
        </div>

        <div class="box my-5 has-background-primary p-2">
            <div class="box">
                <div class="columns is-multiline">
                    <div
                        class="column is-one-third"
                        v-for="(log, index) in logs"
                        :key="index"
                    >
                        <NuxtLink :to="{ name: 'log-date', params: {date : log.date} }">
                            <div class="box is-flex is-justify-content-center has-text-white"
                                :class="$dayjs(log.date).format('d') == 0 || $dayjs(log.date).format('d') == 6 ? 'has-background-danger-dark' : 'has-background-success-dark' ">
                                <div class="has-text-centered">
                                    <strong class="is-size-4">โพสวันที่</strong>
                                    <p>{{ convertDate(log.date) }}</p>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Log",
    middleware: "auth",

    data() {
        return {
            logs: {},
        };
    },

    mounted() {
        this.initData();
    },

    methods: {
        async initData() {
            try {
                const response = await this.$axios.$get(`logs`);

                this.logs = response.data;
            } catch (e) {
                console.error(e);

                this.$buefy.toast.open({
                    message: "มีข้อผิดพลาด!!",
                    type: "is-danger",
                });
            }
        },

        convertDate(date_from_db) {
            return this.$dayjs(date_from_db).format("วัน ddd ที่ DD MMMM YYYY");
        },
    },
};
</script>
