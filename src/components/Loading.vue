<template>
    <div v-if="loading">
      <div class="loading-screen">
        <div class="flex flex-col justify-center items-center h-screen d-flex">
          <div class="loader"></div>
          <span v-if="isRoteiro==true" class="mt-4 text-white">{{ traducao.Loading1 }}</span>
          <span v-if="isRoteiro==true" class="mt-4 text-white">{{ traducao.Loading2 }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import ProgressSpinner from 'primevue/progressspinner';
  import ptLang from '../data/ptlang';

  const traducao = ref(localStorage.getItem('Traducao') ? JSON.parse(localStorage.getItem('Traducao')) : ptLang)

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
    setup() {
      const traducao = ref(localStorage.getItem('Traducao') 
        ? JSON.parse(localStorage.getItem('Traducao')) 
        : ptLang);
      const loading = ref(true);
      const isRoteiro = ref(true);
      onMounted(() => {
        setTimeout(() => {
          loading.value = false;
        }, 2000);
      });

      return {
        loading,
        isRoteiro,
        traducao
      };
    }
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
  .loader {
  --s: 40px;
  height: calc(var(--s)*0.9);
  width: calc(var(--s)*5);
  --v1: transparent, #000 0.5deg 108deg, transparent 109deg;
  --v2: transparent, #000 0.5deg 36deg, transparent 37deg;
  
  background: linear-gradient(#ffb940 0 0) left/0% 100% #ddd no-repeat;
  animation: l20 2s infinite linear;
  
  /* Mask settings */
  -webkit-mask: 
    conic-gradient(from 54deg at calc(var(--s)*0.68) calc(var(--s)*0.57), var(--v1)),
    conic-gradient(from 90deg at calc(var(--s)*0.02) calc(var(--s)*0.35), var(--v2)),
    conic-gradient(from 126deg at calc(var(--s)*0.5) calc(var(--s)*0.7), var(--v1)),
    conic-gradient(from 162deg at calc(var(--s)*0.5) 0, var(--v2));
    
  -webkit-mask-size: var(--s) var(--s);
  -webkit-mask-composite: xor, destination-over;
  mask-composite: exclude, add;
  -webkit-mask-repeat: repeat-x;
}

@keyframes l20 {
  0% {
    background-size: 0% 100%;
  }
  90%, 100% {
    background-size: 100% 100%;
  }
}
  </style>
  
  