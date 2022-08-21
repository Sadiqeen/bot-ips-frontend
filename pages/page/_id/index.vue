<template>
    <section class="mt-5">
        <h3 class="title is-hidden-mobile">
            <b-icon icon="circle-edit-outline" /> ข้อมูลเพจ {{ title }}

            <b-button
                tag="nuxt-link"
                :to="{ name: 'page' }"
                type="is-primary is-pulled-right"
            >
                <b-icon icon="format-list-bulleted" />
            </b-button>

            <b-button
                type="is-primary is-pulled-right"
                class="mr-2"
                @click="cardModal"
            >
                <b-icon icon="download" />
            </b-button>
        </h3>

        <div class="is-flex is-flex-direction-column is-hidden-tablet">
            <div class="title">
                <b-icon icon="circle-edit-outline" /> ข้อมูลเพจ {{ title }}
            </div>

            <div class="is-flex is-justify-content-space-between">
                <b-button type="is-primary" class="m-1" expanded @click="cardModal">
                    <b-icon icon="download" />
                </b-button>

                <b-button
                    tag="nuxt-link"
                    :to="{ name: 'page' }"
                    type="is-primary"
                    class="m-1"
                    expanded
                >
                    <b-icon icon="format-list-bulleted" />
                </b-button>
            </div>
        </div>

        <div class="box mt-5 has-background-primary">
            <div class="box">
                <div class="columns is-centered">
                    <div class="column is-6">
                        <template v-if="form.name">
                            <PageForm
                                :preDefined="form"
                                :submitTo="`page/` + page_id + `/update`"
                                :readonly="true"
                            />
                        </template>
                        <template v-else>
                            <b-skeleton active></b-skeleton>
                            <b-skeleton height="50px"></b-skeleton>

                            <b-skeleton active></b-skeleton>
                            <b-skeleton height="50px"></b-skeleton>

                            <b-skeleton active></b-skeleton>
                            <b-skeleton height="50px"></b-skeleton>

                            <b-skeleton active></b-skeleton>
                            <b-skeleton height="100px"></b-skeleton>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <div class="box my-5 has-background-primary">
            <div class="box">
                <DistrictForm
                    :page_id="page_id"
                    :table_reload="table_index"
                ></DistrictForm>
            </div>
        </div>
    </section>
</template>

<script>
import PageForm from "~/components/PageForm";
import DistrictForm from "~/components/DistrictForm";
import ScrapLocation from "~/components/ScrapLocation";

export default {
    middleware: "auth",

    data() {
        return {
            page_id: this.$route.params.id,
            title: "",
            form: {
                name: "",
                url: "",
                page_id: "",
                token: "",
            },
            is_loading: true,
            modal_active: false,
            table_index: 0,
        };
    },

    mounted() {
        if (!this.$route.params.id) {
            this.$route.push({ name: "page" });
        }

        this.getEditData();
    },

    methods: {
        async getEditData() {
            try {
                const response = await this.$axios.post(`page/${this.page_id}`);
                this.form = response.data.data;
                this.title = response.data.data.name;
            } catch (e) {
                this.$router.push({ name: "page" });
            }
        },
        cardModal() {
            this.$buefy.modal.open({
                parent: this,
                component: ScrapLocation,
                hasModalCard: true,
                props: {
                    page_id: this.page_id,
                },
                trapFocus: true,
                events: {
                    updateDistrictTable: () => {
                        this.reloadTable();
                    },
                },
            });
        },
        reloadTable() {
            this.table_index++;
        },
    },

    components: {
        PageForm,
        DistrictForm,
        ScrapLocation,
    },
};
</script>
