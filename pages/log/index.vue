<template>
    <section class="py-5">
        <div class="title">
            <b-icon icon="text-box-search-outline" /> Facebook log
        </div>

        <div class="box my-5 has-background-primary p-2">
            <div class="box">
                <div class="columns is-multiline" v-if="Object.keys(logs).length && !isLoading">
                    <div class="column p-1 is-half" v-for="(log, index) in logs" :key="index">
                        <NuxtLink :to="{
                                name: 'log-date',
                                params: { date: log.date },
                            }">
                            <div class="box p-2 is-flex is-justify-content-center has-text-white" :class="$dayjs(log.date).format('d') == 0 ||
                                    $dayjs(log.date).format('d') == 6
                                    ? 'has-background-danger-dark'
                                    : 'has-background-success-dark'
                                ">
                                <div class="has-text-centered">
                                    <p>{{ convertDate(log.date) }}</p>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>
                </div>

                <template v-else>
                    <b-skeleton width="100%" height="20px"></b-skeleton>
                    <b-skeleton width="100%" height="20px"></b-skeleton>
                    <b-skeleton width="100%" height="20px"></b-skeleton>
                    <b-skeleton width="100%" height="20px"></b-skeleton>
                </template>

                <b-pagination :total="paginate.total" :per-page="paginate.perPage" size="is-small" order="is-centered" @change="initData"
                    v-model="paginate.current" class="mt-2" />
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
            paginate: {
                current: 1,
                total: 0,
                perPage: 20,
            },
            isLoading: false,
        };
    },

    mounted() {
        this.initData();
    },

    methods: {
        async initData(page = 1) {
            this.isLoading = true;

            try {
                const response = await this.$axios.$get(`logs`, {
                    params: {
                        page,
                        perPage: this.paginate.perPage,
                    },
                });

                this.logs = response.data.data;
                this.paginate = {
                    current: response.data.current_page,
                    total: response.data.total,
                    perPage: response.data.per_page,
                };
            } catch (e) {
                console.error(e);

                this.$buefy.toast.open({
                    message: "มีข้อผิดพลาด!!",
                    type: "is-danger",
                });
            }

            this.isLoading = false;
        },

        convertDate(date_from_db) {
            return this.$dayjs(date_from_db).format("วัน ddd ที่ DD MMMM YYYY");
        },
    },
};
</script>
