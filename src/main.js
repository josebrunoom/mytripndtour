import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
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
import '@popperjs/core'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css';

const vuetify = createVuetify({
    components,
    directives,
})

const CLIENT_ID = '45064562999-7unahamblqil0gid8uggtkjcr072ekuv.apps.googleusercontent.com'

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
app.use(router)
app.mount('#app')
