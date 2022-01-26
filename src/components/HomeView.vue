<template>
  <div class="hello">
    {{testData}}
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      testData: "",
    };
  },
  async mounted() {
    const res = await fetch(
      "https://printful.com/test-quiz.php?action=quizzes"
    );
    const r = await res.json();
    if (!r) return;
    this.testData = r;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
