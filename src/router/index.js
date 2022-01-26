import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/quiz',
		name: 'Quiz',
		component: () => import('../views/Quiz.vue'),
	},
	{
		path: '/results',
		name: 'Results',
		component: () => import('../views/Results.vue'),
	},

]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
