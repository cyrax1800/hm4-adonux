<template>
	<div>
    <div class="columns">
      <div class="column">
        <ul class="breadcrumb">
          <li></li>
          <li v-for="pathName in path">
            <a v-if="path.indexOf(pathName) != path.length - 1" @click=gotoFromBreadcumb(pathName)>{{pathName}}</a>
            <span v-else class="is-active">{{pathName}}</span>
          </li>
        </ul>  
      </div>
    </div>
    <div class="columns">
      <div class="column is-4">
        <div class="field">
          <label class="label">Name Search</label>
          <p class="control">
            <input v-model="query" class="input" type="text" placeholder="Name Search">
          </p>
        </div>
      </div>
      <div class="column is-3">
        <div class="field">
          <label class="label">Page Size</label>
          <p class="control">
            <input v-model="pageSize" class="input" type="text" placeholder="Page Size">
          </p>
        </div>
      </div>
      <div class="column is-3">
        <div class="field">
          <label class="label">Offset</label>
          <p class="control">
            <input v-model="offset" class="input" type="text" placeholder="Offset">
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
      <div class="column">
        <a class="button is-success" @click="download()">Download</a>
      </div>
    </div>
    <div class="columns">
      <table class="table is-bordered">
        <thead>
          <tr>
            <th><input type="checkbox"></th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in files">
            <td><input type="checkbox" :checked="file.checked" @click="toggleCheck(file)"></td>
            <td>
              <a v-if="file.isFile == false" title="" @click="goto(file.name)">{{file.name}}</a>
              <span v-else>{{file.name}}</span>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import axios,{CancelToken} from '~plugins/axios'

  export default {
    async asyncData (context) {
      return {
        files: await axios.get("backendless/file/savegame backup")
      }
    },
    mounted() {
      this.files = this.files.data;
    },
    methods:{
      navigateTo:function(nav){
        this.$router.push({ path: nav});
      },
      goto:function (foldername) {
        var self = this;
        this.query = "";
        if(this.path.length == 0){
          this.path.push("savegame backup")
        }
        if(foldername !== "savegame backup"){
          if(this.cancel){
            this.cancel();
            if(this.path.pop()==="savegame backup"){
              this.path.push("savegame backup")
            }
          }
          this.path.push(foldername)
        }

        axios.get("backendless/file/" + this.path.join("/"),{
          cancelToken: new CancelToken(function executor(c) {self.cancel = c;})})
        .then(function(result){
          console.log(result)
          self.cancel = null;
          self.files = result.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      gotoFromBreadcumb:function(name){
        while(this.path[this.path.length - 1] !== name){
          this.path.pop();
        }
        this.path.pop();
        if(name === "savegame backup"){
          this.path = [];
        }
        this.goto(name);
      },
      search:function(){
        var self = this;
        if(this.path.length == 0){
          this.path.push("savegame backup")
        }
        axios.get("backendless/file/" + this.path.join("/"),{
          cancelToken: new CancelToken(function executor(c) {self.cancel = c;}),
          params:{key:self.query,pageSize:self.pageSize,offset:self.offset}
        })
        .then(function(result){
          console.log(result)
          self.cancel = null;
          self.files = result.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      toggleCheck:function(file){
        file.checked = !file.checked;
      },
      download:function(){
        var self = this;
        this.selectedData = [];
        for(var i = 0; i< this.files.length;i++){
          console.log(this.files[i].checked);
          if(this.files[i].checked == true){
            this.selectedData.push(this.files[i]);
          }
        }
        console.log(this.selectedData);
        axios.post("backendless/file/download",{
          cancelToken: new CancelToken(function executor(c) {self.cancel = c;}),
          data:{selectedData:self.selectedData}
        })
        .then(function(result){
          console.log(result)
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    data (){
      return{
        path:[],
        cancel:null,
        query:"",
        pageSize:10,
        offset:0,
        selectedData:[]
      }
    }
  }
</script>