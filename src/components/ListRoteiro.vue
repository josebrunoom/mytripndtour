<template>
    <div class="scrollable-container">
        <div v-if="Roteiros.length<1">
            <span class="">Não existem roteiros salvos</span>
        </div>
        <div v-for="(roteiro, index) in Roteiros" :key="index" class="p-4 border-b ">
            <div class="flex items-center">
            <!-- Arrow icon to toggle visibility, aligned to the left -->
            <button @click="toggleDetails(index)" class="mr-2">
                <span :class="openIndex === index ? 'rotate-180' : 'rotate-0'">
                &#x25BC;
                </span>
            </button>
            <!-- Editable route name -->
            <input
                v-if="openIndex === index"
                v-model="roteiro.nome_roteiro"
                class="text-lg font-bold border border-gray-300 px-2 py-1 rounded"
                type="text"
                placeholder="Edit Route Name"
            />
            <span v-else class="text-lg font-bold">{{ roteiro.nome_roteiro }}; {{ roteiro.origem }}; {{ removeApostrophes(roteiro.destino) }}.</span>
            </div>
            
            <!-- Conditionally display additional properties -->
            <div v-if="openIndex === index" class="mt-2 text-gray-600 text-left">
            <p><strong>{{ traducao.CidadeO }}:</strong> {{ roteiro.origem }}</p>
            <p><strong>{{ traducao.Destino }}:</strong> {{ removeApostrophes(roteiro.destino) }}</p>
            <p><strong>{{ traducao.PViagem }}:</strong> {{ roteiro.dias }} dias</p>
            <p><strong>{{ traducao.Dias }}:</strong> {{ moment(roteiro.data_inicio).format("DD/MM/YYYY") }}</p>
            <p><strong>{{ traducao.QAdult }}:</strong> {{ roteiro.qtd_adultos }}</p>
            <div >
                <p><strong>{{ traducao.QMenor }}:</strong> {{ roteiro.qtd_menores }}</p>
            </div>
            <div v-if="roteiro.interesses">
                <p><strong>{{ traducao.Interesses }}:</strong> {{ roteiro.interesses }}</p>
            </div>
            <div v-if="roteiro.quero_conhecer">
                <p><strong>{{ traducao.QConhecer }}:</strong> {{ roteiro.quero_conhecer }}</p>
            </div>
            <div v-if="roteiro.nao_incluir !== '{}'">
                <p><strong>{{ traducao.NaoPrecisa }}:</strong> {{ roteiro.nao_incluir }}</p>
            </div>
    
            <button @click="saveRoteiro(index)" class="mt-4 px-4 py-2 bg-[#27b3cc] text-white rounded mr-2">
                <i class="fa-solid fa-floppy-disk"></i> {{ traducao.Salvar }}
            </button>
            <button @click="sendData(roteiro)" class="mt-4 px-4 py-2 bg-[#27b3cc] text-white rounded">
                <i class="fa-solid fa-eye"></i> {{ traducao.Visualizar }}
            </button>
            <button @click="DeleteRoteiro(roteiro)" class="mt-4 ml-2 px-4 py-2 bg-[#e62c2c] text-white rounded">
                <i class="fa-solid fa-trash"></i> {{ traducao.Delete }}
            </button>
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
                <v-btn color="[#78c0d6]" text @click="dialogNameChange=false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <Loading :loading="isLoading"></Loading>
        <HomeScreenSeeOnly v-if="ModalVisible " :isVisible="ModalVisible" :Roteiros="selectedRoteiro"></HomeScreenSeeOnly>
    </div>
</template>


<script setup>
    import moment from 'moment';
    import Loading from './Loading.vue';
    import HomeScreenSeeOnly from './HomeScreen-See-Only.vue';
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import newlang from '../data/newlang';

    const user = ref(JSON.parse(localStorage.getItem('user')))
    
    const Roteiros = ref([]);
    const isLoading = ref(false);
    const ModalVisible=ref(false)
    const selectedRoteiro = ref(null);
    const dialogNameChange = ref(false)
    const dataToSend = ref(null)
    const traducao = ref(newlang)
    
    onMounted(() => {
        isLoading.value = true;
        getRoteiros();
        getTraducao()
    });

    const getTraducao = async () => {
        
        try {
        let TRoteiro=JSON.parse(localStorage.getItem('Traducao'))
        traducao.value=TRoteiro.ListRotero
        console.log(traducao.value.ErrSalvar)
        } catch (error) {
            console.log('getTraducao',error)
            
        }
    }
    
    const getRoteiros = async () => {
        let obj = {
        tpacao: "S",
        iduser: user.value.iduser
        };
        isLoading.value = true;
        try {
        const response = await axios.post('https://mtt-savetrip-667280034337.us-central1.run.app', obj);
        Roteiros.value = response.data.result;
        console.log(Roteiros.value)
        isLoading.value = false;
        } catch (error) {
        console.log(error);
        isLoading.value = false;
        }
    };
    
    const openIndex = ref(null);
    function removeApostrophes(locationsString) {
        return locationsString.replace(/'/g, '');
    }
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
        console.log('Updated roteiro:', response.data);
        isLoading.value = false;
        dialogNameChange.value=true
        alert(traducao.value.Salvo)
        } catch (error) {
        console.log('Error saving roteiro:', error);
        isLoading.value = false;
        alert('erro',traducao.value.ErrSalvar)
        }
    };

    const DeleteRoteiro = async (index) => {
        isLoading.value = true;
    
        try {
        const roteiro = Roteiros.value[index];
        console.log(roteiro)
        let objRoteiro={
            idrotsalvo: roteiro.idrotsalvo,
            iduser: roteiro.iduser,
            tpacao: 'D',
        }
        const response = await axios.post('https://mtt-savetrip-667280034337.us-central1.run.app', objRoteiro);
        console.log('Delete roteiro:', response.data);
        Roteiros.value.splice(index, 1)
        isLoading.value = false;
        dialogNameChange.value=true
        alert(traducao.value.DeletedRot)
        } catch (error) {
        console.log('Error saving roteiro:', error);
        isLoading.value = false;
        alert('erro',traducao.value.ErrSalvar)
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
