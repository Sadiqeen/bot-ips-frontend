<template>
    <section class="py-5">
        <div class="title">
            <b-icon icon="text-box-search-outline" /> Log :
            {{ convertDate(date) }}

            <b-button tag="nuxt-link" :to="{ name: 'log' }" type="is-primary is-pulled-right">
                <b-icon icon="text-box-search-outline has-text-white" />
            </b-button>
        </div>

        <div class="box my-5 has-background-primary p-2">
            <div class="box">
                <b-table :data="data" :loading="isLoading" detailed show-detail-icon
                    @details-open="(row) => postMessage = row.message" @details-close="() => postMessage = null">
                    <b-table-column field="id" label="ไอดี" v-slot="props" centered>
                        {{ props.row.id }}
                    </b-table-column>

                    <b-table-column field="post_id" label="โพส" v-slot="props" centered>
                        <a :href="'https://www.facebook.com/' + props.row.post_id" target="_blank">{{ props.row.post_id
                            }}</a>
                    </b-table-column>

                    <b-table-column field="comment_id" label="คอมเมนต์" v-slot="props" centered>
                        {{ props.row.comment_id }}
                    </b-table-column>

                    <b-table-column field="is_edited" label="สถานะการแก้ไข" v-slot="props" centered>
                        <b-icon :icon="parseInt(props.row.is_edited) ? 'check-circle' : 'circle-outline'"
                            :type="parseInt(props.row.is_edited) ? 'is-success' : 'is-info'" />
                    </b-table-column>

                    <b-table-column field="page_name" label="เพจ" v-slot="props" centered>
                        {{ props.row.page.name.replace('เวลาละหมาด', '') }}
                    </b-table-column>

                    <b-table-column label="###" centered v-slot="props">
                        <b-button type="is-danger" size="is-small" icon-right="delete"
                            @click="confirmDelete(props.row.id)" />
                    </b-table-column>

                    <template #detail="props">
                        <b-field label="Message">
                            <b-input type="textarea" rows="10" v-model="postMessage"></b-input>
                        </b-field>

                        <div class="is-flex">
                            <b-button type="is-info" size="is-small" class="ml-auto"
                                @click="updatePost(props.row.id)" :disabled="!postMessage">บันทึก</b-button>
                        </div>
                    </template>

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
            postMessage: null,
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

        confirmDelete(id) {
            this.$buefy.dialog.confirm({
                title: "Deleting page",
                message: "Are you sure you want to <b>delete</b> ?",
                confirmText: "Delete",
                type: "is-danger",
                hasIcon: true,
                onConfirm: () => {
                    this.$buefy.toast.open("Sending request...");
                    this.deletePost(id);
                },
            });
        },

        async deletePost(id) {
            const delRoute = "/post/" + id;

            try {
                const response = await this.$axios.$delete(delRoute);

                if (response.status == "success") {
                    this.$buefy.toast.open({
                        message: "ลบข้อมูลสำเร็จ!!",
                        type: "is-success",
                    });
                }

                this.initTable();
            } catch (e) {
                console.error(e);

                this.$buefy.toast.open({
                    message: "มีข้อผิดพลาด!!",
                    type: "is-danger",
                });
            }
        },

        async updatePost(id) {
            this.$buefy.toast.open("Sending request...");

            const updateRoute = "/post/" + id;

            try {
                const response = await this.$axios.$put(updateRoute, {
                    message: this.postMessage
                });

                if (response.status == "success") {
                    this.$buefy.toast.open({
                        message: "อัพเดทข้อมูลสำเร็จ!!",
                        type: "is-success",
                    });
                }

                this.initTable();
            } catch (e) {
                console.error(e);

                this.$buefy.toast.open({
                    message: "มีข้อผิดพลาด!!",
                    type: "is-danger",
                });
            }
        }
     },
};
</script>
