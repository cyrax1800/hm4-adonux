<template>
  <section>
    <div class="columns">
      
    </div>
    <div class="columns">
      <div class="column is-3">
        <div class="field">
          <label class="label">ItemName</label>
          <p class="control">
            <input v-model="itemName" class="input" type="text" placeholder="Enter itemName" v-on:keyup="queryFilter">
          </p>
        </div>
      </div>
      <div class="column is-2">
        <div class="field">
          <label class="label">Rarity</label>
          <p class="control">
            <span class="select">
              <select v-model="selectedRarity" v-on:change="queryFilter">
                <option v-for="rarity in rarities" v-bind:value="rarity.value">
                  {{ rarity.text }}
                </option>
              </select>
            </span>
          </p>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Sort by</label>
          <p class="control">
            <span class="select">
              <select v-model="selectedSort" v-on:change="queryFilter">
                <option v-for="sort in sortData" v-bind:value="sort.value">
                  {{ sort.text }}
                </option>
              </select>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <nuxt-link class="button is-primary" to="/item-material/add">Add Item</nuxt-link>
      </div>
      <div class="column is-narrow">
        <span class="tag is-common">Common</span>
      </div>
      <div class="column is-narrow">
        <span class="tag is-uncommon">Uncommon</span>
      </div>
      <div class="column is-narrow">
        <span class="tag is-rare">Rare</span>
      </div>
      <div class="column is-narrow">
        <span class="tag is-epic">Epic</span>
      </div>
    </div>
    <div class="columns">
      <table class="table is-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in queryItem">
            <td class="is-narrow">{{item.id}}</td>
            <td class="is-narrow">
              <!-- <figure class="image "> -->
                <img :src="getImage(item.pic_url)" alt="">
              <!-- </figure> -->
            </td>
            <td>{{item.name}}
              <span class="tag" v-bind:class="{'is-common':item.itemRarity.id == 1,'is-uncommon':item.itemRarity.id == 2,'is-rare':item.itemRarity.id == 3,'is-epic':item.itemRarity.id == 4}">{{toTitleCase(item.itemRarity.name)}}</span>
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
        allItem: await axios.get("item/")
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
        //query by rarity
        if(this.selectedRarity > 0){
          this.queryItem = this.queryItem.filter(function(item){
            if(item.itemRarity.id == self.selectedRarity){
              return item;
            }
          })
        }
        //sorting
        if(this.selectedSort > 0){
          this.queryItem = this.queryItem.sort(function(item,item2){
            if(self.selectedSort == 1){
              var nameA = item.name.toUpperCase();
              var nameB = item2.name.toUpperCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            }else if(self.selectedSort == 2){
              var nameA = item2.name.toUpperCase();
              var nameB = item.name.toUpperCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            }else if(self.selectedSort == 3){
              if (item.itemRarity.id < item2.itemRarity.id) {
                return -1;
              }
              if (item.itemRarity.id > item2.itemRarity.id) {
                return 1;
              }
              return 0;
            }
          })
        }
      }
    },
    data:function(){
      return{
        queryItem:[],
        selectedRarity:0,
        rarities:[
          {text:"All", value:0},
          {text:"Common", value:1},
          {text:"Uncommon", value:2},
          {text:"Rare", value:3},
          {text:"Epic", value:4}
        ],
        selectedSort:0,
        sortData:[
          {text:"None", value:0},
          {text:"Name Ascending", value:1},
          {text:"Name Descending", value:2},
          {text:"Rarity", value:3},
        ],
        itemName:''
      }
    }
  }
</script>