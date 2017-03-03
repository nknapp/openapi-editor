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
  import jsref from 'jsref'
  import merge from 'lodash.merge'
  import { store } from './store/index'


  export default {
    name: 'app',
    store,
    components: { Navigation, InfoObject, Paths },
    computed: {
      spec: function () {
        return this.$store.state.spec
      }
    },
    methods: {
      loadUrl: function (url) {
        $.get(url).then((result) => {
          this.$store.spec = merge(result, jsref(result, ))
        })
      },
      load: function(spec) {
        // Resolve $ref-properties, but retain them
        let originalSpec = JSON.parse(JSON.stringify(spec));
        jsref(spec, { deep: true}).then((resolvedSpec) => {
          this.$data.spec = merge(originalSpec, resolvedSpec)
        })
      }
    }
  }
</script>

<style>
  html, body {
    font-size: 12pt;
  }
  @media handheld and (min-resolution: 120dpi) {
    html, body {
      zoom: 1.5;
    }
  }

  @media not handheld and (min-resolution: 120dpi) {

    #navigation {
      font-size: 50px;
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
