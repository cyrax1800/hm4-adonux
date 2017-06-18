<template>
  <section>
    <div class="columns">
      <div class="column">
        <div class="level">
          <nuxt-link to="/quest/add"><span class="icon fa fa-plus is-vertical-center"></span>Add Quest</nuxt-link>
          <div class="level-right">
            <a class="button is-info level-item">Show All</a>
            <a class="button is-info level-item">Hide All</a>
        </div>
        </div>
      </div>
    </div>
    <template>
      <div class="card is-unselectable">
        <header class="card-header" @click="isShowingContent = !isShowingContent">
          <div class="card-header-title">
            <div class="column is-paddingless">
              <p class="">1. Jumble sale</p>
              <table :class="{'is-hidden':!isShowingContent}" class="table is-marginless">
                <thead>
                  <tr>
                    <th>Quest</th>
                    <th>Level</th>
                    <th>Mastery Star</th>
                    <th>Event</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>20, 30</td>
                    <td>20</td>
                    <td>20</td>
                    <td>20</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <a class="card-header-icon">
            <span class="icon">
              <i class="fa fa-angle-down"></i>
            </span>
          </a>
        </header>
        <div class="card-content" :class="{'is-hidden':isShowingContent}">
          <table class="table">
            <thead>
              <tr>
                <th>Requirement:</th>
                <th colspan="3"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Quest: 20, 30</td>
                <td>Level: 20</td>
                <td>Mastery Star: 20</td>
                <td>Event: 20</td>
              </tr>
            </tbody>
          </table>
          <div class="content">
            <p>Text: </p>
            <article class="message">
              <div class="message-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
              </div>
            </article>
            <p>Complete Text: </p>
            <article class="message is-info">
              <div class="message-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
              </div>
            </article>
          </div>
          <p>Task: </p>
          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>QuestID</th>
                <th>Text</th>
                <th>Target</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>BUY_DECOR</td>
                <td>Go to shop decor and build one Tree House</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
          <p>Reward: </p>
          <table class="table">
            <thead>
              <tr>
                <th class="is-narrow">No</th>
                <th class="is-narrow">Image</th>
                <th>Type</th>
                <th>Name</th>
                <th class="is-narrow">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td></td>
                <td>Booster</td>
                <td>Magnifier</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
  import axios from '~plugins/axios'
  export default {
    /*async asyncData (context) {
      return {
        allItem: await axios.get("itemcollection/")
      }
    },*/
    mounted() {
      var self = this;
      this.$nextTick(function () {
      })
    },
    methods:{
      toTitleCase:function(str)
      {
          return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      },
      getImage:function(path){
        return window.location.origin + "/img/" + path;
      }
    },
    data:function(){
      return{
        isShowingContent:false,
      }
    }
  }
</script>