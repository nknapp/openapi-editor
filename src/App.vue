<template>
  <div id="app">
    <div id="main">
      <div class="ui container">
        <router-view :spec="spec"></router-view>
      </div>
    </div>
    <div id="navigation" class="ui container">
      <Navigation v-on:loadUrl="loadUrl" :spec="spec">
        <div class="ui item">Swagger {{spec.swagger}}</div>
      </Navigation>
    </div>
  </div>
</template>

<script>
  /* eslint no-unused-vars: "off" */
  import Navigation from 'components/Navigation'
  import InfoObject from 'components/InfoObject'
  import Paths from 'components/Paths'
  import jref from 'json-ref-lite'


  export default {
    name: 'app',
    components: { Navigation, InfoObject, Paths },
    data: function () {
      return {
        spec: jref.resolve(require('./example.json'))
      }
    },
    methods: {
      loadUrl: function (url) {
        $.get(url).then((result) => {
          this.$data.spec = jref.resolve(result)
        })
      }
    }
  }
</script>

<style>
  html, body {
    zoom: 1.1;
  }
  @media handheld and (min-resolution: 120dpi) {
    html, body {
      zoom: 1.5;
    }
  }

  @media not handheld and (min-resolution: 120dpi) {

    #navigation {
      width: 20rem;
      position: absolute;
      top: 0;
      left: 0;
      right: auto;
      bottom: 0
    }

    #main {
      position: absolute;
      top: 0;
      left: 20rem;
      right: 0;
      width: auto;
      padding: 1rem;
    }
  }


</style>
