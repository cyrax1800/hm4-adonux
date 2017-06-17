<template>
  <section>
    <div class="columns">
      
    </div>
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
        <nuxt-link class="button is-primary" to="/item-collection/add">Add Item Collection</nuxt-link>
      </div>
    </div>
    <div class="columns">
      <table class="table is-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Name</th>
            <th class="has-text-centered">Items</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="itemCollection in queryItem">
            <td class="is-narrow has-text-centered">{{itemCollection.id}}</td>
            <td class="is-narrow"><img :src="getImage(itemCollection.pic_url)" alt=""></td>
            <td>{{itemCollection.name}}</td>
            <td class="is-marginless is-paddingless is-unselectable">
              <table class="table is-marginless is-paddingless is-narrow">
                <tr>
                  <td colspan="5" class="has-text-centered">Items</td>
                  <td colspan="4" class="has-text-centered">Wishlist Item</td>
                </tr>
                <tr>
                  <td v-for="item in itemCollection.item" class="has-text-centered">
                    <p class="text" v-bind:class="{'is-common':item.itemRarity.id == 1,'is-uncommon':item.itemRarity.id == 2,'is-rare':item.itemRarity.id == 3,'is-epic':item.itemRarity.id == 4}">{{item.name}}
                    </p>
                    <img :src="getImage(item.pic_url)" alt="">
                  </td>
                </tr>
              </table>
            </td>
          </tr>
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