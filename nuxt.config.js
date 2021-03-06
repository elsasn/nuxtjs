
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href:'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css', integrity:'sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ=', crossorigin:'anonymous'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { 
    color: '#FFB6C1', 
    height: '4px' 
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/app.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    './plugins/axios.js',
      {src: '~/plugins/clientPlugins.js', mode: 'client'}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/moment'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://178.128.118.107/api/'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
