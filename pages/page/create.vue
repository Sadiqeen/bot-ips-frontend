<template>
    <section class="py-5">
        <h3 class="title">
            <b-icon icon="plus" /> เพิ่มเพจในระบบ

            <b-button
                tag="nuxt-link"
                :to="{ name: 'page' }"
                type="is-primary is-pulled-right"
            >
                <b-icon icon="format-list-bulleted has-text-white" />
            </b-button>
        </h3>

        <div class="box my-5 has-background-primary p-2">
            <div class="box">
                <div class="columns is-centered">
                    <div class="column is-6">
                        <PageForm :preDefined="form" submitTo="page/store" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import PageForm from "~/components/PageForm";

export default {
    middleware: "auth",

    data() {
        return {
            form: {
                name: "",
                url: "",
                page_id: "",
                token: "",
            },
        };
    },

    components: {
        PageForm,
    },
};
</script>
