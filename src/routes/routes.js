import Login from "../components/Login.vue";
import HomeScreen from "../components/HomeScreen.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Perfil from "../components/Perfil.vue";
import Politica_privacidade from "../components/politica_privacidade.vue";
import HelloWorld from "../components/HelloWorld.vue";
import ListRoteiro from "../components/ListRoteiro.vue"
import HomeScreenSeeOnly from "../components/HomeScreen-See-Only.vue";

const routes = [
    {
        path:'/',
        name:"Login",
        component:Login
    },
    {
        path:'/mytrip/',
        component:Sidebar,
        children:[
            {
                path: "home",
                name: "home",
                component: HomeScreen,
            },
            {
                path: "hello",
                name: "hello",
                component: HelloWorld,
            },
            {
                path: "perfil",
                name: "Perfil",
                component: Perfil,
            },
            {
                path: "lista",
                name: "Lista",
                component: ListRoteiro,
            },
            {
                path: "visualizacao",
                name: "Visualizacao",
                component: HomeScreenSeeOnly,
            },
        ]
    },
    {
        path:'/politica_privacidade',
        name:"politica_privacidade",
        component:Politica_privacidade
    },
]

export default routes;