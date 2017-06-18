<template>
  <section>
    <!-- Modal -->
    <div class="modal" v-bind:class="{'is-active':isAddItem}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Select Item</p>
          <button class="delete" @click="isAddItem = false"></button>
        </header>
        <header>
          <p class="control has-icons-left">
            <input v-model="itemName" v-on:keyup="queryFilter" class="input" type="text" placeholder="Enter item name">
            <span class="icon is-small is-left">
              <i class="fa fa-search"></i>
            </span>
          </p>
        </header><!-- /header -->
        <section class="modal-card-body">
          <table class="table is-bordered">
            <tbody>
              <tr v-for="item in queryItem" @click="selectItem(item)">
                <td>{{item.name}}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>

    <div v-show="showErrorInfo" class="message is-danger">
      <div class="message-header">
        Ooops
        <button class="delete" @click="showErrorInfo = false"></button>
      </div>
      <div class="message-body">
        <strong>Ooops! </strong> Item material is needed.
      </div>
    </div>

    <div class="columns">
      <div class="column is-half">
        <div class="field">
          <label class="label">Name</label>
          <p class="control">
            <input v-model="name" class="input" type="text" placeholder="Item name">
          </p>
        </div>
        <div class="columns">
          <div class="column is-narrow">
            <div class="field">
              <label class="label">Image</label>
              <figure class="image is-64x64 control">
                <img :src="imgPath">
              </figure>
            </div>
          </div>
          <div class="column">
            <div class="field">
                <label class="label">&nbsp;</label>
                <p class="control">File: <span>{{filename}}</span></p>
                <input type="file" id="file-1" class="inputfile inputfile-1 button" style="display: none;" accept="image/*" v-on:change="addImage"/>
                <label for="file-1"><span><span class="icon fa fa-upload is-vertical-center"></span>Choose a file</span></label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <table class="table is-bordered">
          <thead>
            <tr>
              <th colspan="5" class="has-text-centered">Item</th>
              <th colspan="4" class="has-text-centered">Wishlish Item</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="n in 9"><a class="button is-primary control" @click="addItem(n)">AddItem</a></td>
            </tr>
            <tr>
              <td v-for="item in items" class="has-text-centered">
                <p class="text" v-bind:class="{'is-common':item.itemRarity.id == 1,'is-uncommon':item.itemRarity.id == 2,'is-rare':item.itemRarity.id == 3,'is-epic':item.itemRarity.id == 4}">{{item.name}}
                </p>
                <img :src="getImage(item.pic_url)" alt="">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="field">
          <a class="button is-info control" @click="addItemCollection()">Add</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import axios,{CancelToken,axiosLib} from '~plugins/axios'

  export default {
    async asyncData (context) {
      return {
        allItem: await axios.get("item/")
      }
    },
    mounted() {
      var self = this;
      self.queryItem = self.allItem.data.slice();
      this.imgPath = "http://bulma.io/images/placeholders/64x64.png";
    },
    methods:{
      addImage: function(e){
        var target = e.target;
        var tmpFile = target.files[0];
        var fd = new FormData();
        var self = this;
        fd.append("filegambar", tmpFile);
        fd.append("path","img/item-collection")
        fd.append("filename",this.name);
        const config = { headers: { 'Content-Type': `multipart/form-data; boundary=${fd._boundary}` } };
        axios.post('/image', fd, config)
        .then(function(response){
          console.log(response)
          self.imgPath = window.location.origin + '/' + response.data.path;
          self.filename = response.data.filename;
        })
        .catch(errors => console.log(errors));
      },
      addItemCollection:function(){
        var self = this;
        // this.loading.start();
        if(this.name == ""){
          this.showErrorInfo = true;
          return;
        }
        for(var i= 0; i< this.items.length;i++){
          if(this.items[i].id == undefined){
            this.showErrorInfo = true;
            return;
          }
        }
        axios.post("itemcollection/add",{
          cancelToken: new CancelToken(function executor(c) {self.cancel = c;}),
          data:{name:self.name,rarity:self.selectedRarity,imgPath:self.imgPath.replace(window.location.origin + '/img/',""),items:self.items}
        })
        .then(function(result){
          console.log(result);
          // self.loading.finish();
        })
        .catch(function(error){
          console.log(error);
          // self.loading.finish();
        })
      },
      addItem:function(idx){
        this.currentSelectItemIdx = idx - 1;
        this.isAddItem = true;
        this.itemName = "";
        this.queryFilter();
      },
      selectItem:function(item){
        this.items[this.currentSelectItemIdx] = item;
        this.isAddItem = false;
        this.currentSelectItemIdx = -1;
        console.log(this.currentSelectItemIdx);
      },
      getImage:function(path){
        if(path == undefined) return "";
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
        showErrorInfo:false,
        queryItem:[],
        currentSelectItemIdx:-1,
        itemName:'',
        name:'',
        imgPath:'',
        filename:'',
        isAddItem:false,
        items:[{'itemRarity':{'id':0}},{'itemRarity':{'id':0}},{'itemRarity':{'id':0}},{'itemRarity':{'id':0}},{'itemRarity':{'id':0}},{'itemRarity':{'id':0}},{'itemRarity':{'id':0}},{'itemRarity':{'id':0}},{'itemRarity':{'id':0}}]
      }
    }
  }
</script>