<template>
  <template v-if="view === 'Home'">
    <HomeView />
  </template>
  <template v-if="view === 'Question'">
    <QuestionView />
  </template>
  <template v-if="view === 'Results'">
    <ResultsView />
  </template>
</template>

<script>
import HomeView from "./components/HomeView.vue";
import QuestionView from "./components/QuestionView.vue";
import ResultsView from "./components/ResultsView.vue";

export default {
  name: "App",
  components: {
    HomeView,
    QuestionView,
    ResultsView,
  },
  data() {
    return {
      view: "Home",
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
