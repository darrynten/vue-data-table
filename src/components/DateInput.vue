<template>
  <div>
    <span>
      {{ title }}
    </span>
    <div class="date-input">
      <datatable-date-picker
        :name="name"
        :value="value"
        ref="dateInput"
        @input="event">
      </datatable-date-picker>
      <clear-button
        v-if="value"
        @click="clear">
      </clear-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  div {
    display: flex;
    flex-direction: column;

    span {
      font-size: calc(var(--padding) * 0.8);
      margin: var(--padding) 0 calc(var(--padding) / 2) 0;
    }

    div.date-input {
      flex-direction: row;
    }
  }
</style>

<script>
  import DatatableDatePicker from './DatePicker.vue'
  import ClearButton from './ClearButton.vue'

  export default {
    components: {
      DatatableDatePicker,
      ClearButton
    },
    methods: {
      clear() {
        this.event(null)
        this.$refs.dateInput.$refs.inputArea.focus()
      }
    },
    props: {
      value: {
        type: String
      },
      event: {
        type: Function
      },
      name: {
        type: String
      },
      title: {
        type: String
      }
    }
  }
</script>
