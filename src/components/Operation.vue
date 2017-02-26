<template>
  <div class="ui fluid card operation" :http_method="method">
    <div class="content">
      <div class="right floated meta">
        <div class="ui label" v-for="tag in operation.tags">
          <i class="tag icon"></i> {{tag}}
        </div>
      </div>
      <div class="header">
        {{method.toUpperCase()}} {{path}}
      </div>
      <div class="meta">{{operation.summary}}</div>
      <div class="description">
        <Marked :md="operation.description"></Marked>
      </div>
      <div class="ui top attached tabular menu">
        <a v-if="nonBodyParams.length" class="item" data-tab="first">Parameters</a>
        <a v-if="bodyParam" class="item" data-tab="second">Request-Body</a>
        <a class="item" data-tab="third">Response-Codes</a>
      </div>
      <div v-if="nonBodyParams.length" class="ui bottom attached tab segment" data-tab="first">
        <Parameters :parameters="nonBodyParams"></Parameters>
      </div>
      <div v-if="bodyParam" class="ui bottom attached tab segment" data-tab="second">
        <BodyParameter :parameter="bodyParam"></BodyParameter>
      </div>
      <div class="ui bottom attached tab segment" data-tab="third">
        Third
      </div>
    </div>
  </div>
</template>

<script>

  import Parameters from './Parameters.vue'
  import BodyParameter from './BodyParameter.vue'
  import Marked from './Marked.vue'
  export default {
    name: 'Operation',
    props: ['path', 'method', 'operation', 'spec'],
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
      }
    },
    mounted: function () {
      console.log("teststesfadsd",$(this.$el).find('.ui.tabular'))
      $(this.$el).find('.ui.tabular .item').tab({
        context: $(this.$el)
      })
    },
    components: { Marked, Parameters, BodyParameter }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .ui.card.operation {
    border-left: 5px solid;

    &[http_method='get'] {
      border-color: darkblue;
    }

    &[http_method='post'] {
      border-color: darkgreen;
    }

    &[http_method='put'] {
      border-color: darkorange;
    }

    &[http_method='delete'] {
      border-color: darkred;
    }

    &[http_method='patch'] {
      border-color: rebeccapurple;
    }

    &[http_method='head'] {
      border-color: darkcyan;
    }

    &[http_method='options'] {
      border-color: darkgray;
    }

  }
</style>
