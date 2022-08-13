<template>
    <section class="mt-5">
        <h3 class="title">
            <b-icon icon="format-list-bulleted" /> อำเภอในระบบ

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
                <DistrictTable />
            </div>
        </div>
    </section>
</template>

<script>
import DistrictTable from "~/components/DistrictTable";

export default {
    middleware: "auth",

    components: {
        DistrictTable,
    },
};
</script>
