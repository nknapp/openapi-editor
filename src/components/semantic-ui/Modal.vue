<template>
  <div class="ui modal">
    <i class="close icon" @click="cancel"></i>
    <div v-if="header" class="header">{{header}}</div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="actions" slot="actions">
      <button class="ui cancel button" @click="cancel">
        Cancel
      </button>
      <button class="ui positive right labeled icon button" @click="save">
        Save
        <i class="checkmark icon"></i>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    props: ['header', 'visible'],

    methods: {
      save: function () {
        this.$emit('save')
        return true;
      },
      cancel: function () {
        this.$emit('cancel')
        return true;
      }
    },
    watch: {
      visible: function (newValue) {
        $(this.$el).modal(newValue ? 'show' : false)
      }
    },
    beforeDestroy: function() {
    }
  }

</script>

<style>
  .ui.modal {
  }
</style>
