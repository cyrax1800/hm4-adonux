<template>
  <div class="container">
    <br>
    <nav class="nav has-shadow">
      <div class="nav-left">
        <div class="container">
          <h1 class="title is-3">Origaming - Home Makeover 4 data</h1>
        </div>
      </div>
    </nav>
    <br>
    <div class="columns">
      <div class="column is-2">
        <aside class="menu">
          <p class="menu-label">Menu</p>
          <ul class="menu-list">
            <li><nuxt-link to="/backendless/">Backendless</nuxt-link></li>
            <li><nuxt-link to="/quest">Quest</nuxt-link></li>
          </ul>
          <p class="menu-label">Playfab</p>
          <ul class="menu-list">
            <li><nuxt-link to="/playfab/send-notification">Send Notification</nuxt-link></li>
            <li><nuxt-link to="/playfab/player-inventory">Player Inventory</nuxt-link></li>
          </ul>
          <p class="menu-label">Items</p>
          <ul class="menu-list">
            <li><nuxt-link to="/item-material">Items Material</nuxt-link></li>
            <li><nuxt-link to="/item-collection">Items Collection</nuxt-link></li>
          </ul>
          
        </aside>
      </div>
      <div class="column">
        <nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
import MyFooter from '~components/Footer.vue'

export default {
  components: {
    MyFooter
  }
}
</script>

<style>
</style>
