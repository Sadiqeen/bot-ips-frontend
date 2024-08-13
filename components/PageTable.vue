<template>
    <section>
        <b-table
            :data="isEmpty ? [] : data"
            :bordered="isBordered"
            :striped="isStriped"
            :narrowed="isNarrowed"
            :hoverable="isHoverable"
            :loading="isLoading"
            :focusable="isFocusable"
            :mobile-cards="hasMobileCards"
            paginated
            backend-pagination
            :total="total"
            :per-page="perpage"
            :pagination-rounded="true"
            pagination-order="is-centered"
            sort-icon="arrow-up"
            sort-icon-size="is-small"
            backend-sorting
            :default-sort="[sortField, sortOrder]"
            @page-change="onPageChange"
            @sort="onSort"
        >
            <b-table-column
                field="id"
                label="ไอดี"
                centered
                numeric
                sortable
                v-slot="props"
            >
                {{ props.row.id }}
            </b-table-column>

            <b-table-column
                field="name"
                label="เพจ"
                centered
                sortable
                v-slot="props"
            >
                <a :href="props.row.url" target="_blank">
                    {{ props.row.name }}
                </a>
            </b-table-column>

            <b-table-column label="###" centered v-slot="props">
                <b-button
                    type="is-success is-light"
                    size="is-small"
                    icon-right="card-account-details"
                    tag="a"
                    :href="props.row.url"
                    target="_blank"
                />

                <b-button
                    type="is-success is-light"
                    size="is-small"
                    icon-right="content-copy"
                    @click="copySomething(props.row.page_id)"
                />

                <b-button
                    type="is-info is-light"
                    size="is-small"
                    tag="a"
                    :href="`https://bot-ipt-api.sleepless-tech.com/api/post/` + props.row.page_id"
                    target="_blank"
                    icon-right="run"
                />
                <b-button
                    type="is-info is-light"
                    size="is-small"
                    icon-right="content-copy"
                    @click="copyApiLink(props.row.page_id)"
                />

                <b-button
                    type="is-danger is-light"
                    size="is-small"
                    icon-right="key"
                    tag="a"
                    :href="fbTokenDebugLink + props.row.token"
                    target="_blank"
                />
                <b-button
                    type="is-danger is-light"
                    size="is-small"
                    icon-right="content-copy"
                    @click="copySomething(props.row.token)"
                />
            </b-table-column>

            <b-table-column label="###" centered v-slot="props">
                <b-button
                    type="is-warning"
                    size="is-small"
                    icon-right="eye"
                    tag="nuxt-link"
                    :to="{ name: 'page-id', params: { id: props.row.id } }"
                />

                <b-button
                    type="is-info"
                    size="is-small"
                    icon-right="circle-edit-outline"
                    tag="nuxt-link"
                    :to="{ name: 'page-id-edit', params: { id: props.row.id } }"
                />

                <b-button
                    type="is-danger"
                    size="is-small"
                    icon-right="delete"
                    @click="confirmDelete(props.row.id, props.row.name)"
                />
            </b-table-column>

            <template #empty>
                <div class="has-text-centered">No records</div>
            </template>
        </b-table>
    </section>
</template>

<script>
export default {
    data() {
        return {
            data: [],
            isEmpty: false,
            isBordered: false,
            isStriped: true,
            isNarrowed: false,
            isHoverable: true,
            isFocusable: false,
            isLoading: false,
            hasMobileCards: true,
            sortField: "id",
            sortOrder: "desc",
            page: 1,
            perpage: 10,
            total: 10,
            fbTokenDebugLink: "https://developers.facebook.com/tools/debug/accesstoken/?access_token="
        };
    },
    mounted() {
        this.initTable();
    },
    methods: {
        async initTable() {
            this.isLoading = true;

            const params = [
                `sort_by=${this.sortField}.${this.sortOrder}`,
                `page=${this.page}`,
                `perpage=${this.perpage}`,
            ].join("&");

            try {
                const response = await this.$axios.$get(`pages?${params}`);

                if (response.status == "success") {
                    this.data = response.data.data;
                    this.page = response.data.current_page;
                    this.total = response.data.total;
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
        async copyApiLink(id) {
            this.copySomething(process.env.NUXT_ENV_BASE_API + "/api/post/" + id);
        },
        async copySomething(text) {
            try {
                await this.$copyText(text);
                this.$buefy.toast.open({
                    message: "คัดลอกสำเร็จ!!",
                    type: "is-success",
                });
            } catch (e) {
                console.error(e);
            }
        },
        onPageChange(page) {
            this.page = page;
            this.initTable();
        },
        onSort(field, order) {
            this.sortField = field;
            this.sortOrder = order;
            this.initTable();
        },
        confirmDelete(id, name) {
            this.$buefy.dialog.confirm({
                title: "Deleting page",
                message: "Are you sure you want to <b>delete</b> " + name + "?",
                confirmText: "Delete",
                type: "is-danger",
                hasIcon: true,
                onConfirm: () => {
                    this.$buefy.toast.open("Sending request...");
                    this.deletePage(id);
                },
            });
        },
        async deletePage(id) {
            const delRoute = "page/" + id + "/delete";

            try {
                const response = await this.$axios.$post(delRoute);

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
    },
};
</script>
