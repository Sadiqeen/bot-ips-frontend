<template>
    <section class="py-5">
        <h3 class="title is-hidden-mobile">
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

        <div class="is-flex is-flex-direction-column is-hidden-tablet">
            <div class="title">
                <b-icon icon="format-list-bulleted" /> เพจในระบบ
            </div>

            <div class="is-flex is-justify-content-space-between">
                <b-button
                    tag="nuxt-link"
                    :to="{ name: 'page-create' }"
                    type="is-primary"
                    class="m-1"
                    expanded
                >
                   <b-icon icon="plus-circle" />
                </b-button>

                <b-button
                    tag="nuxt-link"
                    :to="{ name: 'district' }"
                    type="is-primary"
                    class="m-1"
                    expanded
                >
                   <b-icon icon="office-building" />
                </b-button>
            </div>
        </div>

        <div class="box my-5 has-background-primary p-2">
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
