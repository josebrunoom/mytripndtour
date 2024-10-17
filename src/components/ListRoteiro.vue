<template>
    <div class="w-full">
        <div v-for="(Roteiros, index) in Roteiros" :key="index" class="p-4 border-b scrollable-container">
            <div class="flex items-center">
            <!-- Arrow icon to toggle visibility, aligned to the left -->
            <button @click="toggleDetails(index)" class="mr-2">
                <span :class="openIndex === index ? 'rotate-180' : 'rotate-0'">
                &#x25BC;
                </span>
            </button>
            <span class="text-lg font-bold">{{ Roteiros.nome_roteiro }}</span>
            </div>
            <!-- Conditionally display additional properties -->
            <div v-if="openIndex === index" class="mt-2 text-gray-600 text-left">
            <p><strong>Origem:</strong> {{ Roteiros.origem }}</p>
            <p><strong>Destino:</strong> {{ Roteiros.destino }}</p>
            </div>
        </div>
        <Loading :loading="isLoading" ></Loading>
    </div>
</template>

<script setup>
import Loading from './Loading.vue';
import { onMounted, ref } from 'vue';

const Roteiros = ref(null)
const isLoading = ref(false)

onMounted(()=>{
    isLoading.value=true
    getRoteiros()
})

const getRoteiros= async ()=>{
    let obj ={
    email: "luisalbergoni717@gmail.com",
    origem: "Reading, Reino Unido",
    destino: "'Redding, CA, EUA'",
    dias: 5,
    data_inicio: "2024-10-17",
    data_fim: "2024-10-22",
    qtd_adultos: 3,
    qtd_menores: 0,
    idade_menores: [],
    interesses: "",
    quero_conhecer: "",
    nao_incluir: [],
    idioma: "PT-BR",
    ip_origem: "186.193.138.75",
    txt_Roteir: "1",
    nome_roteiro: "dsasdad",
    tpacao: "S",
    iduser: 7
    }
try {
    let objRoteiro1={
        tpacao: 'S',
    }
    const response = await axios.post('https://mtt-savetrip-667280034337.us-central1.run.app', obj)
    Roteiros.value=response.data.result
    console.log('rada',Roteiros.value)
    isLoading.value=false
} catch (error) {
    console.log(error)
    isLoading.value=false
}
}

const objects = ref([
  { name: "Object 1", description: "Description 1", details: "More details about Object 1" },
  { name: "Object 2", description: "Description 2", details: "More details about Object 2" },
  { name: "Object 3", description: "Description 3", details: "More details about Object 3" },
]);

// Track which object is currently expanded
const openIndex = ref(null);

// Toggle function to open/close the details
const toggleDetails = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};
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
