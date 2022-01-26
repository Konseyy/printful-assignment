<template>
   <div class="page">
      <div class="container">
         <h1>Technical Task</h1>
         <input v-model="selectedName" placeholder="Enter your name" type="text" />
         <select v-model="selectedId" name="cars" id="cars">
            <option v-for="item in quizes" :key="item.id" :value="item.id">
               {{ item.title }}
            </option>
         </select>
         <button @click="startQuiz()">Start</button>
      </div>
   </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core';
export default {
   name: 'HomeView',
   setup: () => {
      const quizes = ref([]);
      const selectedId = ref(-1);
      const selectedName = ref('');
      const startQuiz = () => {
         const id = selectedId.value;
         const name = selectedName.value;
         if (id === -1) return;
         const url = `/quiz?id=${id}`;
         console.log('redirecting to url', url, 'with name', name);
         // window.location = url;
      };
      onMounted(async () => {
         const res = await fetch('https://printful.com/test-quiz.php?action=quizzes');
         const r = await res.json();
         console.log('results from quizes api', r);
         if (!r) return;
         selectedId.value = r[0].id;
         quizes.value = r;
      });
      return {
         quizes,
         selectedId,
         selectedName,
         startQuiz,
      };
   },
};
</script>

<style scoped>
.page {
   display: flex;
   align-items: center;
   justify-content: center;
}
.container {
   display: flex;
   flex-direction: column;
}
</style>
