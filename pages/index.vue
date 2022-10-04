<template>
    <section class="section">
        <div class="notification is-danger has-text-centered">
            ยินดีต้อนรับ <b>{{ user.name }}</b> เข้าสู่ระบบ
        </div>

        <div class="columns is-multiline">
            <card
                title="Page"
                icon="format-list-bulleted-square"
                class="column is-3-desktop is-6-tablet"
            >
                Have <b>{{ pageCount }}</b> pages
            </card>

            <card
                title="District"
                icon="office-building"
                class="column is-3-desktop is-6-tablet"
            >
                Have <b>{{ districtCount }}</b> districts
            </card>

            <card
                title="User"
                icon="account"
                class="column is-3-desktop is-6-tablet"
            >
                Have <b>{{ userCount }}</b> users
            </card>

            <card
                title="Other"
                icon="arrange-bring-to-front"
                class="column is-3-desktop is-6-tablet"
            >
                <b>Not defined</b>
            </card>
        </div>
    </section>
</template>

<script>
import Card from "~/components/Card";

export default {
    name: "IndexPage",
    middleware: "auth",

    data() {
        return {
            pageCount: 0,
            districtCount: 0,
            userCount: 0,
        };
    },

    components: {
        Card,
    },

    mounted() {
        this.initData();
    },

    computed: {
        user() {
            return this.$store.state.auth.user;
        },
    },

    methods: {
        async initData() {
            try {
                const response = await this.$axios.$get(`main`);

                this.pageCount = response.data.pages;
                this.districtCount = response.data.districts;
                this.userCount = response.data.users;
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
