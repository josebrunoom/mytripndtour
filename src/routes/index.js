import { createWebHistory, createRouter } from 'vue-router'
import routes from './routes';

const router = createRouter({
    history: createWebHistory('/roteiro'),
    routes,
  })

router.beforeEach((to, from, next) => {
    const publicPages = ['/', '/politica_privacidade'];
    const authRequired = !publicPages.includes(to.path);
    const token = localStorage.getItem('token');
    if (authRequired && !token) {
        return next('/');
    }
    next();
});

export default router;