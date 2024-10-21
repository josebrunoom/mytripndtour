<template>
    <div class="h-screen w-screen flex fixed left-0">
        <div class="w-full hidden sm:block md:w-[500px] lg:w-[300px] h-full mt-4 ml-4">
            <div class="h-[calc(100vh-50px)] bg-[#ffff] rounded-lg">
                <div class="flex justify-center mb-4 top-0">
                    <img src="../../assets/Logotipo/Arquivos em Imagem/Arquivos com Fundo/Logotipo_MyTripNTour_ComFundo-01.jpg" alt="Logo" class="img-Logo" />
                </div>
                <div class="col-12 pb-3">
                    <div v-if="currentRouteName=='home'">
                        <button 
                            type="button" 
                            class="me-2 bg-[#78c0d6] text-white pl-2 pr-2 rounded-lg w-36" 
                            @click=""
                        >
                        <i class="fa-regular fa-file"></i>
                        {{ traducao.Roteiros }}
                        </button>
                    </div>
                    <div v-else>
                        <button 
                            type="button" 
                            class="me-2 text-black pl-2 pr-2 rounded-lg w-36" 
                            @click="goTo('home')"
                        >
                        <i class="fa-regular fa-file"></i>
                        {{ traducao.Roteiros }}
                        </button>
                    </div>
            </div>
            <div class="col-12 pb-3">
                <div v-if="currentRouteName=='Perfil'">
                    <button 
                    type="button" 
                    class= "me-2 bg-[#78c0d6] text-white pl-2 pr-2 rounded-lg w-36" 
                    @click=""
                    >
                    <i class="fa-regular fa-user"></i>
                    {{ traducao.MeuPerfil }}
                    </button>
                </div>
                <div v-else>
                    <button 
                    type="button" 
                    class="me-2 text-black pl-2 pr-2 rounded-lg w-36" 
                    @click="goTo('perfil')"
                    >
                    <i class="fa-regular fa-user"></i>
                    {{ traducao.MeuPerfil }}
                    </button>
                </div>
            </div>
            <div class="col-12 pb-3">
                <div v-if="currentRouteName=='Lista'">
                    <button 
                    type="button" 
                    class= "me-2 bg-[#78c0d6] text-white pl-2 pr-2 rounded-lg w-36" 
                    @click=""
                    >
                    <i class="fa-solid fa-list"></i>
                    Histórico de Roteiros
                    </button>
                </div>
                <div v-else>
                    <button 
                    type="button" 
                    class="me-2 text-black pl-2 pr-2 rounded-lg w-36" 
                    @click="goTo('lista')"
                    >
                    <i class="fa-solid fa-list"></i>
                    Histórico de Roteiros
                    </button>
                </div>
            </div>  
            <!-- <div class="col-12 pb-3">
                <button 
                    type="button" 
                    class="me-2 text-black hover:text-white pl-2 pr-2 rounded-lg w-36" 
                    @click="openModal"
                >
                <i class="fas fa-wallet"></i>
                Comprar créditos
                </button>
            </div> -->
            <!-- <div class="col-12 pb-3">
                <google-pay-button
                environment="TEST"
                button-type="buy"
                button-color="black"
                v-bind:paymentRequest.prop="{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                    {
                        type: 'CARD',
                        parameters: {
                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                        allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
                        },
                        tokenizationSpecification: {
                        type: 'PAYMENT_GATEWAY',
                        parameters: {
                            gateway: 'example',
                            gatewayMerchantId: 'BCR2DN4TSO64XXLK'
                        }
                        }
                    }
                    ],
                    transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPriceLabel: 'Total',
                    totalPrice: '100.00',
                    currencyCode: 'BRL',
                    countryCode: 'BR'
                    }
                }"
                v-on:loadpaymentdata="onLoadPaymentData"
                v-on:error="onError"
                ></google-pay-button>
            </div> -->
            <div class="col-12 pb-3">
                <button 
                    type="button" 
                    class="me-2 text-black hover:text-white pl-2 pr-2 rounded-lg w-36" 
                    @click="openDialog('sair')"
                >
                <i class="fa-solid fa-door-open"></i>
                {{ traducao.Sair }}
                </button>
            </div>
            </div>
        </div>
        <div>
    <!-- Toggle button to show/hide the sidebar -->
    

    <!-- Sidebar with transition for smooth slide -->
        <transition name="slide" style="z-index: 99999;">
            <div 
            v-if="isSidebarOpen" 
            class="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg p-4 z-50"
            style="width: 18rem;" 
            >
            <div class="flex justify-center mb-4 top-0">
                <img 
                src="../../assets/Logotipo/Arquivos em Imagem/Arquivos com Fundo/Logotipo_MyTripNTour_ComFundo-01.jpg" 
                alt="Logo" 
                class="img-Logo" 
                />
            </div>

            <div class="col-12 pb-3">
                <div v-if="currentRouteName=='home'">
                <button 
                    type="button" 
                    class="me-2 bg-[#78c0d6] text-white pl-2 pr-2 rounded-lg w-36" 
                    @click=""
                >
                    <i class="fa-regular fa-file"></i>
                    {{ traducao.Roteiros }}
                </button>
                </div>
                <div v-else>
                <button 
                    type="button" 
                    class="me-2 text-black pl-2 pr-2 rounded-lg w-36" 
                    @click="goTo('home')"
                >
                    <i class="fa-regular fa-file"></i>
                    {{ traducao.Roteiros }}
                </button>
                </div>
            </div>

            <div class="col-12 pb-3">
                <div v-if="currentRouteName=='Perfil'">
                <button 
                    type="button" 
                    class="me-2 bg-[#78c0d6] text-white pl-2 pr-2 rounded-lg w-36" 
                    @click=""
                >
                    <i class="fa-regular fa-user"></i>
                    {{ traducao.MeuPerfil }}
                </button>
                </div>
                <div v-else>
                <button 
                    type="button" 
                    class="me-2 text-black pl-2 pr-2 rounded-lg w-36" 
                    @click="goTo('perfil')"
                >
                    <i class="fa-regular fa-user"></i>
                    {{ traducao.MeuPerfil }}
                </button>
                </div>
            </div>
            <div class="col-12 pb-3">
                <div v-if="currentRouteName=='Lista'">
                    <button 
                    type="button" 
                    class= "me-2 bg-[#78c0d6] text-white pl-2 pr-2 rounded-lg w-36" 
                    @click=""
                    >
                    <i class="fa-solid fa-list"></i>
                    Histórico de Roteiros
                    </button>
                </div>
                <div v-else>
                    <button 
                    type="button" 
                    class="me-2 text-black pl-2 pr-2 rounded-lg w-36" 
                    @click="goTo('lista')"
                    >
                    <i class="fa-solid fa-list"></i>
                    Histórico de Roteiros
                    </button>
                </div>
            </div> 
            <!-- <div class="col-12 pb-3">
                <button 
                    type="button" 
                    class="me-2 text-black hover:text-white pl-2 pr-2 rounded-lg w-36" 
                    @click="openModal"
                >
                <i class="fas fa-wallet"></i>
                Comprar créditos
                </button>
            </div> -->

            <div class="col-12 pb-3">
                <button 
                type="button" 
                class="me-2 text-black hover:text-white pl-2 pr-2 rounded-lg w-36" 
                @click="openDialog('sair')"
                >
                <i class="fa-solid fa-door-open"></i>
                {{ traducao.Sair }}
                </button>
            </div>
            </div>
        </transition>
        <div 
        v-if="isSidebarOpen" 
        @click="isSidebarOpen = false" 
        class="fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
        </div>
        <div class="w-full bg-[#faf8fd]"> 
            <div style="height:5% !important;" class="bg-[#faf8fd]">
            <div class="d-flex justify-content-between align-items-center mt-4 pr-16">
                <!-- Left-aligned button -->
                <div class="d-flex">
                <button 
                    @click="isSidebarOpen = !isSidebarOpen" 
                    class="text-black px-4 py-2 rounded-lg md:hidden"
                >
                    <ion-icon name="reorder-three-outline" size="large"></ion-icon>
                </button>
                <div v-if="isAdmin" class="pr-2">
                    <input type="radio" value="dev" v-model="optDev" @change="saveisdevprod">
                    <span class="pr-3">DEV</span>
                    <input type="radio" value="prod" v-model="optDev" @change="saveisdevprod">
                    <span>PROD</span>
                </div>
                <div v-if="optDev=='dev'" class="d-flex">
                    <span>idAgent_start: </span>
                    <input type="number" v-model="idAgent_start" class="form-control" @change="saveIdAgent">
                    <span>idAgent_end: </span>
                    <input type="number" v-model="idAgent_end" class="form-control" @change="saveIdAgent">
                </div>

                </div>

                <!-- Right-aligned content -->
                <div class="d-flex align-items-center">
                    <span class="fw-bold pr-5">{{ traducao.Saldo }}: {{ saldo }} {{ traducao.Creditos }}</span>
                <div class="dropdown me-3">
                    <button class="dropdown-toggle fw-bold" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-globe"></i> {{ languageName }}
                    </button>
                    <div class="dropdown-menu dropdown-menu-custom" aria-labelledby="dropdownMenuButton">
                    <li v-for="(langName, langCode) in languages" :key="langCode">
                        <a class="dropdown-item" href="#" @click.prevent="Translate(langCode, langName)">
                        {{ langName }}
                        </a>
                    </li>
                    </div>
                </div>

                <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white me-2" :src="img" alt="" />
                <button class="fw-bold">{{ name }}</button>
                </div>
            </div>
            </div>
            <div class="h-[calc(100vh-50px)] bg-[#faf8fd]">
                <RouterView></RouterView>
            </div>
        </div>
       <!--  <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Selecionar Idioma</v-card-title>
        <v-card-text></v-card-text>
        <select class="form-control" v-model="language" @change="changeLanguage">
            <option value="" disabled>Selecione o Idioma</option>
            <option v-for="(langName, langCode) in languages" :key="langCode" :value="langCode">{{ langName }}</option>
        </select>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="[#78c0d6]" text @click="dialog=false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <v-dialog v-model="dialogSair" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ traducao.Atencao }}</v-card-title>
        <v-card-text>{{ traducao.DialogSair }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="[#78c0d6]" text @click="dialogSair=false">{{ traducao.Nao }}</v-btn>
          <v-btn color="[#78c0d6]" text @click="sairUser">{{ traducao.Sim }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
    <compraModal v-if="showModal" :closeModal="closeModal"></compraModal>
</template>

<script setup>
import { ref, onMounted,watchEffect, onUnmounted  } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import router from '../../routes';
import languages from '../../data/lang';
import "@google-pay/button-element";
import compraModal from '../compraModal.vue';
import ptLang from '../../data/ptlang';

const traducao = ref(localStorage.getItem('Traducao') ? JSON.parse(localStorage.getItem('Traducao')) : ptLang)
const user = JSON.parse(localStorage.getItem('user'));
const name = ref('')
const saldo = ref(null)
const route = useRoute();
const currentRouteName=ref(route.name)
const img = ref('')
const dialog=ref(false)
const dialogSair=ref(false)
const isSidebarOpen=ref(false)
const showModal=ref(false)
const isAdmin=ref(false)
const optDev=ref('prod')
const idAgent_start=ref(null)
const idAgent_end=ref(null)
const language = ref(localStorage.getItem('lang') || 'pt');
const languageName = ref(localStorage.getItem('langName') || 'Português');

function saveIdAgent(){
    localStorage.setItem('idAgent_start', idAgent_start.value);
    localStorage.setItem('idAgent_end', idAgent_end.value);
}

const savelang = (langCode, langName) => {
    console.log('read')
    localStorage.setItem('lang', langCode);
    localStorage.setItem('langName', langName);
    languageName.value=langName
    console.log(languageName.value)
}

const openModal = () =>{
    showModal.value=true
}
const closeModal=()=>{
    showModal.value=false
}
const changeLanguage = (langCode, langName) => {
    document.cookie = `googtrans=; path=/; domain=${location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    console.log('Langcode',langCode, 'langname', langName)
    document.cookie = `googtrans=/pt/${langCode}; path=/; domain=${location.hostname}`;
    savelang(langCode, langName);
    window.location.reload(true); 
};
onMounted(() => {
    name.value=user.Nome
    img.value=user.photo
    saldo.value=convertNumberFormat(user.saldouser)
    console.log(route.name);
    if(user.email.includes('cezarsantos') || user.Email.includes('cezarsantos') || user.email.includes('luisalbergoni717')){
        isAdmin.value=true
    }
    const intervalId = setInterval(checkUserSaldo, 1000);
    onUnmounted(() => {
    clearInterval(intervalId);
    });
})
const checkUserSaldo = () => {
    if ( user.saldouser !== saldo.value) {
        saldo.value = convertNumberFormat(storedUser.saldouser)
        console.log("User saldo updated:", saldo.value);
    }
};
watchEffect(() => {
    currentRouteName.value = route.name;
    console.log('Current route name:', currentRouteName.value);
});
const goTo=(id)=>{
    router.push('/mytrip/'+id);
}
const openDialog = (id) =>{
    if(id=='lang'){
        dialog.value = true;
    }
    if(id=='sair'){
        dialogSair.value=true;
    }
}
const sairUser = () =>{
    dialogSair.value=false
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    window.location.href= 'https://mytripntour.com/'
}
function convertNumberFormat(value) {
/*     if (value.includes(",")) {
        return value.replace(",", ".");
    }
    else if (value.includes(".")) {
        return value.replace(".", ",");
    } */
    console.log('val', value)
    return value;
}
function saveisdevprod(){
    localStorage.setItem('isDev', optDev.value)
}
const Translate = async (lang, langName) => {
    localStorage.setItem('lang', lang);
    localStorage.setItem('langName', langName);
    languageName.value=langName
    let objUser = {
            email: user.email ? user.email : user.Email,
            name: user.name,
            birthday: user.birthday,
            gender: user.gender,
            sigla_idioma:lang.toUpperCase(),
            pagina:'Roteiros',
            ip_origem:user.ip_origem,
        };
        const responseUser = await axios.post('https://newlogin-lm7edjmduq-uc.a.run.app', objUser)
    localStorage.setItem('Traducao', responseUser.data.traducao);
    location.reload()
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');

* {
    font-family: 'Sora', sans-serif;
}

    .img-Logo{
    width: 10rem;
    height: 10rem;
    }

    .dropdown-menu-custom {
        max-height: 200px; /* Adjust this value as needed */
        overflow-y: auto;
        width: 200px; /* Adjust this value as needed */
    }
    .slide-enter-active, .slide-leave-active {
    transition: transform 0.3s ease;
    }
    .slide-enter {
    transform: translateX(-100%);
    }
    .slide-leave-to {
    transform: translateX(-100%);
    }
    .slide-enter-active, .slide-leave-active {
    transition: transform 0.3s ease;
    }

    .slide-enter {
    transform: translateX(-100%);
    }

    .slide-leave-to {
    transform: translateX(-100%);
    }
</style>