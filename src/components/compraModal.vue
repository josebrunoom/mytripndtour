<template>
        <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[9999] overflow-y-auto">
        <div class="bg-white rounded-lg shadow-lg p-8 w-2/3 max-w-lg relative">
            <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold">{{ props.traducao.AddCred }}</h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
                <i class="fa fa-times"></i>
            </button>
            </div>
            <div class="space-y-4">
                <p class="text-lg">{{props.traducao.Escolha}}:</p>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                    v-for="(credit, index) in creditOptions"
                    :key="index"
                    @click="selectCredit(credit)"
                    :class="{
                    'border-2 border-blue-500': selectedCredit === credit,
                    'border border-gray-300': selectedCredit !== credit
                    }"
                    class="p-4 rounded-lg hover:bg-gray-100 text-center"
                >
                    {{ credit }} {{ props.traducao.Cred }}
                </button>
                <!-- <input type="number" class="form-control"> -->
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <span>{{props.traducao.DigCred}}: </span>
                    <input type="number" class="form-control" v-model="selectedCredit" @input="validateCredit">
                </div> 
                <div class="grid grid-cols-2 gap-4">
                    <span>{{ props.traducao.Mpreferida }}: </span>
                    <v-select
                        label=""
                        :items="['BRL', 'USD', 'EUR']"
                        :menuProps="{ zIndex: 10000 }"
                        v-model="currency"
                    ></v-select>
                </div> 
                <div class="" v-if="selectedCredit && currency">
                    <span>{{ props.traducao.ValEm }} {{ currency }}: {{signal}}{{ valueToPay }}</span>
                </div> 
            </div>
            <div class="mt-6 flex justify-end" :disabled="selectedCredit === null">
<!--                 <button
                    v-if="buttonSwitch == true"
                    @click="generatePixQRCode"
                    class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-300 pr-2"
                >
                    Pagar com Pix
                </button> -->
                <div v-show="buttonSwitch==true" id="paypal-button-container" ref="paypalButtonContainer"></div>
                <button
                v-if="buttonSwitch==false"
                @click="changeButton"
                :disabled="selectedCredit === null"
                class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
                >
                {{props.traducao.Confirm}}
                </button>
                
            </div>
        </div>
        <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title class="headline">{{ traducao.Atencao }}</v-card-title>
            <v-card-text>Para fazer a compra de creditos, você deve fornecer mais informações</v-card-text>
            <v-card-actions>
                <div  class=" flex justify-center items-center">
                    <button  @click="login()" class="google-btn input-box w-full py-2 px-4 bg-white text-gray-600 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 ">
                    <img src="../assets/google-logo.webp" alt="Facebook" class="img-Google mr-1" />
                    Entrar Com Google
                    </button>
                </div>
            <v-spacer></v-spacer>
            <v-btn color="[#78c0d6]" text @click="dialog=false, props.closeModal()">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, computed, watch } from 'vue';
import router from '../routes';

const user = JSON.parse(localStorage.getItem('user'));
const props = defineProps({
    closeModal: {
        type: Function,
        required: true,
    },
    traducao:{
        type:Object,
        required:true
    }
});
const creditOptions = [5, 10, 20];
const selectedCredit = ref(null);
const buttonSwitch=ref(false)
const valueToPay=ref("1.00")
const clientId = 'ARNU2Ov9mHwNG-gX6tLKUNkGJlzuZ-VG09TmHyouxlYQ5xzL9GDvPrDDEIbV0_vQ-FksPcxR1-5NT0mi';
const paypalButtonContainer = ref(null);
const currency = ref(null)
const conversionRate = ref(1)
const signal = ref('')
const dialog = ref(false)

watch([selectedCredit, conversionRate], ([newCredit, newRate]) => {
    valueToPay.value = (newCredit ? newCredit * newRate : 0).toFixed(2);
    console.log((newCredit ? newCredit * newRate : 0).toFixed(2))
});

const location = JSON.parse(localStorage.getItem('location'))

