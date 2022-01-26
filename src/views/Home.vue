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
         <span class="error" v-if="errorMsg">{{ errorMsg }}</span>
      </div>
   </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
export default {
   name: 'Home',
   setup: () => {
      const router = useRouter();
      const quizes = ref([]);
      const selectedId = ref(-1);
      const selectedName = ref('');
      const errorMsg = ref('');
      const startQuiz = () => {
         const id = selectedId.value;
         const name = selectedName.value;
         if (id === -1) {
            errorMsg.value = 'No quiz selected';
            return;
         }
         if (!name) {
            errorMsg.value = 'You must choose a name';
            return;
         }
         router.push({ name: 'Quiz', params: { id, name } });
      };
      onMounted(async () => {
         try {
            const res = await fetch('https://printful.com/test-quiz.php?action=quizzes');
            const r = await res.json();
            console.log('results from quizes api', r);
            if (!r || !r[0] || !r[0].id) return;
            selectedId.value = r[0].id;
            quizes.value = r;
         } catch (e) {
            console.error('Error getting quizes', e);
         }
      });
      return {
         quizes,
         selectedId,
         selectedName,
         startQuiz,
         errorMsg,
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
.error{
	color:red;
	margin-top: 1rem;
	font-weight: bold;
}
</style>
