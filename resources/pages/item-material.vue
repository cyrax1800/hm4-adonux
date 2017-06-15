<template>
  <section>
    <div class="columns">
      
    </div>
    <div class="columns">
      <div class="column is-3">
        <div class="field">
          <label class="label">ItemName</label>
          <p class="control">
            <input v-model="itemName" class="input" type="text" placeholder="Enter itemName">
          </p>
        </div>
      </div>
      <div class="column is-2">
        <div class="field">
          <label class="label">Rarity</label>
          <p class="control">
            <span class="select">
              <select>
                <option>All</option>
                <option>Common</option>
                <option>Uncommon</option>
                <option>Rare</option>
                <option>Epic</option>
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
              <select>
                <option>None</option>
                <option>Ascending</option>
                <option>Descending</option>
                <option>Rarity</option>
              </select>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="columns">
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
            <td>{{item.id}}</td>
            <td><img :src="item.pic_url" alt=""></td>
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