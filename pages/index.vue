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
                <b-skeleton :animated="animated" v-if="isLoading"></b-skeleton>
                <span v-else>Have <b>{{ pageCount }}</b> pages</span>
            </card>

            <card
                title="District"
                icon="office-building"
                class="column is-3-desktop is-6-tablet"
            >
                <b-skeleton :animated="animated" v-if="isLoading"></b-skeleton>
                <span v-else>Have <b>{{ districtCount }}</b> districts</span>
            </card>

            <card
                title="User"
                icon="account"
                class="column is-3-desktop is-6-tablet"
            >
                <b-skeleton :animated="animated" v-if="isLoading"></b-skeleton>
                <span v-else>Have <b>{{ userCount }}</b> users</span>
            </card>

            <card
                title="Hijri Record"
                icon="arrange-bring-to-front"
                class="column is-3-desktop is-6-tablet"
            >
                <b-skeleton :animated="animated" v-if="isLoading"></b-skeleton>
                <span v-else>Have <b>{{ record }}</b> records</span>
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
            record: 0,
            isLoading: false
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
            this.isLoading = true;

            try {
                const response = await this.$axios.$get(`main`);

                this.pageCount = response.data.pages;
                this.districtCount = response.data.districts;
                this.userCount = response.data.users;
                this.record = response.data.records;
            } catch (e) {
                console.error(e);

                this.$buefy.toast.open({
                    message: "มีข้อผิดพลาด!!",
                    type: "is-danger",
                });
            } finally {
                this.isLoading = false;
            }
        },
    },
};
</script>
