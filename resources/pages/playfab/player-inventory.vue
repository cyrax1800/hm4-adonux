<template>
  <section>
    <div v-bind:class="{'is-active':isFetchingData}" class="modal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <p>Fetching data</p>
        </div>
      </div>
    </div>
    
    <div class="columns">
      <div class="column">
        <a class="button is-danger" @click="removeAllPlayerInventory()">Remove All Player Inventory</a>
      </div>
    </div>
    <div class="columns">
      <div class="column is-4">
        <div class="field">
          <label class="label">Playfab ID</label>
          <p class="control">
            <input v-model="playfabId" class="input" type="text" placeholder="Enter playfabID">
          </p>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">&nbsp;</label>
          <a class="button is-primary control" @click="search()">Search</a>
        </div>
      </div>
    </div>
    <div class="columns">
      <p>Inventory:</p>
    </div>
    <div class="columns">
      <table class="table is-bordered">
        <thead>
          <tr>
            <th>InstanceID</th>
            <th>ID</th>
            <th>Name</th>
            <th>Total</th>
            <th><a v-show="inventories.length > 0" class="button is-danger control" @click="revokeAll()">Revoke All</a></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="inventory in inventories">
            <td>{{inventory.ItemInstanceId}}</td>
            <td>{{inventory.ItemId}}</td>
            <td>{{inventory.DisplayName}}</td>
            <td>{{inventory.RemainingUses}}</td>
            <td>
              <a class="button is-warning control" @click="revoke(inventory)">Revoke</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
  import axios,{CancelToken,axiosLib} from '~plugins/axios'

  export default {
    methods:{
      search:function(){
        var self = this;
        this.isFetchingData = true
        axios.get("playfab/getUserInventory",{
          cancelToken: new CancelToken(function executor(c) {self.cancel = c;}),
          params:{playfabId:self.playfabId}
        })
        .then(function(result){
          console.log(result);
          self.isFetchingData = false
          self.inventories = result.data.data.Inventory;
        })
        .catch(function(error){
          console.log(error);
          self.isFetchingData = false
        })
      }
    },
    data(){
      return{
        playfabId:"",
        inventories:[],
        isFetchingData:false
      }
    }
  }
</script>