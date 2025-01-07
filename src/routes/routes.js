import Login from "../components/Login.vue";
import HomeScreen from "../components/HomeScreen.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Perfil from "../components/Perfil.vue";
import Politica_privacidade from "../components/politica_privacidade.vue";
import HelloWorld from "../components/HelloWorld.vue";
import ListRoteiro from "../components/ListRoteiro.vue"
import HomeScreenSeeOnly from "../components/HomeScreen-See-Only.vue";
import ExtratoPage from "../components/ExtratoPage.vue";
import Contato from "../components/Contato.vue";
import PdfSave from "../components/pdfSave.vue";

const routes = [
    {
        path:'/roteiro',
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
                path: "extrato",
                name: "Extrato",
                component: ExtratoPage,
            },
            {
                path: "visualizacao",
                name: "Visualizacao",
                component: HomeScreenSeeOnly,
            },
            {
                path: "contato",
                name: "Contato",
                component: Contato,
            },

        ]
    },
    {
        path:'/politica_privacidade',
        name:"politica_privacidade",
        component:Politica_privacidade
    },
    {
        path: "/save",
        name: "Save",
        component: PdfSave,
    },
]

export default routes;