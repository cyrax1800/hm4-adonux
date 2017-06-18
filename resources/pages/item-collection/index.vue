<template>
  <section>
    <div class="columns">
      <div class="column is-3">
        <div class="field">
          <label class="label">ItemName</label>
          <p class="control">
            <input v-model="itemName" class="input" type="text" placeholder="Enter item name" v-on:keyup="queryFilter">
          </p>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <nuxt-link to="/item-collection/add"><span class="icon fa fa-plus is-vertical-center"></span>Add Item Collection</nuxt-link>
      </div>
    </div>
    <div class="columns">
      <table class="table is-bordered is-unselectable">
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Name</th>
            <th colspan="9" class="has-text-centered is-horizontal-center">Items</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="itemCollection in queryItem">
            <tr class="is-marginless is-paddingless is-narrow">
              <td rowspan="3" class="is-narrow is-vertical-center">{{itemCollection.id}}</td>
              <td rowspan="3" class="is-narrow is-vertical-center"><img :src="getImage(itemCollection.pic_url)" alt=""></td>
              <td rowspan="3" class="is-vertical-center">{{itemCollection.name}}</td>
              <td rowspan="1" colspan="5" class="has-text-centered">Standard Items</td>
              <td rowspan="1" colspan="4" class="has-text-centered">Wishlist Item</td>
            </tr>
            <tr class="is-marginless is-paddingless">
              <td v-for="item in itemCollection.item" class="has-text-centered is-marginless is-paddingless">
                <p class="text is-marginless is-paddingless" v-bind:class="{'is-common':item.itemRarity.id == 1,'is-uncommon':item.itemRarity.id == 2,'is-rare':item.itemRarity.id == 3,'is-epic':item.itemRarity.id == 4}">{{item.name}}
                </p>
              </td>
            </tr>
            <tr class="is-marginless is-paddingless">
              <td v-for="item in itemCollection.item" class="has-text-centered is-vertical-center is-marginless is-paddingless">
                <img :src="getImage(item.pic_url)" alt="">
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
  import axios from '~plugins/axios'
  export default {
    async asyncData (context) {
      return {
        allItem: await axios.get("itemcollection/")
      }
    },
    mounted() {
      var self = this;
      this.$nextTick(function () {
        self.queryItem = self.allItem.data.slice();
      })
    },
    methods:{
      toTitleCase:function(str)
      {
          return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      },
      getImage:function(path){
        return window.location.origin + "/img/" + path;
      },
      queryFilter:function(e){
        var self = this;
        //query by Name;
        if(this.itemName == ''){
          this.queryItem = this.allItem.data.slice();
        }else{
          this.queryItem = this.allItem.data.filter(function(item){
            if(item.name.toLowerCase().indexOf(self.itemName.toLowerCase()) > -1){
              return item;
            }
          })
        }
      }
    },
    data:function(){
      return{
        queryItem:[],
        itemName:''
      }
    }
  }
</script>