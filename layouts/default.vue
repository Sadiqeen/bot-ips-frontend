<template>
    <div>
        <section class="p-3">
            <div class="container is-max-widescreen">
                <Navbar
                    @toggleDrawer="openDrawer = true"
                    @logout="logout"
                ></Navbar>
            </div>

            <b-sidebar type="is-light" fullheight overlay v-model="openDrawer">
                <div class="p-4">
                    <div class="is-flex is-justify-content-center py-6">
                        <div
                            class="is-flex is-align-items-center is-flex-direction-column"
                        >
                            <img src="logo.png" width="50px" />
                            <strong class="mt-3">
                                {{ loggedIn ? user.name : "Please log in" }}
                            </strong>
                        </div>
                    </div>

                    <b-menu>
                        <b-menu-list label="Menu">
                            <template v-for="(menu, index) in authMenu">
                                <b-menu-item
                                    :key="index"
                                    :icon="menu.icon"
                                    :label="menu.label"
                                    @click="changePage(menu.to)"
                                    v-if="(menu.auth && loggedIn) || !menu.auth"
                                >
                                </b-menu-item>
                            </template>
                        </b-menu-list>

                        <b-menu-list label="Auth" v-if="loggedIn">
                            <b-menu-item
                                icon="logout"
                                label="ออกจากระบบ"
                                @click="logout"
                            >
                            </b-menu-item>
                        </b-menu-list>
                    </b-menu>
                </div>
            </b-sidebar>
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
