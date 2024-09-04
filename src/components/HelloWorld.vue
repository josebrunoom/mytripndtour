<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div>
    <div id="google_translate_element">aaaa</div>
    <br>
    aqui vai um texto de exemplo
    <!-- Botões ou links para selecionar o idioma -->
    <button @click="changeLanguage('en')">Inglês</button>
    <button @click="changeLanguage('es')">Espanhol</button>
    <button @click="changeLanguage('fr')">Francês</button>
  </div>
</template>

<script>
export default {
  methods: {
    changeLanguage(lang) {
      const translateFrame = document.querySelector('iframe.skiptranslate');
      if (!translateFrame) return;
      
      const select = translateFrame.contentWindow.document.querySelector('select.goog-te-combo');
      if (select) {
        select.value = lang; // Define o idioma
        select.dispatchEvent(new Event('change')); // Dispara o evento de mudança
      }
    }
  }
}
</script>


<style scoped>
.read-the-docs {
  color: #888;
}
</style>
