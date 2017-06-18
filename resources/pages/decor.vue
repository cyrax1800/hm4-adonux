<template>
  <section>
    <div class="columns">
      
    </div>
  </section>
</template>

<script>
  import axios from '~plugins/axios'
  export default {
    /*async asyncData (context) {
      return {
        allItem: await axios.get("itemcollection/")
      }
    },*/
    mounted() {
      var self = this;
      this.$nextTick(function () {
      })
    },
    methods:{
      toTitleCase:function(str)
      {
          return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      },
      getImage:function(path){
        return window.location.origin + "/img/" + path;
      }
    },
    data:function(){
      return{
      }
    }
  }
</script>