<template>
    <section class="mt-5">
        <h3 class="title">
            <b-icon icon="format-list-bulleted" /> เพจในระบบ

            <b-button
                tag="nuxt-link"
                :to="{ name: 'page-create' }"
                type="is-primary is-pulled-right"
            >
                <b-icon icon="plus-circle" />
            </b-button>

            <b-button
                tag="nuxt-link"
                :to="{ name: 'district' }"
                type="is-primary is-pulled-right"
                class="mr-2"
            >
                <b-icon icon="office-building" />
            </b-button>
        </h3>

        <div class="box my-5 has-background-primary">
            <div class="box">
                <PageTable />
            </div>
        </div>
    </section>
</template>

<script>
import PageTable from "~/components/PageTable";

export default {
    middleware: "auth",

    components: {
        PageTable,
    },
};
</script>
