import { createWebHistory, createRouter } from 'vue-router'
import routes from './routes';

const router = createRouter({
    history: createWebHistory(""),
    routes,
  })

  router.beforeEach((to, from, next) => {
    console.log("Navegando para:", to.fullPath);
    
    // Ajuste os caminhos para incluir "/roteiro/"
    const publicPages = ['/roteiro/', '/politica_privacidade'];

    // Verifica se a página exige autenticação
    const authRequired = !publicPages.includes(to.path);
    const token = localStorage.getItem('token');

    // Se for necessário autenticar e não houver token, redireciona para a Home
    if (authRequired && !token) {
        return next('/roteiro/');
    }

    next();
});

export default router;