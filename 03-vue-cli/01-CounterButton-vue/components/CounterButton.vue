<template>
  <button @click="onButtonClick">{{ count }}</button>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    onButtonClick() {
      this.$emit("increment", this.count + 1);
    },
  },
  model: {
    prop: "count",
    event: "increment"
  },
};
</script>

<style></style>
