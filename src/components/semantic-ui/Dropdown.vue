<template>
  <div class="ui fluid search selection dropdown" :accessKey="accessKey">
    <input type="hidden" :name="name" v-model.lazy="current" @change="updateValue">
    <i class="dropdown icon"></i>
    <div class="default text">{{placeholder}}</div>
    <div class="menu">
      <div v-for="(choice,index) in choices" class="item" :data-value="valueFn(choice)"><slot :choice="choice"></slot></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Dropdown',
    props: ['choices', 'name', 'value', 'placeholder', 'accessKey', 'valueFn'],
    data: function () {
      return {
        current: this.valueFn(this.value),
        valueToChoice: this.choices.reduce((result, choice) => {
          result[this.valueFn(choice)] = choice
          return result;
        }, {})
      }
    },
    mounted: function () {
      $(this.$el).dropdown();
    },
    methods: {
      updateValue: function (event) {
        this.$emit("input", this.valueToChoice[event.target.value])
      }
    },
    computed: {}
  }

</script>
