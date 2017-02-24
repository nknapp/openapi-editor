<template>
  <div id="app">
    <div id="main" class="ui grid">
      <div class="ui four wide column">
        <Navigation v-on:loadUrl="loadUrl" :spec="spec">
          <div class="ui item">Swagger {{spec.swagger}}</div>
        </Navigation>
      </div>
      <div class="ui eight wide column">
        <router-view :spec="spec"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint no-unused-vars: "off" */
  import Navigation from 'components/Navigation'
  import InfoObject from 'components/InfoObject'
  import Paths from 'components/Paths'

  export default {
    name: 'app',
    components: { Navigation, InfoObject, Paths },
    data: function () {
      return {
        spec: require('./example.json')
      }
    },
    methods: {
      loadUrl: function (url) {
        $.get(url).then((result) => {
          this.$data.spec = result
        })
      }
    }
  }
</script>

<style>
  #app > .container {
    max-width: 700px;
  }
</style>
