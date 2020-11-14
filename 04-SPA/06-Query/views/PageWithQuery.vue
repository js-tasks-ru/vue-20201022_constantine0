<template>
  <div class="container">
    <meetups-view v-bind.sync="params" />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },

  defaultFilters: {
    view: 'list',
    date: 'all',
    participation: 'all',
    search: '',
  },

  computed: {
    params() {
      let params = { ...this.$options.defaultFilters };

      for (const [name, value] of Object.entries(this.$route.query)) {
        params[name] = value;
      }

      const router = this.$router;
      const defaultFilters = this.$options.defaultFilters;

      return new Proxy(params, {
        set(obj, key, value) {
          if (obj[key] === value) {
            return true;
          }
          obj[key] = value;

          const query = Object.fromEntries(
            Object.entries(obj).filter(
              ([name, value]) => value != defaultFilters[name],
            ),
          );

          // Здесь я выбрал router.push,
          // согласно документации единственное различие - это новое состояние в истории при смене фильтров.
          // Я проверил другие приложения (Ютуб),там смена фильтров сохраняется в истории и я решил сделать также.
          router.push({ query });

          return true;
        },
      });
    },
  },
};
</script>

<style scoped></style>
