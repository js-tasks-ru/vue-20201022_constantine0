<template>
  <footer class="footer">
    <div class="container">
      {{ copyright }}
      <a :href="href">{{ title }}</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',

  data() {
    return {
      title: 'Vue.js Course',
      href: 'https://learn.javascript.ru/courses/vue',
      copyright: `© ${new Date().getFullYear()}. learn.javascript.ru`,
    };
  },
};
</script>

<style scoped>
.footer {
  padding: 100px 0 60px;
  text-align: center;
}
</style>
