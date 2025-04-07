<template>
    <div class="h-screen w-screen flex fixed left-0" >
        <div class="w-full hidden Slider md:w-[500px] lg:w-[300px] h-full mt-4 ml-4">
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
                <div v-if="currentRouteName=='Contato'">
                <button 
                    type="button" 
                    class="me-2 bg-[#78c0d6] text-white pl-2 pr-2 rounded-lg w-36" 
                    @click=""
                >
                    <i class="fa-regular fa-envelope"></i>
                    Contato
                </button>
                </div>
                <div v-else>
                <button 
                    type="button" 
                    class="me-2 text-black pl-2 pr-2 rounded-lg w-36" 
                    @click="goTo('contato')"
                >
                    <i class="fa-regular fa-envelope"></i>
                    Contato
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
                    {{ traducao.HRot }}
                    </button>
                </div>
                <div v-else>
                    <button 
                    type="button" 
                    class="me-2 text-black pl-2 pr-2 rounded-lg w-36" 
                    @click="goTo('lista')"
                    >
                    <i class="fa-solid fa-list"></i>
                    {{ traducao.HRot }}
                    </button>
                </div>
            </div>  
            <!-- <div class="col-12 pb-3">
                <div v-if="currentRouteName=='Extrato'">
                    <button 
                    type="button" 
                    class= "me-2 bg-[#78c0d6] text-white pl-2 pr-2 rounded-lg w-36" 
                    @click=""
                    >
                    <i class="fa-solid fa-list"></i>
                    {{traducao.Extrato}}
                    </button>
                </div>
                <div v-else>
                    <button 
                    type="button" 
                    class="me-2 text-black pl-2 pr-2 rounded-lg w-36" 
                    @click="goTo('extrato')"
                    >
                    <i class="fa-solid fa-list"></i>
                    {{traducao.Extrato}}
                    </button>
                </div>
            </div>   -->
            <!-- <div class="col-12 pb-3">
                <button 
                    type="button" 
                    class="me-2 text-black hover:text-white pl-2 pr-2 rounded-lg w-36" 
                    @click="openModal"
                >
                <i class="fas fa-wallet"></i>
                {{ traducao.AddCred }}
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
                <div v-if="currentRouteName=='Contato'">
                <button 
                    type="button" 
                    class="me-2 bg-[#78c0d6] text-white pl-2 pr-2 rounded-lg w-36" 
                    @click=""
                >
                <i class="fa-regular fa-envelope"></i>
                    Contato
                </button>
                </div>
                <div v-else>
                <button 
                    type="button" 
                    class="me-2 text-black pl-2 pr-2 rounded-lg w-36" 
                    @click="goTo('contato')"
                >
                <i class="fa-regular fa-envelope"></i>
                    Contato
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
                    {{ traducao.HRot }}
                    </button>
                </div>
                <div v-else>
                    <button 
                    type="button" 
                    class="me-2 text-black pl-2 pr-2 rounded-lg w-36" 
                    @click="goTo('lista')"
                    >
                    <i class="fa-solid fa-list"></i>
                    {{ traducao.HRot }}
                    </button>
                </div>
            </div> 
            <!-- <div class="col-12 pb-3">
                <div v-if="currentRouteName=='Extrato'">
                    <button 
                    type="button" 
                    class= "me-2 bg-[#78c0d6] text-white pl-2 pr-2 rounded-lg w-36" 
                    @click=""
                    >
                    <i class="fa-solid fa-list"></i>
                    {{traducao.Extrato}}
                    </button>
                </div>
                <div v-else>
                    <button 
                    type="button" 
                    class="me-2 text-black pl-2 pr-2 rounded-lg w-36" 
                    @click="goTo('extrato')"
                    >
                    <i class="fa-solid fa-list"></i>
                    {{traducao.Extrato}}
                    </button>
                </div>
            </div>  
            <div class="col-12 pb-3">
                <button 
                    type="button" 
                    class="me-2 text-black hover:text-white pl-2 pr-2 rounded-lg w-36" 
                    @click="openModal"
                >
                <i class="fas fa-wallet"></i>
                {{ traducao.AddCred }}
                </button>
            </div> -->
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
        <div class="w-full bg-[#faf8fd]" style="overflow: auto;"> 
            <div class="bg-[#faf8fd]">
                <div class="d-flex flex-wrap justify-content-between align-items-center lg:mt-4 lg:pr-16">
                    <!-- Left-aligned button -->
                    <div class="d-flex align-items-center">
                        <button 
                            @click="isSidebarOpen = !isSidebarOpen" 
                            class="text-black px-4 py-2 rounded-lg max-[1050px]:block hidden"
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
                        <div class="button-group align-items-center hidden sm:block"v-if="currentRouteName=='home'">
                        <button 
                        type="button" 
                        class="bg-[#78c0d6] text-white px-4 py-2 rounded-lg hover:bg-[#5ba8bd] focus:outline-none focus:ring-2 focus:ring-[#78c0d6] me-2" 
                        @click="triggerFunctionRoteiro"
                        >
                        {{traducao.Gerar}}
                        </button>
