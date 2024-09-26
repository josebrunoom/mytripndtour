<template>
        <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-9999">
        <div class="bg-white rounded-lg shadow-lg p-8 w-2/3 max-w-lg relative">
            <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold">Adicionar Créditos</h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
                <i class="fa fa-times"></i>
            </button>
            </div>
            <div class="space-y-4">
                <p class="text-lg">Escolha a quantidade de créditos que deseja comprar:</p>
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
                    {{ credit }} créditos
                </button>
                <!-- <input type="number" class="form-control"> -->
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <span>Ou digite a quantidade de Créditos: </span>
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
                <google-pay-button
                v-if="buttonSwitch==true"
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
                    totalPrice: valueToPay,
                    currencyCode: 'BRL',
                    countryCode: 'BR'
                    }
                }"
                v-on:loadpaymentdata="onLoadPaymentData"
                v-on:error="onError"
                ></google-pay-button>
                <button
                v-if="buttonSwitch==false"
                @click="changeButton"
                :disabled="selectedCredit === null"
                class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
                >
                Confirmar Compra
                </button>
            </div>
        </div>
        </div>
</template>
  
<script setup>
import { ref } from 'vue';
import "@google-pay/button-element";

const props = defineProps({
    closeModal: {
        type: Function,
        required: true,
    },
});
const creditOptions = [5, 10, 20];
const selectedCredit = ref(null);
const buttonSwitch=ref(false)
const valueToPay=ref("1.00")

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
    switch(selectedCredit.value){
        case 5:
        valueToPay.value="5.00"
        break
        case 10:
        valueToPay.value="10.00"
        break
        case 20:
        valueToPay.value="20.00"
        break
        default: valueToPay.value=toString(selectedCredit.value)
    }
}
const generatePixQRCode = () => {
    const pixLink = `https://example-pix-api.com/generate?amount=${selectedCredit.value}`;
    pixQRCode.value = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(pixLink)}&size=150x150`;
};
</script>

<style scoped>
</style>