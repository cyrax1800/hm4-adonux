<template>
  <section>
    <div class="columns">
      <div class="column is-half">
        <div class="field">
          <label class="label">Name</label>
          <p class="control">
            <input class="input" type="text" placeholder="Item name">
          </p>
        </div>
        <div class="field">
          <label class="label">Rarity</label>
          <p class="control">
            <span class="select">
              <select>
                <option>Common</option>
                <option>Uncommon</option>
                <option>Rare</option>
                <option>Epic</option>
              </select>
            </span>
          </p>
        </div>
        <div class="columns">
          <div class="column is-narrow">
            <div class="field">
              <label class="label">Image</label>
              <figure class="image is-64x64 control">
                <img src="http://bulma.io/images/placeholders/64x64.png">
              </figure>
            </div>
          </div>
          <div class="column">
            <div class="field">
                <label class="label">&nbsp;</label>
                <p class="control">File: </p>
                <input type="file" name="" id="file-1" class="inputfile inputfile-1 button" style="display: none;" />
                <label for="file-1"><span>Choose a file</span></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from '~plugins/axios'

  export default {
    mounted() {
      var self = this;
    },
    methods:{
      
    },
    data:function(){
      return{
      }
    }
  }
</script>