import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Product from '../views/Product.vue'
import Income from '../views/Income.vue'
import Promote from '../views/Promote.vue'
import Help from '../views/Help.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Dashboard
		},
		{
			path: '/product',
			component: Product
		},
		{
			path: '/income',
			component: Income
		},
		{
			path: '/promote',
			component: Promote
		},
		{
			path: '/help',
			component: Help
		},
		{
			path: '/customers',
			component: () => import('../views/ListView.vue')
		},
	],
})

export default router