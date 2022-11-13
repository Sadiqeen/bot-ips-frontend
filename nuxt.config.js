export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'เวลาละหมาด - Islamic prayer time',
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

    image: {
        dir: 'assets/images'
    },

    pwa: {
        icon: {
            source: './static/AppImages/android/android-launchericon-72-72.png'
        },
        manifest: {
            name: 'Islamic Prayer Time',
            short_name: 'Bot IPS',
            lang: 'th',
            display: 'standalone',
            viewport: 'width=device-width, initial-scale=1',
            theme_color: '#00d1b2',
            background_color : '#00d1b2',
            icon: [
                {
                    "src": "windows11/SmallTile.scale-100.png",
                    "sizes": "71x71"
                  },
                  {
                    "src": "windows11/SmallTile.scale-125.png",
                    "sizes": "89x89"
                  },
                  {
                    "src": "windows11/SmallTile.scale-150.png",
                    "sizes": "107x107"
                  },
                  {
                    "src": "windows11/SmallTile.scale-200.png",
                    "sizes": "142x142"
                  },
                  {
                    "src": "windows11/SmallTile.scale-400.png",
                    "sizes": "284x284"
                  },
                  {
                    "src": "windows11/Square150x150Logo.scale-100.png",
                    "sizes": "150x150"
                  },
                  {
                    "src": "windows11/Square150x150Logo.scale-125.png",
                    "sizes": "188x188"
                  },
                  {
                    "src": "windows11/Square150x150Logo.scale-150.png",
                    "sizes": "225x225"
                  },
                  {
                    "src": "windows11/Square150x150Logo.scale-200.png",
                    "sizes": "300x300"
                  },
                  {
                    "src": "windows11/Square150x150Logo.scale-400.png",
                    "sizes": "600x600"
                  },
                  {
                    "src": "windows11/Wide310x150Logo.scale-100.png",
                    "sizes": "310x150"
                  },
                  {
                    "src": "windows11/Wide310x150Logo.scale-125.png",
                    "sizes": "388x188"
                  },
                  {
                    "src": "windows11/Wide310x150Logo.scale-150.png",
                    "sizes": "465x225"
                  },
                  {
                    "src": "windows11/Wide310x150Logo.scale-200.png",
                    "sizes": "620x300"
                  },
                  {
                    "src": "windows11/Wide310x150Logo.scale-400.png",
                    "sizes": "1240x600"
                  },
                  {
                    "src": "windows11/LargeTile.scale-100.png",
                    "sizes": "310x310"
                  },
                  {
                    "src": "windows11/LargeTile.scale-125.png",
                    "sizes": "388x388"
                  },
                  {
                    "src": "windows11/LargeTile.scale-150.png",
                    "sizes": "465x465"
                  },
                  {
                    "src": "windows11/LargeTile.scale-200.png",
                    "sizes": "620x620"
                  },
                  {
                    "src": "windows11/LargeTile.scale-400.png",
                    "sizes": "1240x1240"
                  },
                  {
                    "src": "windows11/Square44x44Logo.scale-100.png",
                    "sizes": "44x44"
                  },
                  {
                    "src": "windows11/Square44x44Logo.scale-125.png",
                    "sizes": "55x55"
                  },
                  {
                    "src": "windows11/Square44x44Logo.scale-150.png",
                    "sizes": "66x66"
                  },
                  {
                    "src": "windows11/Square44x44Logo.scale-200.png",
                    "sizes": "88x88"
                  },
                  {
                    "src": "windows11/Square44x44Logo.scale-400.png",
                    "sizes": "176x176"
                  },
                  {
                    "src": "windows11/StoreLogo.scale-100.png",
                    "sizes": "50x50"
                  },
                  {
                    "src": "windows11/StoreLogo.scale-125.png",
                    "sizes": "63x63"
                  },
                  {
                    "src": "windows11/StoreLogo.scale-150.png",
                    "sizes": "75x75"
                  },
                  {
                    "src": "windows11/StoreLogo.scale-200.png",
                    "sizes": "100x100"
                  },
                  {
                    "src": "windows11/StoreLogo.scale-400.png",
                    "sizes": "200x200"
                  },
                  {
                    "src": "windows11/SplashScreen.scale-100.png",
                    "sizes": "620x300"
                  },
                  {
                    "src": "windows11/SplashScreen.scale-125.png",
                    "sizes": "775x375"
                  },
                  {
                    "src": "windows11/SplashScreen.scale-150.png",
                    "sizes": "930x450"
                  },
                  {
                    "src": "windows11/SplashScreen.scale-200.png",
                    "sizes": "1240x600"
                  },
                  {
                    "src": "windows11/SplashScreen.scale-400.png",
                    "sizes": "2480x1200"
                  },
                  {
                    "src": "windows11/Square44x44Logo.targetsize-16.png",
                    "sizes": "16x16"
                  },
                  {
                    "src": "windows11/Square44x44Logo.targetsize-20.png",
                    "sizes": "20x20"
                  },
                  {
                    "src": "windows11/Square44x44Logo.targetsize-24.png",
                    "sizes": "24x24"
                  },
                  {
                    "src": "windows11/Square44x44Logo.targetsize-30.png",
                    "sizes": "30x30"
                  },
                  {
                    "src": "windows11/Square44x44Logo.targetsize-32.png",
                    "sizes": "32x32"
                  },
                  {
                    "src": "windows11/Square44x44Logo.targetsize-36.png",
                    "sizes": "36x36"
                  },
                  {
                    "src": "windows11/Square44x44Logo.targetsize-40.png",
                    "sizes": "40x40"
                  },
                  {
                    "src": "windows11/Square44x44Logo.targetsize-44.png",
                    "sizes": "44x44"
                  },
                  {
                    "src": "windows11/Square44x44Logo.targetsize-48.png",
                    "sizes": "48x48"
                  },
                  {
                    "src": "windows11/Square44x44Logo.targetsize-60.png",
                    "sizes": "60x60"
                  },
                  {
                    "src": "windows11/Square44x44Logo.targetsize-64.png",
                    "sizes": "64x64"
                  },
                  {
                    "src": "windows11/Square44x44Logo.targetsize-72.png",
                    "sizes": "72x72"
                  },
                  {
                    "src": "windows11/Square44x44Logo.targetsize-80.png",
                    "sizes": "80x80"
                  },
                  {
                    "src": "windows11/Square44x44Logo.targetsize-96.png",
                    "sizes": "96x96"
                  },
                  {
                    "src": "windows11/Square44x44Logo.targetsize-256.png",
                    "sizes": "256x256"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-unplated_targetsize-16.png",
                    "sizes": "16x16"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-unplated_targetsize-20.png",
                    "sizes": "20x20"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-unplated_targetsize-24.png",
                    "sizes": "24x24"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-unplated_targetsize-30.png",
                    "sizes": "30x30"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-unplated_targetsize-32.png",
                    "sizes": "32x32"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-unplated_targetsize-36.png",
                    "sizes": "36x36"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-unplated_targetsize-40.png",
                    "sizes": "40x40"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-unplated_targetsize-44.png",
                    "sizes": "44x44"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-unplated_targetsize-48.png",
                    "sizes": "48x48"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-unplated_targetsize-60.png",
                    "sizes": "60x60"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-unplated_targetsize-64.png",
                    "sizes": "64x64"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-unplated_targetsize-72.png",
                    "sizes": "72x72"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-unplated_targetsize-80.png",
                    "sizes": "80x80"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-unplated_targetsize-96.png",
                    "sizes": "96x96"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-unplated_targetsize-256.png",
                    "sizes": "256x256"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",
                    "sizes": "16x16"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",
                    "sizes": "20x20"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",
                    "sizes": "24x24"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",
                    "sizes": "30x30"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",
                    "sizes": "32x32"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",
                    "sizes": "36x36"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",
                    "sizes": "40x40"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",
                    "sizes": "44x44"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",
                    "sizes": "48x48"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",
                    "sizes": "60x60"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",
                    "sizes": "64x64"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",
                    "sizes": "72x72"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",
                    "sizes": "80x80"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",
                    "sizes": "96x96"
                  },
                  {
                    "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",
                    "sizes": "256x256"
                  },
                  {
                    "src": "android/android-launchericon-512-512.png",
                    "sizes": "512x512"
                  },
                  {
                    "src": "android/android-launchericon-192-192.png",
                    "sizes": "192x192"
                  },
                  {
                    "src": "android/android-launchericon-144-144.png",
                    "sizes": "144x144"
                  },
                  {
                    "src": "android/android-launchericon-96-96.png",
                    "sizes": "96x96"
                  },
                  {
                    "src": "android/android-launchericon-72-72.png",
                    "sizes": "72x72"
                  },
                  {
                    "src": "android/android-launchericon-48-48.png",
                    "sizes": "48x48"
                  },
                  {
                    "src": "ios/16.png",
                    "sizes": "16x16"
                  },
                  {
                    "src": "ios/20.png",
                    "sizes": "20x20"
                  },
                  {
                    "src": "ios/29.png",
                    "sizes": "29x29"
                  },
                  {
                    "src": "ios/32.png",
                    "sizes": "32x32"
                  },
                  {
                    "src": "ios/40.png",
                    "sizes": "40x40"
                  },
                  {
                    "src": "ios/50.png",
                    "sizes": "50x50"
                  },
                  {
                    "src": "ios/57.png",
                    "sizes": "57x57"
                  },
                  {
                    "src": "ios/58.png",
                    "sizes": "58x58"
                  },
                  {
                    "src": "ios/60.png",
                    "sizes": "60x60"
                  },
                  {
                    "src": "ios/64.png",
                    "sizes": "64x64"
                  },
                  {
                    "src": "ios/72.png",
                    "sizes": "72x72"
                  },
                  {
                    "src": "ios/76.png",
                    "sizes": "76x76"
                  },
                  {
                    "src": "ios/80.png",
                    "sizes": "80x80"
                  },
                  {
                    "src": "ios/87.png",
                    "sizes": "87x87"
                  },
                  {
                    "src": "ios/100.png",
                    "sizes": "100x100"
                  },
                  {
                    "src": "ios/114.png",
                    "sizes": "114x114"
                  },
                  {
                    "src": "ios/120.png",
                    "sizes": "120x120"
                  },
                  {
                    "src": "ios/128.png",
                    "sizes": "128x128"
                  },
                  {
                    "src": "ios/144.png",
                    "sizes": "144x144"
                  },
                  {
                    "src": "ios/152.png",
                    "sizes": "152x152"
                  },
                  {
                    "src": "ios/167.png",
                    "sizes": "167x167"
                  },
                  {
                    "src": "ios/180.png",
                    "sizes": "180x180"
                  },
                  {
                    "src": "ios/192.png",
                    "sizes": "192x192"
                  },
                  {
                    "src": "ios/256.png",
                    "sizes": "256x256"
                  },
                  {
                    "src": "ios/512.png",
                    "sizes": "512x512"
                  },
                  {
                    "src": "ios/1024.png",
                    "sizes": "1024x1024"
                  }
            ]
        },
        workbox: {
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    }
}
