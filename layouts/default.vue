<template>
    <div>
        <b-navbar shadow class="is-max-widescreen">
            <template #brand>
                <b-navbar-item tag="router-link" :to="{ path: '/' }">
                    <h1 class="has-text-weight-bold">Bot IPS</h1>
                </b-navbar-item>
            </template>
            <template #start>
                <b-navbar-item tag="router-link" :to="{ path: '/' }">
                    หน้าแรก
                </b-navbar-item>

                <template v-if="loggedIn">
                    <b-navbar-item
                        v-for="(menu, index) in authMenu"
                        :key="index"
                        tag="router-link"
                        :to="menu.to"
                    >
                        {{ menu.label }}
                    </b-navbar-item>
                </template>
            </template>

            <template #end>
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <NuxtLink
                            v-if="!loggedIn"
                            class="button is-primary"
                            to="login"
                        >
                            Log in
                        </NuxtLink>

                        <NuxtLink
                            tag="a"
                            to="profile"
                            v-if="loggedIn"
                            class="button is-primary"
                            >{{ user.name }}</NuxtLink
                        >
                        <a
                            v-if="loggedIn"
                            class="button is-light"
                            @click="logout"
                        >
                            Log out
                        </a>
                    </div>
                </b-navbar-item>
            </template>
        </b-navbar>

        <section class="main-content">
            <div class="container is-max-widescreen px-3">
                <Nuxt />
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "DefaultLayout",
    data() {
        return {
            authMenu: [
                {
                    label: "เพจ",
                    to: "/page",
                },
                {
                    label: "ปฏิทิน",
                    to: "/calendar",
                },
            ],
        };
    },
    methods: {
        async logout() {
            await this.$auth.logout();
            this.component_id = this.component_id + 1;
            this.$router.push("/login");
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
};
</script>
