<template>
  <AppInput
    :type="type"
    :value="datetimeValue"
    v-bind="$attrs"
    @change="onDateChange"
  >
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';
import {dateFormatter, timeFormatter, timeWithSecondsFormatter, datetimeLocalFormatter} from "../utils/date";

export default {
  name: 'DateInput',

  components: { AppInput },

  computed: {
    datetimeValue() {
      let dateToFormat = this.valueAsDate;

      if (this.valueAsNumber) {
        dateToFormat = new Date(this.valueAsNumber);
      }

      if (!dateToFormat) {
        return this.value;
      }

      if (
        this.type == 'time' &&
        'step' in this.$attrs &&
        this.$attrs['step'] != 60
      ) {
        return this.$options.formatters['timeWithSeconds'](dateToFormat);
      }

      return this.$options.formatters[this.type](dateToFormat);
    },
  },

  formatters: {
    date: dateFormatter,
    time: timeFormatter,
    timeWithSeconds: timeWithSecondsFormatter,
    ['datetime-local']: datetimeLocalFormatter,
  },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: function (value) {
        return ['date', 'time', 'datetime-local'].includes(value);
      },
    },
    valueAsNumber: {
      type: Number,
    },
    valueAsDate: {
      type: Date,
    },

    // Чтобы value не было в списке $attrs, его можно указать в списке параметров
    value: {
      type: String,
    },
  },

  methods: {
    onDateChange(event) {
      this.$emit('update:valueAsNumber', event.target.valueAsNumber);

      this.$emit('update:valueAsDate', new Date(event.target.valueAsNumber));
    },
  },
};
</script>

<style scoped></style>
