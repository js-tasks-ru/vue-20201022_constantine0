export const CounterButton = {
  template: '<button type="button" @click="processButtonClick">{{ count }}</button>',

  props: {
    count: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  methods: {
    processButtonClick() {
      this.$emit("increment", this.count + 1);
    },
  },

  model: {
    prop: "count",
    event: "increment"
  },
};
