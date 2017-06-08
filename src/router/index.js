import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/Layout';
import Home from '@/views/Home';
import Base from '@/views/Demo/base';
Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			component: Home
		}, {
			path: '/demo',
			component: Layout,
			children: [
				{
					path: 'base',
					component: Base
				}
			]
		}
	]
});