<!--                         <button 
                        type="button" 
                        class="bg-[#ffc109] text-white px-4 py-2 rounded-lg hover:bg-[#e0a607] focus:outline-none focus:ring-2 focus:ring-[#78c0d6] me-2" 
                        @click="triggerFunctionLimpar"
                        >
                        Limpar Tudo
                        </button> -->
                        <!-- <div v-show="showPdf==true"  class="items-start text-start" >
                            <button class="btn btn-danger" @click="triggerFunctionPDF">  {{ traducao.GerarPDF }}  <i>({{ user.vlrpdf }} {{ traducao.Creditos }})</i> </button>
                        </div> -->
                    </div>
                        <!-- <span class="fw-bold menu-saldo pr-5 max-[500px]:text-sm">
                            <button @click="reloadSaldo"><ion-icon name="refresh-outline"></ion-icon></button> 
                            {{ traducao.Saldo }}: {{ saldo }} {{ traducao.Creditos }}
                        </span> -->
                        <div class="dropdown me-3">
                            <button class="dropdown-toggle fw-bold" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-globe"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-custom" aria-labelledby="dropdownMenuButton">
                                <li v-for="lang in languages" :key="lang.sigla_idioma">
                                    <a v-if="!isMobile" class="dropdown-item" href="#" @click.prevent="Translate(lang.sigla_idioma, lang.nome_idioma)">
                                        {{ lang.nome_idioma }}
                                    </a>
                                    <a v-else class="dropdown-item text-center" href="#" @click.prevent="Translate(lang.sigla_idioma, lang.nome_idioma)">
                                        <img :src="getFlag(lang.sigla_idioma)" class="h-5 w-5 inline-block" alt="" />
                                    </a>
                                </li>
                            </div>
                        </div>
                        <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white me-2 d-none d-lg-inline" :src="img ? img : avatar" alt="" />
                        <button class="fw-bold d-none d-lg-inline">{{ name }}</button>
                    </div>
                </div>


                <div class="d-flex flex-column align-items-center mt-2 w-100 text-center d-lg-none">
                    <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white me-2" :src="img ? img : avatar" alt="" />
                    <button class="fw-bold w-100">{{ name }}</button>
                </div>
            </div>

            <div class="h-[calc(100vh-50px)] bg-[#faf8fd]">
                <div class="button-group align-items-center hidden max-[640px]:block mt-3 mb-2">
                    <button 
                        type="button" 
                        class="bg-[#78c0d6] text-white px-4 py-2 rounded-lg hover:bg-[#5ba8bd] focus:outline-none focus:ring-2 focus:ring-[#78c0d6] me-2" 
                        @click="postRoteiro"
                    >
                        Gerar Roteiro
                    </button>
                </div>
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
    <compraModal v-if="showModal" :closeModal="closeModal" :traducao="traducao"></compraModal>
    <Loading :loading="isLoading"/>
</template>

<script setup>
import { ref, onMounted,watchEffect, onUnmounted  } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import router from '../../routes';
//import languages from '../../data/lang';
import "@google-pay/button-element";
import compraModal from '../compraModal.vue';
import ptLang from '../../data/ptlang';
import Loading from '../Loading.vue';
import axios from 'axios';
import { eventBus } from '../../data/eventbus';
import avatar from '../../assets/defaultUser/defaultAvatar.jpg'

