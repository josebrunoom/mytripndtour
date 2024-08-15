import Login from "../components/Login.vue";
import HomeScreen from "../components/HomeScreen.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Roteiro from "../components/Roteiro.vue";

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
                path: "roteiro",
                name: "Roteiro",
                component: Roteiro,
            },
        ]
    },
]

export default routes;