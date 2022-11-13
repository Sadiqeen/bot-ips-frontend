export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'เวลาละหมาด',
        htmlAttrs: {
            lang: 'th'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/scss/main.scss'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/pwa',
        '@nuxt/image',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/buefy
        ['nuxt-buefy', { css: false }],
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        '@nuxtjs/dayjs',
        'nuxt-clipboard',
        '@nuxtjs/dotenv',
        '@nuxt/image',
    ],

    auth: {
        strategies: {
            'laravelJWT': {
                provider: 'laravel/jwt',
                url: process.env.API,
                endpoints: {
                    login: { url: '/api/login', method: 'post', propertyName: 'access_token' },
                    logout: { url: '/api/logout' },
                    user: { url: '/api/user', method: 'post' },
                    refresh: { url: '/api/refresh', method: 'post', propertyName: 'access_token' }
                },
                token: {
                    property: 'access_token',
                    maxAge: 60 * 60
                },
                refreshToken: {
                    maxAge: 20160 * 60
                },
            },
        }
    },

    dayjs: {
        locales: ['th', 'en'],
        defaultLocale: 'th',
        defaultTimeZone: 'Asia/Bangkok',
        plugins: [
            'utc', // import 'dayjs/plugin/utc'
            'timezone' // import 'dayjs/plugin/timezone'
        ]
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: process.env.API + '/api',
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    }
}