let TRoteiro 
const traducao = ref(ptLang)
const user = ref(JSON.parse(localStorage.getItem('user')))
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
const isLoading = ref(false)
const locationData = ref(null)
const languages = JSON.parse(localStorage.getItem('languages'))
const showPdf = ref(false)

const triggerFunctionRoteiro = () => {
    eventBus.emit('PostRoteiro');
};
const triggerFunctionLimpar = () => {
    eventBus.emit('LimparTudo');
};
const triggerFunctionPDF = () => {
    eventBus.emit('GeraPDF');
};
eventBus.on('RoteiroAppear', () => {
    console.log('roteiroappear',showPdf.value)
    showPdf.value=true
});
onMounted(async () => {
    name.value=user.value.name
    img.value=user.value.photo
    saldo.value=user.value.saldouser
    if(user.value.email.includes('cezarsantos') ){
        isAdmin.value=true
    }
    const intervalId = setInterval(checkUserSaldo, 1000);
    onUnmounted(() => {
    clearInterval(intervalId);
    });
    await getTraducao()
    if(localStorage.getItem('lang')==null){
        localStorage.setItem('lang', navigator.language)
    }
    if(languageName.value.includes(localStorage.getItem('lang'))){
        const find = languages.find(obj => obj.sigla_idioma === languageName.value)
        languageName.value=find.nome_idioma
    }
})

const reloadSaldo= async () =>{
    try {
        const userLocale = navigator.language
    let objUser = {
            email: user.value.email ? user.value.email : user.value.Email,
            name: user.value.name,
            birthday: user.value.birthday,
            gender: user.value.gender,
            sigla_idioma:userLocale.toUpperCase(),
            ip_origem:user.value.ip_origem,
            pagina:'Roteiros',
        };
        const responseUser = await axios.post('https://newlogin-lm7edjmduq-uc.a.run.app', objUser)
        const LocalStorageUser = {
                Email: user.value.Email,
                name: user.value.name,
                photo: user.value.photo,
                MetodoAutenticacao: user.value.MetodoAutenticacao,
                birthday: user.value.birthday,
                gender: user.value.gender,
                ip_origem: user.value.ip_origem,
                email: user.value.email,
                currency_data:responseUser.data.currency_data,
                saldouser: responseUser.data.saldouser,
                vlrpdf: user.value.vlrpdf,
                vlrpesquisa: user.value.vlrpesquisa,
                iduser: user.value.iduser,
            };
    console.log(LocalStorageUser)
    localStorage.setItem('user', JSON.stringify(LocalStorageUser));
    alert('Saldo atualizado')
    } catch (error) {
        console.log(error)
        alert('Erro ao atualizar Saldo')
    }
}

function saveIdAgent(){
    localStorage.setItem('idAgent_start', idAgent_start.value);
    localStorage.setItem('idAgent_end', idAgent_end.value);
}

const savelang = (langCode, langName) => {
    localStorage.setItem('lang', langCode);
    localStorage.setItem('langName', langName);
    languageName.value=langName
}

const openModal = () =>{
    showModal.value=true
}
const closeModal=()=>{
    showModal.value=false
}

