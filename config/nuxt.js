'use strict'

const resolve = require('path').resolve
const webpack = require('webpack')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Adonuxt',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Adonuxt project'
      }
    ],
    link: [
      /*{
        rel: 'icon',
        type: 'image/x-icon',
        href: 'favicon.ico'
      }*/
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/bulma.css','~assets/css/font-awesome.css','~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  // loading: { color: '#744d82' },
  loading: '~components/loading.vue',
  /*
  ** Point to resources
  */
  srcDir: resolve(__dirname, '../', 'resources'),
  build:{
    vendor:['backendless','jquery','axios','jszip','file-saver'],
    plugins: [
      // set shortcuts as global for bootstrap
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  },
  // include bootstrap js on startup
  plugins: ['~plugins/bootstrap.js']
  
}
