import Login from "../components/Login.vue";
import HomeScreen from "../components/HomeScreen.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Perfil from "../components/Perfil.vue";

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
                path: "perfil",
                name: "Perfil",
                component: Perfil,
            },
        ]
    },
]

export default routes;