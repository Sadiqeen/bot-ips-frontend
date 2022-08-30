<template>
    <b-table
        :data="data"
        :bordered="isBordered"
        :striped="isStriped"
        :narrowed="isNarrowed"
        :hoverable="isHoverable"
        :loading="isLoading"
        :focusable="isFocusable"
        :mobile-cards="hasMobileCards"
    >
        <b-table-column field="id" label="ไอดี" v-slot="props">
            {{ props.row.id }}
        </b-table-column>

        <b-table-column field="name" label="ชื่อ" v-slot="props">
            {{ props.row.name }}
        </b-table-column>

        <b-table-column field="key" label="คีย์" v-slot="props">
            {{ props.row.key }}
        </b-table-column>

        <b-table-column field="value" label="ข้อมูล" v-slot="props">
            {{ props.row.value }}
        </b-table-column>

        <b-table-column field="action" label="###"  v-slot="props">
            <b-button
                type="is-danger"
                size="is-small"
                icon-right="delete-forever"
                @click="confirmDelete(props.row.id, props.row.name)"
            />
        </b-table-column>

        <template #empty>
            <div class="has-text-centered">No records</div>
        </template>
    </b-table>
</template>

<script>
export default {
    props: {
        table_reload: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            data : [],
            isEmpty: false,
            isBordered: false,
            isStriped: true,
            isNarrowed: false,
            isHoverable: true,
            isFocusable: false,
            isLoading: false,
            hasMobileCards: true,
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
        async initTable() {
            this.isLoading = true;

            try {
                const response = await this.$axios.$get(`configs`);

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

        confirmDelete(id, name) {
            this.$buefy.dialog.confirm({
                title: "Deleting config",
                message: "Are you sure you want to <b>delete</b> " + name + "?",
                confirmText: "Delete",
                type: "is-danger",
                hasIcon: true,
                onConfirm: () => {
                    this.$buefy.toast.open("Sending request...");
                    this.deleteConfig(id);
                },
            });
        },

        async deleteConfig(id) {
            const delRoute = "config/" + id + "/delete";

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
