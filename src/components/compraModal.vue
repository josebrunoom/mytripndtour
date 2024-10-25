<template>
        <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[9999] overflow-y-auto">
        <div class="bg-white rounded-lg shadow-lg p-8 w-2/3 max-w-lg relative">
            <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold">Adicionar Créditos</h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
                <i class="fa fa-times"></i>
            </button>
            </div>
            <div class="space-y-4">
                <p class="text-lg">{{props.traducao.Escolha}}:</p>
                <div class="grid grid-cols-3 gap-4">
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
                    <input type="number" class="form-control" v-model="selectedCredit" >
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
        
        </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

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
//const valueToPay=ref("1.00")
const clientId = 'AZ26vpUzl4-BlJkNfH1maGfL7uGrHBDhi4HSCa5STbECJKneWPphBGxqmVdhZNzrM9ClD3mO8MX1Ybma';
const paypalButtonContainer = ref(null);

const valueToPay = computed(() => {
    return selectedCredit.value ? selectedCredit.value * 0.5 : null;
});

onMounted(async () => {
    console.log(props.traducao)
    await loadPaypalScript(clientId);
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
            alert('Obrigado pela sua compra!')
            props.closeModal(); 
            console.log(details)
            });
        },
        onError: function (err) {
            console.error('Error occurred during PayPal transaction', err);
            alert('Erro ao concluir compra')
            props.closeModal(); 
        }
        }).render(paypalButtonContainer.value);  
    } else {
        console.error('PayPal button container not found!');
    }
});
const loadPaypalScript = (clientId) => {
    return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=BRL`;
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
const changeButton=()=>{
    buttonSwitch.value=true
    console.log(valueToPay.value)
}
const generatePixQRCode = () => {
    const pixLink = `https://example-pix-api.com/generate?amount=${selectedCredit.value}`;
    pixQRCode.value = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(pixLink)}&size=150x150`;
};
</script>

<style scoped>
#paypal-button-container {
    width: 100%;
}
</style>