onMounted(async () => {
    await loadCurrency()
    console.log(props.traducao)
    if(user.name.incudes(".com")||user.Flg_Auth=='E'){
        dialog.value=true
    }
});
watch(currency, (newCurrency, oldCurrency) => {
    console.log('Currency changed from', oldCurrency, 'to', newCurrency);
    updateCurrency()
});
const validateCredit = () => {
    if (selectedCredit.value < 0) {
        selectedCredit.value = 0;
    }
};
const updateSaldo = async () => {
    let userObj = {
        tpacao:'S',
        iduser:user.iduser,
    }
    try {
        const response = await axios.post('https://mtt-accounting-667280034337.us-central1.run.app',userObj)
        console.log(response.data)
        const LocalStorageUser = {
                    Email: user.Email,
                    name: user.name,
                    photo: user.photo,
                    MetodoAutenticacao: user.MetodoAutenticacao,
                    birthday: user.birthday,
                    gender: user.gender,
                    ip_origem: user.ip_origem,
                    email: user.email,
                    saldouser: response.data.saldouser,
                    vlrpdf: user.vlrpdf,
                    vlrpesquisa: user.vlrpesquisa,
                    iduser: user.iduser,
                    currency_data:user.currency_data
                };
        localStorage.setItem('user', JSON.stringify(LocalStorageUser));
    } catch (error) {
        console.log(error)
    }
}
const loadCurrency = async () => {
    const padrao = user.currency_data.find(obj => obj.padrao === 1);
    const country = padrao.pais
    currency.value = country == 'BR' ? 'BRL' : country == 'US' ? 'USD' : 'EUR'
    conversionRate.value = country == 'BR' ? user.currency_data.find(obj => obj.pais === 'BR')?.txconversao : country == 'US' ? user.currency_data.find(obj => obj.pais === 'US')?.txconversao : user.currency_data.find(obj => obj.pais === 'EU')?.txconversao
    
}
const updateCurrency = () => {
    conversionRate.value = currency.value == 'BRL' ? user.currency_data.find(obj => obj.pais === 'BR')?.txconversao : currency.value == 'USD' ? user.currency_data.find(obj => obj.pais === 'US')?.txconversao : user.currency_data.find(obj => obj.pais === 'EU')?.txconversao
    valueToPay.value=selectedCredit.value ? selectedCredit.value * conversionRate.value : null;
    signal.value = currency.value == 'BRL' ? user.currency_data.find(obj => obj.pais === 'BR')?.simbolo : currency.value == 'USD' ? user.currency_data.find(obj => obj.pais === 'US')?.simbolo : currency.value == 'EUR' ? user.currency_data.find(obj => obj.pais === 'EU')?.simbolo : null
    console.log(valueToPay.value)
}
const loadPaypalScript = (clientId) => {

    return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency.value}`;
    script.onload = resolve;
    document.head.appendChild(script);
    });
};
const selectCredit = (credit) => {
    selectedCredit.value = credit;
};
const confirmPurchase = () => {
    if (selectedCredit.value !== null) {
    console.log('Compra confirmada para', selectedCredit.value, 'créditos');
    props.closeModal(); 
    }
};
const onLoadPaymentData=(event) => {
    console.log("load payment data", event.detail);
    props.closeModal(); 
}
const onError=(event) => {
    console.log("onError", event.detail);
}
const changeButton= async () =>{
    if(!currency.value){
        alert(props.traducao.ChangeButton)
    }else{
        await loadPaypalScript(clientId);
        await loadPaypalButton()
        buttonSwitch.value=true
        console.log(valueToPay.value)
    }
}
const loadPaypalButton = async () => {
    if (paypalButtonContainer.value) {
        window.paypal.Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
            purchase_units: [{
                amount: {
                value: valueToPay.value 
                },
                custom_id: user.Email ? user.Email : user.email
            }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
            alert(props.traducao.ObrigCompra)
            props.closeModal(); 
            console.log(details)
            updateSaldo()
            });
        },
        onError: function (err) {
            console.error('Error occurred during PayPal transaction', err);
            alert(props.traducao.ErrCompra)
            props.closeModal(); 
        }
        }).render(paypalButtonContainer.value);  
    } else {
        console.error('PayPal button container not found!');
    }
}
const generatePixQRCode = () => {
    const pixLink = `https://example-pix-api.com/generate?amount=${selectedCredit.value}`;
    pixQRCode.value = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(pixLink)}&size=150x150`;
};
const login = () =>{
    router.push('/')
}
</script>

<style scoped>
#paypal-button-container {
    width: 100%;
}
</style>