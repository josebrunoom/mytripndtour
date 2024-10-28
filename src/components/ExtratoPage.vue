<template>
    <div class="scrollable-container">
        <div v-if="!Extratos">
            <span class="">Não existem Extrato</span>
        </div>
        <div v-for="(extrato, index) in Extratos" :key="index" class="p-4 border-b ">
            <div class="flex items-center">
            <!-- Arrow icon to toggle visibility, aligned to the left -->
            <button @click="toggleDetails(index)" class="mr-2">
                <span :class="openIndex === index ? 'rotate-180' : 'rotate-0'">
                &#x25BC;
                </span>
            </button>
            <span class="text-lg font-bold">Transação {{ index + 1 }}</span>
            </div>
            <div v-if="openIndex === index" class="mt-2 text-gray-600 text-left">
            <p><strong>Descricao:</strong> {{ extrato.descricao }}</p>
            <p><strong>Credito da Operação:</strong> {{ extrato.crdoperacao }}</p>
            <div >
                <p><strong>Tipo de Operação:</strong> {{ extrato.tipo_operacao }}</p>
            </div>
    
<!--             <button @click="saveRoteiro(index)" class="mt-4 px-4 py-2 bg-[#27b3cc] text-white rounded mr-2">
                <i class="fa-solid fa-floppy-disk"></i> {{ traducao.Salvar }}
            </button>
            <button @click="sendData(roteiro)" class="mt-4 px-4 py-2 bg-[#27b3cc] text-white rounded">
                <i class="fa-solid fa-eye"></i> {{ traducao.Visualizar }}
            </button> -->
            </div>
            
        </div>
        <v-dialog v-model="dialogNameChange" max-width="500px">
            <v-card>
                <v-card-title class="headline"></v-card-title>
                <v-card-text>{{ traducao.Edit }}</v-card-text>
                <div class="flex justify-center">
                </div>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="[#78c0d6]" text @click="dialogNameChange">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <Loading :loading="isLoading"></Loading>
        <HomeScreenSeeOnly v-if="ModalVisible " :isVisible="ModalVisible" :Roteiros="selectedRoteiro"></HomeScreenSeeOnly>
    </div>
</template>
<!-- {
    "extrato": [
        {
            "descricao": "Pesquisa",
            "dthpagamento": null,
            "iduser": 7,
            "referencia": null,
            "tipo_operacao": "D",
            "tppagamento": null,
            "vlroperacao": null
        },
} -->
<script setup>
    import moment from 'moment';
    import Loading from './Loading.vue';
    import HomeScreenSeeOnly from './HomeScreen-See-Only.vue';
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import newlang from '../data/newlang';

    const user = ref(JSON.parse(localStorage.getItem('user')))
    
    const Extratos = ref([]);
    const isLoading = ref(false);
    const ModalVisible=ref(false)
    const selectedRoteiro = ref(null);
    const dialogNameChange = ref(false)
    const dataToSend = ref(null)
    const traducao = ref(newlang)
    
    onMounted(() => {
        isLoading.value = true;
        getExtrato();
        getTraducao()
    });

    const getTraducao = async () => {
        isLoading.value=true
        const userLocale = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'pt-br'
        try {
        let objUser = {
                email: user.value.email ? user.value.email : user.value.Email,
                name: user.value.name,
                birthday: user.value.birthday,
                gender: user.value.gender,
                sigla_idioma:userLocale.toUpperCase(),
                ip_origem:user.value.ip_origem,
                pagina:'Roteiros',
            };
        const response = await axios.post('https://newlogin-lm7edjmduq-uc.a.run.app', objUser)
        let TRoteiro=JSON.parse(response.data.traducao)
        traducao.value=TRoteiro.ListRotero
        isLoading.value=false
        } catch (error) {
            console.log('getTraducao',error)
            isLoading.value=false
        }
    }
    
    const getExtrato = async () => {
        let obj = {
        tpacao: "E",
        iduser: user.value.iduser
        };
        try {
        const response = await axios.post('https://mtt-accounting-667280034337.us-central1.run.app', obj);
        Extratos.value = response.data.extrato;
        isLoading.value = false;
        console.log('extratos', response.data)
        } catch (error) {
        console.log(error);
        isLoading.value = false;
        }
    };
    
    const openIndex = ref(null);
    
    const toggleDetails = (index) => {
        openIndex.value = openIndex.value === index ? null : index;
    };

    const saveRoteiro = async (index) => {
        isLoading.value = true;
    
        try {
        const roteiro = Roteiros.value[index];
        console.log(roteiro)
        let objRoteiro={
            data_inicio: roteiro.data_inicio,
            destino: roteiro.destino,
            dias: roteiro.dias,
            dth_insert: roteiro.dth_insert,
            idade_menores: roteiro.idade_menores,
            idioma: roteiro.idioma,
            idrotsalvo: roteiro.idrotsalvo,
            iduser: roteiro.iduser,
            interesses: roteiro.interesses,
            ip_origem: roteiro.ip_origem,
            nao_incluir: roteiro.nao_incluir,
            nome_roteiro: roteiro.nome_roteiro,
            origem: roteiro.origem,
            qtd_adultos: roteiro.qtd_adultos,
            qtd_menores: roteiro.qtd_menores,
            quero_conhecer: roteiro.quero_conhecer,
            tipo_hospedage: roteiro.tipo_hospedage,
            txt_roteiro: roteiro.txt_roteiro,
            tpacao: 'U',
        }
        const response = await axios.post('https://mtt-savetrip-667280034337.us-central1.run.app', objRoteiro);
        console.log('Updated roteiro:', response.data.result);
        isLoading.value = false;
        dialogNameChange.value=true
        alert(traducao.Salvo)
        } catch (error) {
        console.log('Error saving roteiro:', error);
        isLoading.value = false;
        alert(traducao.ErrSalvar)
        }
    };
    const sendData = (roteiro) => {
    console.log(roteiro)
    let objRoteiro={
            data_inicio: roteiro.data_inicio,
            destino: roteiro.destino,
            dias: roteiro.dias,
            idade_menores: roteiro.idade_menores,
            interesses: roteiro.interesses,
            nao_incluir: roteiro.nao_incluir,
            origem: roteiro.origem,
            qtd_adultos: roteiro.qtd_adultos,
            qtd_menores: roteiro.qtd_menores,
            quero_conhecer: roteiro.quero_conhecer,
            tipo_hospedage: roteiro.tipo_hospedage,
            txt_roteiro: roteiro.txt_roteiro,
        }
        
    dataToSend.value = JSON.stringify(objRoteiro)
    localStorage.setItem('roteiroSee',dataToSend.value)
    //const encodedData = encodeURIComponent(dataToSend.value);
    //console.log(encodedData)
    window.location.href = `https://roteiro.mytripntour.com/mytrip/visualizacao`;
    }
</script>


<style>
.scrollable-container {
    max-height: 90vh; 
    overflow-y: auto;
    margin: 0 auto;
    padding: 1rem; 
}

.button-container {
    display: flex;
    gap: 0.5rem; /* Space between buttons */
}
</style>
