<template>
    <b-navbar type="is-light">
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <nuxt-img src="/logo.png" height="28" />
                <span
                    class="ml-2 has-text-weight-bold is-size-5 is-hidden-mobile is-hidden-tablet-only"
                    >Bot islamic prayer times</span
                >
                <span
                    class="ml-2 has-text-weight-bold is-size-5 is-hidden-desktop"
                    >Bot IPT</span
                >
            </b-navbar-item>
        </template>
        <template #end>
            <template v-if="loggedIn">
                <b-navbar-item
                    tag="router-link"
                    v-for="(menu, index) in menus"
                    :to="menu.to"
                    :key="index"
                    exact
                    >{{ menu.label }}</b-navbar-item
                >

                <b-navbar-item tag="div">
                    <b-dropdown aria-role="list">
                        <template #trigger="{ active }">
                            <b-button
                                :label="user.name"
                                type="is-primary"
                                :icon-right="active ? 'menu-up' : 'menu-down'"
                            />
                        </template>

                        <b-dropdown-item aria-role="listitem" @click="$router.push('profile');"
                            >แก้ไขโปรไฟล์</b-dropdown-item
                        >
                        <b-dropdown-item aria-role="listitem" @click="$emit('logout')"
                            >ออกจากระบบ</b-dropdown-item
                        >
                    </b-dropdown>
                </b-navbar-item>
            </template>

            <template v-else>
                <b-navbar-item tag="router-link" to="/login" exact
                    >เข้าสู่ระบบ</b-navbar-item
                >
            </template>
        </template>
    </b-navbar>
</template>

<script>
export default {
    props: ["menus"],
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
