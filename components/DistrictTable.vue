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
                label="อำเภอ"
                centered
                sortable
                v-slot="props"
            >
                <a :href="genMapUrl(props.row.lat, props.row.long)" target="_blank">
                    {{ props.row.name }}
                </a>
            </b-table-column>

            <b-table-column
                field="lat"
                label="ละติจูด"
                centered
                v-slot="props"
            >
                {{ props.row.lat }}
            </b-table-column>

            <b-table-column
                field="long"
                label="ลองจิจูด"
                centered
                v-slot="props"
            >
                {{ props.row.long }}
            </b-table-column>

            <b-table-column
                field="long"
                label="เพจ"
                centered
                v-slot="props"
                v-if="!page_id"
            >
                {{ props.row.page.name }}
            </b-table-column>

            <b-table-column label="###" centered v-slot="props">
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
    props: {
        page_id: {
            type: Number | String,
            required: false,
            default: 0,
        },
        table_reload: {
            type: Number,
            default: 0,
        },
    },
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
            perpage: 20,
            total: 10,
        };
    },
    mounted() {
        this.initTable();
    },
    watch: {
        table_reload: function (newVal, oldVal) {
            this.initTable();
        },
    },
    methods: {
        genMapUrl(lat, long) {
            return `https://www.google.com/maps/search/${lat},${long}/@${lat},${long},17z?entry=ttu`;
        },

        async initTable() {
            this.isLoading = true;

            let params = [
                    `sort_by=${this.sortField}.${this.sortOrder}`,
                    `page=${this.page}`,
                    `perpage=${this.perpage}`,
                ];

            if (this.page_id) {
                params.push(`page_id=${this.page_id}`);
            }

            params = params.join("&");

            try {
                const response = await this.$axios.$get(`districts?${params}`);

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
                    this.deleteDistrict(id);
                },
            });
        },
        async deleteDistrict(id) {
            const delRoute = "district/" + id + "/delete";

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
