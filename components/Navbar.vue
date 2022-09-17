<template>
    <nav
        class="navbar is-flex is-justify-content-space-between navbar-bottom"
        role="navigation"
        aria-label="main navigation"
    >
        <div class="navbar-brand">
            <a class="navbar-item" @click="$emit('toggleDrawer')">
                <b-icon icon="menu"></b-icon>
            </a>
            <div class="navbar-item">
                <img src="logo.png" height="28" />
                <span class="ml-2 has-text-weight-bold is-size-5 is-hidden-mobile is-hidden-tablet-only">Bot islamic prayer times</span>
                <span class="ml-2 has-text-weight-bold is-size-5 is-hidden-desktop">Bot IPT</span>
            </div>
        </div>

        <div class="is-flex is-align-content-center" v-if="loggedIn">
            <b-button type="is-primary" class="my-auto mr-2" tag="nuxt-link" to="profile">
                <b-icon icon="account" size="is-small"> </b-icon>
            </b-button>
            <b-button type="is-danger" class="m-auto" @click="$emit('logout')">
                <b-icon icon="logout" size="is-small"> </b-icon>
            </b-button>
        </div>

        <div class="is-flex" v-else>
            <b-button type="is-primary" class="m-auto" @click="$emit('login')">
                <b-icon icon="login" size="is-small"> </b-icon>
            </b-button>
        </div>
    </nav>
</template>

<script>
export default {
    computed: {
        loggedIn() {
            return this.$store.state.auth.loggedIn;
        },
    },
};
</script>
