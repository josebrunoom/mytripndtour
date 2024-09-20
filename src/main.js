import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import router from './routes'
import './index.css'
import vue3GoogleLogin from 'vue3-google-login'
import 'vuetify/dist/vuetify.min.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import VueSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PrimeVue from "primevue/config";
import Aura from '@primevue/themes/aura';
import Tooltip from 'primevue/tooltip';
import '@popperjs/core'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@mdi/font/css/materialdesignicons.css';


const vuetify = createVuetify({
    components,
    directives,
})

const CLIENT_ID = '667280034337-clqs1ehk1tuhtnb536d85gkngr5maq03.apps.googleusercontent.com'

const app = createApp(App)
app.use(vue3GoogleLogin, {
    clientId: CLIENT_ID
})
app.use(vuetify)
app.use(VueDatePicker)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.directive('tooltip', Tooltip);
app.use(router)
app.mount('#app')
