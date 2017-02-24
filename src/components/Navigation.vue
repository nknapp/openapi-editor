<template>
  <div class="ui inverted fluid vertical menu">
    <div class="ui dropdown icon item">
      <i class="wrench icon"></i>
      File
      <div class="menu">
        <div class="item">
          <i class="dropdown icon"></i>
          <span class="text">New</span>
        </div>
        <div @click="loadPetstore" class="item">
          Open...
        </div>
        <div class="item">
          Save...
        </div>
        <div class="divider"></div>
        <div class="header">
          Export
        </div>
        <div class="item">
          Share...
        </div>
      </div>
    </div>
    <div class="ui item">
      <div class="ui icon input">
        <input class="prompt" type="text" placeholder="Search spec..." v-model="searchField">
        <i class="search link icon"></i>
      </div>
      <div class="results"></div>
    </div>
    <div class="item">
      <router-link :to="'/'">Overview</router-link>
    </div>
    <div class="item">
      <div class="header">Paths</div>
      <div class="menu">
        <a class="item" v-for="(operations,path) in filteredPaths">
          <router-link :to="'/path/' + encodeURIComponent(path)">{{path}}</router-link>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import pickBy from 'lodash.pickby'
  import { nonVendor } from '../lib/vendor'

  export default {
    name: 'Navigation',
    props: ['spec'],
    mounted () {
      $(this.$el).find('.dropdown').dropdown()
    },
    data: function () {
      return {
        searchField: null
      }
    },
    computed: {
      filteredPaths: function () {
        var result = nonVendor(this.spec.paths)
        if (!this.searchField) {
          return result
        }
        return pickBy(result, (value, key) => key.indexOf(this.searchField) >= 0)
      }
    },
    methods: {
      loadPetstore: function () {
        this.$emit('loadUrl', 'http://petstore.swagger.io/v2/swagger.json')
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
