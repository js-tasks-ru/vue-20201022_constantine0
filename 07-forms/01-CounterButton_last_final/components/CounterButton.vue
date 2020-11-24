<template>
  <button @click="increment">{{ localCount }}</button>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      localCount: 0,
    };
  },

  methods: {
    increment() {
      this.localCount += 1;

      this.$emit('increment', this.localCount);
    },
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  watch: {
    count: {
      immediate: true,
      handler: function (newCount) {
        if (newCount !== this.localCount) {
          this.localCount = newCount;
        }
      },
    },
  },
};
</script>

<style>

</style>
