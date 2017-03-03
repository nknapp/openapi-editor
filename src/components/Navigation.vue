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
      <div class="ui inverted transparent icon input">
        <input class="prompt" type="text" placeholder="Search spec..." v-model="searchField">
        <i class="search link icon"></i>
      </div>
    </div>
    <div class="item">
      <router-link :to="'/'">Overview</router-link>
    </div>
    <div class="item">
      <div class="header">Paths</div>
      <PathsNavigation ></PathsNavigation>
    </div>
  </div>
</template>

<script>
  import pickBy from 'lodash.pickby'
  import {nonVendor} from '../lib/vendor'
  import router from '../router/index'
  import Search from './semantic-ui/Search'
  import PathsNavigation from './PathsNavigation'

  export default {
    name: 'Navigation',
    props: ['spec'],
    mounted () {
      $(this.$el).find('.dropdown').dropdown();
    },
    components: { Search, PathsNavigation },
    data: function () {
      return {
        pathName: null,
        searchField: null
      }
    },
    computed: {
      pathList: function () {
        return Object.keys(this.$store.state.spec.paths)
          .map(function (path) {
            return {
              title: path
            }
          })
      }
    },
    methods: {
      loadPetstore: function () {
        this.$emit('loadUrl', 'http://petstore.swagger.io/v2/swagger.json')
      }
      ,
      addPath: function () {
        this.$store.commit('addPath', this.pathName)
        router.push('/path/' + encodeURIComponent(this.pathName))
      }
      ,
      deletePath: function (name) {
        this.$store.commit('deletePath', name)
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
