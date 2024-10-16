<template>
    <div class="scrollable-container container-fluid px-3 px-md-5">
        <DataTable :value="data" tableStyle="width: 100%">
            <Column field="NomeRoteiro" header="Nome do Roteiro"></Column>
            <Column field="Destino" header="Destino"></Column>
            <Column field="QtdAdultos" header="Quantidade de Adultos"></Column>
            <Column header="Ações">
                <template #body="{ data }">
                    <div class="button-container">
                        <button 
                            type="button" 
                            class="me-2 bg-[#78c0d6] text-white pl-2 pr-2 rounded-lg" 
                            @click="viewRoteiro(data)"
                        >Ver Roteiro</button>
                        <button 
                            type="button" 
                            class="me-2 bg-[#78c0d6] text-white pl-2 pr-2 rounded-lg" 
                            @click="useParametros(data)"
                        >Usar Parâmetros</button>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { ref } from 'vue';

const data = ref([
    {
        NomeRoteiro: 'Viagem1',
        Destino: 'Destino1',
        QtdAdultos: 5,
    },
    {
        NomeRoteiro: 'Viagem2',
        Destino: 'Destino2',
        QtdAdultos: 4,
    },
    {
        NomeRoteiro: 'Viagem3',
        Destino: 'Destino3',
        QtdAdultos: 3,
    },
]);

const viewRoteiro = (item) => {
    console.log('Ver Roteiro:', item);
};

const useParametros = (item) => {
    console.log('Usar Parâmetros:', item);
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
