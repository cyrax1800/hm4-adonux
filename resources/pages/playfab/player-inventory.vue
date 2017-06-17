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

    <!-- <div v-bind:class="{'is-active':inputSegmentID}" class="modal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="message is-danger">
          <div class="message-header">
            Warning
            <button class="delete" @click="hideInputSegmentModal()"></button>
          </div>
          <div class="message-body">
            Using this operation <strong>cannot be restore</strong> again!
            <div class="columns">
              <div class="column is-4">
                <div class="field">
                  <label class="label">Segment ID</label>
                  <p class="control">
                    <input v-model="segmentID" class="input" type="text" placeholder="Enter segmentID">
                  </p>
                </div>
              </div>
              <div class="column is-2">
                <div class="field">
                  <label class="label">&nbsp;</label>
                  <a class="button is-danger control" @click="removeAllPlayerInventory()">Delete</a>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">&nbsp;</label>
                  <a class="button is-primary control" @click="hideInputSegmentModal()">Cancel</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div v-show="showErrorInfo" class="message is-danger">
      <div class="message-header">
        Ooops
        <button class="delete" @click="hideErrorInfo()"></button>
      </div>
      <div class="message-body">
        <strong>Ooops! </strong> something went wrong.
      </div>
    </div>
    
    <!-- <div class="columns">
      <div class="column">
        <a class="button is-danger" @click="showInputSegmentModal()">Remove All Player Inventory</a>
      </div>
    </div> -->
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
            <th class="is-narrow">InstanceID</th>
            <th>ID</th>
            <th>Name</th>
            <th class="is-narrow">Total</th>
            <th class="is-narrow"><a v-show="inventories.length > 0" class="button is-danger control" @click="revokeAll()">Revoke All</a></th>
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
    mounted:function(){
      this.loading = $nuxt.$parent.$parent.$loading
    },
    methods:{
      search:function(){
        var self = this;
        this.loading.start();
        axios.get("playfab/inventory",{
          cancelToken: new CancelToken(function executor(c) {self.cancel = c;}),
          params:{playfabId:self.playfabId}
        })
        .then(function(result){
          console.log(result);
          self.inventories = result.data.data.Inventory;
          self.loading.finish();
        })
        .catch(function(error){
          console.log(error);
          self.showErrorInfo = true;
          self.loading.finish();
        })
      },
      revoke:function(inventory){
        var self = this;
        this.loading.start();
        axios.delete("playfab/inventory",{
          cancelToken: new CancelToken(function executor(c) {self.cancel = c;}),
          data:{playfabId:self.playfabId, itemInstance:[inventory.ItemInstanceId]}
        })
        .then(function(result){
          console.log(result);
          self.inventories.splice(self.inventories.indexOf(inventory),1);
          self.loading.finish();
        })
        .catch(function(error){
          console.log(error);
          self.showErrorInfo = true;
          self.loading.finish();
        })
      },
      revokeAll:function(){
        var self = this;
        this.loading.start();
        var allItemInstance = this.inventories.map(function(item){return item.ItemInstanceId});
        axios.delete("playfab/inventory",{
          cancelToken: new CancelToken(function executor(c) {self.cancel = c;}),
          data:{playfabId:self.playfabId, itemInstance:allItemInstance}
        })
        .then(function(result){
          console.log(result);
          self.inventories = [];
          self.loading.finish();
        })
        .catch(function(error){
          console.log(error);
          self.loading.finish();
        })
      },
      /*showInputSegmentModal:function(){
        this.inputSegmentID = true;
      },
      hideInputSegmentModal:function(){
        this.inputSegmentID = false;
        this.segmentID = "";
      },
      removeAllPlayerInventory:function(){
        var self = this;
        this.isFetchingData = true
        this.inputSegmentID = false;
        axios.delete("playfab/inventory/all",{
          cancelToken: new CancelToken(function executor(c) {self.cancel = c;}),
          data:{segmentId:self.segmentID}
        })
        .then(function(result){
          console.log(result);
          self.isFetchingData = false
        })
        .catch(function(error){
          console.log(error);
          self.isFetchingData = false
          self.showErrorInfo = true;
        })
        self.segmentID = "";
      },*/
      hideErrorInfo:function(){
        this.showErrorInfo = false;
      }
    },
    data(){
      return{
        playfabId:"",
        inventories:[],
        isFetchingData:false,
        inputSegmentID:false,
        segmentID:"",
        showErrorInfo:false
      }
    }
  }
</script>