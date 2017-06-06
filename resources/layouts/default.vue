<template>
  <div class="container">
    <h1>Origaming - Home Makeover 4 data</h1>
    <hr>
    <div class="row">
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <nav class="jobdesc">
          <ul class="nav">
            <li><nuxt-link to="/backendless">Backendless</nuxt-link></li>
            <li><a>Items</a><a class="toggle-custom" id="btn-1" data-toggle="collapse" data-target="#submenu1" aria-expanded="false"><span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span></a>
              <ul class="nav collapse nested" id="submenu1" role="menu" aria-labelledby="btn-1">
                <li><nuxt-link to="/item-material">Items Material</nuxt-link></li>
                <li><nuxt-link to="/item-colelction">Items Collection</nuxt-link></li>
              </ul>
            </li>
            <li><nuxt-link to="/quest">Quest</nuxt-link></li>
          </ul>
        </nav>
      </div>
      <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
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
