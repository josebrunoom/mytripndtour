<template>
    <div>
      <div v-html="htmlContent"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const htmlContent = ref('');
  
  onMounted(async () => {
    console.log('afsasf')
    try {
      // Load the HTML file from the assets folder
      const response = await axios.get(new URL('../assets/MTT_Política_de_Privacidade.htm', import.meta.url).href);
      htmlContent.value = response.data;
    } catch (error) {
      console.error('Error loading HTML content:', error);
    }
  });
  </script>