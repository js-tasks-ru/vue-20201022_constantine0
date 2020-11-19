<template>
  <div class="container">
    <meetups-view :view.sync="view" :date.sync="date" :participation.sync="participation" :search.sync="search" />
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
    view: {
      get() {
        return this.paramGetter('view');
      },
      set(value) {
        this.paramSetter('view', value);
      },
    },
    date: {
      get() {
        return this.paramGetter('date');
      },
      set(value) {
        this.paramSetter('date', value);
      },
    },
    participation: {
      get() {
        return this.paramGetter('participation');
      },
      set(value) {
        this.paramSetter('participation', value);
      },
    },
    search: {
      get() {
        return this.paramGetter('search');
      },
      set(value) {
        this.paramSetter('search', value);
      },
    },
  },

  methods: {
    paramGetter(name) {
      return this.$route.query[name] || this.$options.defaultFilters[name];
    },

    paramSetter(name, value) {
      if (value === this[name]) {
        return;
      }

      let query = { ...this.$route.query };

      delete query[name];
      if (value != this.$options.defaultFilters[name]) {
        query[name] = value;
      }

      // Здесь я выбрал router.push,
      // согласно документации единственное различие - это новое состояние в истории при смене фильтров.
      // Я проверил другие приложения (Ютуб),там смена фильтров сохраняется в истории и я решил сделать также.
      this.$router.push({ query });
    },
  },
};
</script>

<style scoped></style>
