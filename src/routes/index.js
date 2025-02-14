import { createWebHistory, createRouter } from 'vue-router'
import routes from './routes';

const router = createRouter({
    history: createWebHistory(""),
    routes,
  })

  router.beforeEach((to, from, next) => {
    try{
      console.log("Navegando para:", to.path);
    
      // Ajuste os caminhos para incluir "/roteiro/"
      const publicPages = ['/roteiro/', '/politica_privacidade'];
  
      console.log("Public: ", publicPages);
      // Verifica se a página exige autenticação
      const authRequired = !publicPages.includes(to.path) && !to.path.includes('politica_privacidade');
      console.log("Auth: ", authRequired);
  
      const token = localStorage.getItem('token');
  
      // Se for necessário autenticar e não houver token, redireciona para a Home
      if (authRequired && !token) {
        return next('/');
      }
  
      next();
    }
    catch(e){
      console.log(e);
    }
    
});

export default router;