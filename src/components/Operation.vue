<template>
  <div class="ui fluid card operation" :http_method="method">
    <div class="content">
      <div class="header">
        {{method.toUpperCase()}} {{path}}
      </div>
      <div class="meta">{{operation.summary}}</div>
      <div class="meta">
        <div class="ui label" v-for="tag in operation.tags">
          <i class="tag icon"></i> {{tag}}
        </div>
      </div>
      <div class="description">
        {{operation.description}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Operation',
    props: ['path', 'method', 'operation'],
    computed: {
      operations: function () {
        return this.spec.paths[this.path]
      }
    }
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
