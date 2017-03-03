<template>
  <div class="ui search">
    <div class="ui icon input">
      <input class="prompt" type="text"
             @focus="focus" @blur="blur" @keyup="focus()" @keyup.enter="choose(filteredResult[0])"
             v-model="searchString" :placeholder="placeholder" :accesskey="accessKey">
      <i class="plus link icon" @click="focus()"></i>
    </div>
    <transition name="fade">
      <div v-show="showMenu" class="results">
        <div v-for="result in filteredResult" class="result" @click="choose(result)" >
          <div class="title">{{result.title}}</div>
        </div>
        <div v-if="filteredResult.length === 0" class="message empty">
          <div class="header">No Results</div>
          <div class="description">Your search returned no results</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'Search',
    props: ['source', 'placeholder', 'showAll', 'accessKey'],
    data: function () {
      return {
        searchString: null,
        focused: null
      }
    },
    methods: {
      focus: function () {
        this.focused = true
        return true;
      },
      blur: function () {
        this.focused = false;
        return true;
      },
      choose: function (result) {
        this.$emit('choose',result)
        this.searchString = null
        this.blur()
      }
    },
    computed: {
      showMenu: function () {
        return (this.showAll || this.searchString) && this.focused;
      },
      filteredResult: function () {
        if (!this.searchString) {
          return this.showAll ? this.source : [];
        }

        return this.source.filter((result) => {
          if (!this.searchString) {
            return false
          }
          return result.title.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0
        })
      }
    }
  }
</script>

<style>
  .ui.search > .results {
    display: block;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0
  }
</style>
