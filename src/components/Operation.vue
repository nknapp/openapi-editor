<template>
  <div class="ui fluid card operation" :http_method="method">
    <div class="content">
      <div class="right floated meta">
        <div class="ui label" v-for="tag in tags">
          <i class="tag icon"></i> {{tag}}
        </div>
        <i class="delete icon" @click="removeOperation"></i>
      </div>
      <div class="header">
        {{method.toUpperCase()}} {{path}}
      </div>
      <div class="description">
        <Marked :md="operation.summary" emptyMessage="Click here to add a summary!" @save="saveSummary"></Marked>
        <Marked :md="operation.description"
                emptyMessage="Click here to add a description!"
                rows="7"
                @save="saveDescription"></Marked>
      </div>
      <div class="ui top attached tabular menu">
        <a v-if="nonBodyParams.length" class="item" data-tab="first">Parameters</a>
        <a v-if="bodyParam" class="item" data-tab="second">Request-Body</a>
        <a class="item" data-tab="third">Response-Codes</a>
      </div>
<!--      <div v-if="nonBodyParams.length" class="ui bottom attached tab segment" data-tab="first">
        <Parameters :parameters="nonBodyParams"></Parameters>
      </div>
      <div v-if="bodyParam" class="ui bottom attached tab segment" data-tab="second">
        <BodyParameter :parameter="bodyParam"></BodyParameter>
      </div>
      <div class="ui bottom attached tab segment" data-tab="third">
        Third
      </div> -->
    </div>
  </div>
</template>

<script>

  import Parameters from './Parameters.vue'
  import BodyParameter from './BodyParameter.vue'
  import Marked from './Marked.vue'
  import {resolveRef} from '../lib/ref'

  export default {
    name: 'Operation',
    props: ['method', 'path'],
    computed: {
      nonBodyParams: function () {
        if (!this.operation.parameters) {
          return []
        }
        return this.operation.parameters.filter((param) => param.in !== 'body')
      },
      bodyParam: function () {
        if (!this.operation.parameters) {
          return
        }
        return this.operation.parameters.filter((param) => param.in === 'body')[0]
      },
      operation: function () {
        return this.$store.state.spec.paths[this.path][this.method]
      },
      tags: function () {
        return this.operation.tags || []
      }
    },
    methods: {
      removeOperation: function () {
        this.$store.commit('removeOperation', { path: this.path, method: this.method })
      },
      saveSummary: function (summary) {
        this.$store.commit('saveOperationField', {
          path: this.path,
          method: this.method,
          field: 'summary',
          value: summary
        })
      },
      saveDescription: function (description) {
        this.$store.commit('saveOperationField', {
          path: this.path,
          method: this.method,
          field: 'description',
          value: description
        })
      }

    },
    mounted: function () {
      $(this.$el).find('.ui.tabular .item').tab({
        context: $(this.$el)
      })
    },
    components: { Marked, Parameters, BodyParameter }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ui.card.operation {
    border-left: 5px solid;
  }

  .ui.card.operation[http_method='get'] {
    border-color: darkblue;
  }

  .ui.card.operation[http_method='post'] {
    border-color: darkgreen;
  }

  .ui.card.operation[http_method='put'] {
    border-color: darkorange;
  }

  .ui.card.operation[http_method='delete'] {
    border-color: darkred;
  }

  .ui.card.operation[http_method='patch'] {
    border-color: rebeccapurple;
  }

  .ui.card.operation[http_method='head'] {
    border-color: darkcyan;
  }

  .ui.card.operation[http_method='options'] {
    border-color: darkgray;
  }

</style>
