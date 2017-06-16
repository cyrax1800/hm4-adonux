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
  import axios,{CancelToken,axiosLib} from '~plugins/axios'
  import JSZip from 'jszip'
  import FileSaver from 'file-saver'

  export default {
    async asyncData (context) {
      return {
        files: await axios.get("backendless/file/savegame backup/" + context.params[0],{params:context.query})
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.files = this.files.data.files;
        this.loading = $nuxt.$parent.$parent.$loading;
      })
    },
    updated(){
      // console.log(this.files)
      if(this.files && this.files.data && this.files.data.path){
        if("savegame%20backup/" == this.files.data.path){
          this.path = [];
        }else {
          var tmpArr = this.files.data.path.replace('%20'," ").split("/");
          this.path = tmpArr;
        }
      }
      if(this.files && this.files.data)
        this.files = this.files.data.files;
    },
    methods:{
      navigateTo:function(nav){
        this.$router.push({ path: nav});
      },
      goto:function (foldername) {
        var self = this;
        var tmpPath = this.path.slice();
        tmpPath.splice(0,1);
        if(foldername != "savegame backup")
          tmpPath.push(foldername)
        this.navigateTo("/backendless/" + tmpPath.join("/").replace(" ","+"));
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
        var queryParam = "";
        queryParam = "key="+ this.query;
        this.navigateTo("/backendless/?"+queryParam);
      },
      toggleCheck:function(file){
        file.checked = !file.checked;
      },
      download:function(){
        var self = this;
        this.loading.start();
        this.selectedData = [];
        for(var i = 0; i< this.files.length;i++){
          if(this.files[i].checked == true){
            this.selectedData.push(this.files[i]);
          }
        }
        axios.post("backendless/file/download",{
          cancelToken: new CancelToken(function executor(c) {self.cancel = c;}),
          data:{selectedData:self.selectedData}
        })
        .then(function(result){
          var allPromise = [];
          for (var i = 0; i< result.data.result.length; i++){
            console.log(result.data.result[i])
            allPromise.push(axiosLib.get(result.data.result[i]))
          }
          axiosLib.all(allPromise)
          .then(axiosLib.spread(function (...textResult) {
            var zip = new JSZip();
            for(var i = 0; i < textResult.length; i++){
              var data = textResult[i].data;
              var url = textResult[i].config.url;
              var folder = url.substring(url.indexOf("savegame+backup") + 16, url.lastIndexOf("/")).replace("+"," ");
              var mainFolder = folder.split("/")[0];
              var fileName = url.substring(url.lastIndexOf("/")+1)
              zip.folder(folder).file(fileName, data);
            }
            zip.generateAsync({type:"blob"}).then(function (blob) {
              FileSaver.saveAs(blob, mainFolder+ ".zip");
              self.loading.finish();
            });
          }));
        })
        .catch(function (error) {
          console.log(error);
          self.loading.finish();
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