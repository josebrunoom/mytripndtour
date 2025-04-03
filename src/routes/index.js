import { createWebHistory, createRouter } from 'vue-router'
import routes from './routes';

const router = createRouter({
  history: createWebHistory("/"),
  routes,
})

router.beforeEach((to, from, next) => {
  try {
    console.log("Navegando para:", to.path);

    const publicPages = ['/', '/politica_privacidade', '/roteiro/politica_privacidade'];

    const authRequired = !publicPages.includes(to.path);
    console.log("Auth: ", authRequired);

    const token = localStorage.getItem('token');
    console.log("token: ", token);

    if (authRequired && !token) {
      return next('/');
    }

    next();
  }
  catch (e) {
    console.log(e);
  }

});

export default router;