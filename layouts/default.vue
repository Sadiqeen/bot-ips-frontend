<template>
    <div>
        <section class="has-background-light navbar-shadow py-3">
            <div class="container is-max-widescreen">
                <Navbar
                    @toggleDrawer="openDrawer = true"
                    @logout="logout"
                    :menus="authMenu"
                ></Navbar>
            </div>
        </section>

        <section class="main-content">
            <div class="container is-max-widescreen px-3">
                <Nuxt />
            </div>
        </section>
    </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";

export default {
    name: "DefaultLayout",
    data() {
        return {
            openDrawer: false,
            authMenu: [
                {
                    icon: "home",
                    label: "หน้าแรก",
                    to: "/",
                    auth: false,
                },
                {
                    icon: "format-list-bulleted",
                    label: "เพจ",
                    to: "/page",
                    auth: true,
                },
                {
                    icon: "calendar",
                    label: "ปฏิทิน",
                    to: "/calendar",
                    auth: true,
                },
                {
                    icon: "cog-outline",
                    label: "ตั้งค่า",
                    to: "/config",
                    auth: true,
                },
                {
                    icon: "text-box-search-outline",
                    label: "Log",
                    to: "/log",
                    auth: true,
                },
            ],
        };
    },
    methods: {
        async logout() {
            await this.$auth.logout();
            this.$router.push("/login");
        },

        changePage(link) {
            this.openDrawer = false;
            this.$router.push(link);
        },
    },

    computed: {
        user() {
            return this.$store.state.auth.user;
        },
        loggedIn() {
            return this.$store.state.auth.loggedIn;
        },
    },

    components: {
        Navbar,
    },
};
</script>
