<template>
   <component :is="Page" />
</template>

<script>
import HomeView from './components/HomeView.vue';
import QuestionView from './components/QuestionView.vue';
import NotFound from './components/NotFound.vue';
import { ref } from '@vue/reactivity';

export default {
   name: 'App',
   setup() {
      const routes = {
         '/': HomeView,
         '/quiz': QuestionView,
      };
      const path = ref(window.location.pathname);
      return {
         Page: routes[path.value] || NotFound,
      };
   },
};
</script>

<style>
#app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
   margin-top: 60px;
}
</style>