const saveLocation = async () => {
    try {
        const response = await axios.get(`https://ipinfo.io/json?token=5bad712b786115`)
        console.log('Location response',response)
        locationData.value=response.data
        localStorage.setItem('location',JSON.stringify(response.data))
    } catch (error) {
        console.log('saveLocation ERROR',error)
    }
}
const getTraducao = async () => {
    if(localStorage.getItem('Traducao')==null){
        isLoading.value=true
        const userLocale = navigator.language
        await saveLocation()
    try {
        let objUser = {
                email: user.value.email ? user.value.email : user.value.Email,
                name: user.value.name,
                birthday: user.value.birthday,
                gender: user.value.gender,
                sigla_idioma:userLocale.toUpperCase(),
                ip_origem:user.value.ip_origem,
                pagina:'Roteiros',
                city: locationData.value.city ? locationData.value.city : '',
                region: locationData.value.region ? locationData.value.region : '',
                country: locationData.value.country ? locationData.value.country : '',
                loc: locationData.value.loc ? locationData.value.loc : '',
                postal: locationData.value.postal ? locationData.value.postal : '',
                timezone: locationData.value.timezone ? locationData.value.timezone : '',
            };
        const response = await axios.post('https://newlogin-lm7edjmduq-uc.a.run.app', objUser)
        console.log('objtura', objUser)
        localStorage.setItem('Traducao', response.data.traducao)
        TRoteiro=JSON.parse(localStorage.getItem('Traducao'))
        traducao.value=TRoteiro.Sidebar
        isLoading.value=false
    } catch (error) {
        console.log(error)
        isLoading.value=false
    }
    }else{
        TRoteiro=JSON.parse(localStorage.getItem('Traducao'))
        traducao.value=TRoteiro.Sidebar
    }
}
const checkUserSaldo = () => {
    const Nuser = JSON.parse(localStorage.getItem('user'))
    if ( Nuser.saldouser !== saldo.value) {
        saldo.value = convertNumberFormat(Nuser.saldouser)
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
    localStorage.clear();
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
    const userinfo = JSON.parse(localStorage.getItem('user'))
    try {
        localStorage.setItem('lang', lang);
        localStorage.setItem('langName', langName);
        languageName.value=langName
        let objUser = {
            email: userinfo.email,
            name: userinfo.name,
            birthday: userinfo.birthday,
            gender: userinfo.gender,
            sigla_idioma:lang,
            ip_origem:userinfo.ip_origem,
            pagina:'Roteiros',
            city: userinfo.city,
            region: userinfo.region,
            country: userinfo.country,
            loc: userinfo.loc,
            postal: userinfo.postal,
            timezone: userinfo.timezone,
        };
            const responseUser = await axios.post('https://newlogin-lm7edjmduq-uc.a.run.app', objUser)
        localStorage.setItem('Traducao', responseUser.data.traducao);
        localStorage.setItem('languages', JSON.stringify(responseUser.data.languages));
        window.location.href = window.location.href;
    } catch (error) {
        console.log(error)
    }

}
</script>

<script>
import BRFlag from '../../assets/flags/PT-BR.svg';
import ARFlag from '../../assets/flags/AR.svg';
import JAFlag from '../../assets/flags/JA.svg';
import ZHFlag from '../../assets/flags/ZH.svg';
import ENFlag from '../../assets/flags/EN.svg';
import ESFlag from '../../assets/flags/ES.svg';
import FRFlag from '../../assets/flags/FR.svg';
import ITFlag from '../../assets/flags/IT.svg';


export default {
    data() {
        return {
            isMobile: window.innerWidth <= 640,
            flagMap: {
                'PT-BR': BRFlag,
                'AR': ARFlag,
                'JA': JAFlag,
                'ZH': ZHFlag,
                'EN': ENFlag,
                'ES': ESFlag,
                'FR': FRFlag,                
                'IT': ITFlag,                
            }
        };
    },
    methods: {
        getFlag(sigla) {
            console.log(sigla);
            return this.flagMap[sigla] || ''; 
        },
        updateIsMobile() {
            this.isMobile = window.innerWidth <= 640;
        }
    },
    mounted() {
        window.addEventListener("resize", this.updateIsMobile);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.updateIsMobile);
    }
};
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
        width: 100px; /* Adjust this value as needed */
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
    @media (max-width: 640px) {
    .button-line {
        display: none;
    }
    }
    @media (min-width: 1050px) {
        .Slider {
            display: block;
        }
    }


    .dropdown-menu .dropdown-item.text-center {
        width: 45px;
        text-align: center;
        padding: 5px;
    }

    .dropdown-menu-custom .dropdown-item img {
        width: 100%; 
        height: auto;
    }

    @media (max-width: 768px) { /* Aplica apenas no mobile */
    .menu-saldo {
        margin:10px;
    }
    
    @media (max-width: 768px) {
        .dropdown-menu-custom {
            width: auto;
            min-width: 50px; 
            max-width: 50px;
            padding: 0; 
            text-align: center; 
        }

        .dropdown-menu-custom .dropdown-item {
            padding: 0; 
        }

        .dropdown-menu-custom .dropdown-item img {
            width: 100%;
            height: auto; 
        }
    }

}

</style>