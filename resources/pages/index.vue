<template>
  <div>
    <!-- <button type="button" class="btn btn-primary" @click="navigateTo('/item')">
      item
    </button>
    <nuxt-link class="button" to="/item">
        Item
    </nuxt-link>   -->
    <h3 class="title is-3">Welcome to origaming hm4 data helper</h3>
    <hr>
    <pre>
      Please navigate from side menu to use the tool
    </pre>
  </div>
</template>

<script>
  import axios from '~plugins/axios'
  export default {
    methods:{
      navigateTo:function(nav){
        this.$router.push({ path: nav});
      }
    }
    // asyncData ({ params }) {
    //   return axios.get("backendless/file")
    //   .then(function (response){
    //     console.log(response);
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
