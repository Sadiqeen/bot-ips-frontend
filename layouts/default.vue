<template>
    <div style="height: 100vh;">
        <section class="has-background-light navbar-shadow py-3" ref="navbar">
            <div class="container is-max-widescreen">
                <Navbar
                    @toggleDrawer="openDrawer = true"
                    @logout="logout"
                    :menus="authMenu"
                ></Navbar>
            </div>
        </section>

        <section class="main-content" :style="'background-color: #E8F1F2;min-height: calc(100vh - ' + navbarHeight + 'px);'">
            <div class="container is-max-widescreen px-3" style="">
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
            navbarHeight: 0,
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

    mounted() {
        const navbarHeight = this.$refs.navbar.offsetHeight;
        this.navbarHeight = navbarHeight;
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
