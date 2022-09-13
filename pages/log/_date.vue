<template>
    <section class="mt-5">
        <div class="title">
            <b-icon icon="text-box-search-outline" /> Log :
            {{ convertDate(date) }}

            <b-button
                tag="nuxt-link"
                :to="{ name: 'log' }"
                type="is-primary is-pulled-right"
            >
                <b-icon icon="text-box-search-outline" />
            </b-button>
        </div>

        <div class="box my-5 has-background-primary p-2">
            <div class="box">
                <b-table :data="data" :loading="isLoading">
                    <b-table-column
                        field="id"
                        label="ไอดี"
                        v-slot="props"
                        centered
                    >
                        {{ props.row.id }}
                    </b-table-column>

                    <b-table-column
                        field="post_id"
                        label="โพส"
                        v-slot="props"
                        centered
                    >
                        {{ props.row.post_id }}
                    </b-table-column>

                    <b-table-column
                        field="comment_id"
                        label="คอมเมนต์"
                        v-slot="props"
                        centered
                    >
                        {{ props.row.comment_id }}
                    </b-table-column>

                    <b-table-column
                        field="is_edited"
                        label="สถานะการแก้ไข"
                        v-slot="props"
                        centered
                    >
                        <b-icon :icon="props.row.is_edited ? 'check-circle' : 'circle-outline'" :type="props.row.is_edited ? 'is-success' : 'is-info'"/>
                    </b-table-column>

                    <b-table-column
                        field="page_name"
                        label="เพจ"
                        v-slot="props"
                        centered
                    >
                        {{ props.row.page.name.replace('เวลาละหมาด','') }}
                    </b-table-column>
                </b-table>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    middleware: "auth",

    data() {
        return {
            date: this.$route.params.date,
            data: [],
            isLoading: false,
        };
    },

    mounted() {
        this.initTable();
    },

    methods: {
        async initTable() {
            this.isLoading = true;

            try {
                const response = await this.$axios.$get(`log/` + this.date);

                if (response.status == "success") {
                    this.data = response.data;
                }
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
