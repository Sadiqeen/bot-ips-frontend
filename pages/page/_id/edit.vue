<template>
    <section class="mt-5">
        <h3 class="title">
            <b-icon icon="circle-edit-outline" /> แก้ไขเพจ {{ title }}

            <b-button
                tag="nuxt-link"
                :to="{ name: 'page' }"
                type="is-primary is-pulled-right"
            >
                <b-icon icon="format-list-bulleted" />
            </b-button>
        </h3>

        <div class="box my-5 has-background-primary">
            <div class="box">
                <div class="columns is-centered">
                    <div class="column is-6">
                        <template v-if="form.name">
                            <PageForm
                                :preDefined="form"
                                :submitTo="`page/` + editId + `/update`"
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
    </section>
</template>

<script>
import PageForm from "~/components/PageForm";

export default {
    data() {
        return {
            editId: this.$route.params.id,
            title: "",
            form: {
                name: "",
                url: "",
                page_id: "",
                token: "",
            },
            is_loading: true,
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
                const response = await this.$axios.post(
                    `page/${this.editId}/edit`
                );
                this.form = response.data.data;
                this.title = response.data.data.name;
            } catch (e) {
                this.$router.push({ name: "page" });
            }
        },
    },

    components: {
        PageForm,
    },
};
</script>
