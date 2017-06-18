<template>
  <section>
    <div class="columns">
      <div class="column is-half">
        <div class="field">
          <label class="label">Name</label>
          <p class="control">
            <input v-model="name" class="input" type="text" placeholder="Item name">
          </p>
        </div>
        <div class="field">
          <label class="label">Rarity</label>
          <p class="control">
            <span class="select">
              <select v-model="selectedRarity">
                <option v-for="rarity in rarities" v-bind:value="rarity.value">
                  {{ rarity.text }}
                </option>
              </select>
            </span>
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
        <div class="field">
          <a class="button is-info control" @click="addItem()">Add</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import axios,{CancelToken,axiosLib} from '~plugins/axios'

  export default {
    mounted() {
      var self = this;
      // this.loading = $nuxt.$parent.$parent.$loading
      this.imgPath = "http://bulma.io/images/placeholders/64x64.png";
    },
    methods:{
      addImage: function(e){
        var target = e.target;
        var tmpFile = target.files[0];
        var fd = new FormData();
        var self = this;
        fd.append("filegambar", tmpFile);
        fd.append("path","img/item-material")
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
      addItem:function(){
        var self = this;
        // this.loading.start();
        axios.post("item/add",{
          cancelToken: new CancelToken(function executor(c) {self.cancel = c;}),
          data:{name:self.name,rarity:self.selectedRarity,imgPath:self.imgPath.replace(window.location.origin + '/img/',"")}
        })
        .then(function(result){
          console.log(result);
          // self.loading.finish();
        })
        .catch(function(error){
          console.log(error);
          // self.loading.finish();
        })
      }
    },
    data:function(){
      return{
        name:'',
        imgPath:'',
        filename:'',
        selectedRarity:1,
        rarities:[
          {text:"Common", value:1},
          {text:"Uncommon", value:2},
          {text:"Rare", value:3},
          {text:"Epic", value:4}
        ]
      }
    }
  }
</script>