<template>
    <div v-if="loading">
    <div class="loading-screen">
      <div class="flex flex-col justify-center items-center h-screen d-flex">
        <ProgressSpinner />
        <span v-if="isRoteiro==true" class="mt-4 text-white">Aguarde que estamos gerando o roteiro perfeito pra você! Deve demorar 1 minuto!</span>
      </div>
    </div>
</div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
    import ProgressSpinner from 'primevue/progressspinner';

  
  export default {
    components: {
      ProgressSpinner,
    },
    props: {
    loading: {
      type: Boolean,
      default: false,
    },
    isRoteiro:{
      type: Boolean,
      default: false,
    }
    },
  };
  </script>
  
  <style>
  
  .loading-screen {
    width: 100%;
    height: 100%;
    position: fixed; 
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5); 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; 
  }
  
  .p-progress-spinner {
    width: 50px;
    height: 50px;
  }
  </style>
  
  