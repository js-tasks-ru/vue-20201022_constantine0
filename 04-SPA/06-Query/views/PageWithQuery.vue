<template>
  <div class="container">
    <meetups-view v-bind.sync="params" />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';
import Vue from 'vue';

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
    params: {
      get() {
        const params = Object.assign({}, this.$options.defaultFilters, this.$route.query);
        Vue.observable(params);

        return params;
      },
    },
  },

  watch: {
    params: {
      deep: true,
      handler() {
        const query = Object.fromEntries(
          Object.entries(this.params).filter(
            ([name, value]) => value != this.$options.defaultFilters[name],
          ),
        );

        // Здесь я выбрал router.push,
        // согласно документации единственное различие - это новое состояние в истории при смене фильтров.
        // Я проверил другие приложения (Ютуб),там смена фильтров сохраняется в истории и я решил сделать также.
        this.$router.push({ query });
      },
    },
  },
};
</script>

<style scoped></style>
