<script>
export default {
  name: 'NodesPagination',

  props: {
    page: {
      type: Number,
    },
    perPage: {
      type: Number,
    },
  },

  render(createElement) {
    const children = this.$slots.default || [];

    const pageStart = (this.$props.page - 1) * this.$props.perPage;
    const pageEnd = pageStart + this.$props.perPage;

    return createElement('div', children.slice(pageStart, pageEnd));
  },
};
</script>

<style scoped></style>
