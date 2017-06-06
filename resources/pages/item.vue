<template>
  <section class="container">
    <img src="/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      Universal Vue.js Applications Framework
    </h1>
    <nuxt-link class="button" to="/about">
      About page
    </nuxt-link>
  </section>
</template>

<script>
  import axios from '~plugins/axios'
  export default {
    // asyncData ({ params }) {
    //   return axios.get("backendless/file")
    //   .then(function (response){
    //     return response;
    //   })
    //   .catch(function(error){
    //     console.log(error)
    //   });
    // }
  }
</script>

<style scoped>
</style>
