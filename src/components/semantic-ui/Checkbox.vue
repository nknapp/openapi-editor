<template>
  <div :class="styleClass">
    <input type="checkbox" :name="name" :value="checked">
    <label><slot></slot></label>
  </div>
</template>

<script>
  export default {
    name: 'Checkbox',
    props: ['type', 'name', 'value', 'placeholder', 'accessKey', 'valueFn'],
    mounted: function () {
      $(this.$el).checkbox({
        onChange: () => this.updateValue(this.$el.classList.contains('checked'))
      });
    },
    data: function() {
      return {
        checked: this.value
      }
    },
    methods: {
      updateValue: function (newValue) {
        this.checked = newValue
        this.$emit("input", newValue)
      }
    },
    computed: {
      styleClass: function () {
        return `ui ${this.type || ''} checkbox`
      }
    }
  }

</script>
