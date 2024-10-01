<script setup>
import { RouterView, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import Sidebar from './components/Sidebar/Sidebar.vue';
import { computed } from 'vue'
const route=useRoute()
const showSidebar = computed(() => route.name !== 'Login')
onMounted(() => {
  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement({
      pageLanguage: 'pt', // Change to your default language
      layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
    }, 'google_translate_element');
  };
});
</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->
  <!-- <div v-if="showSidebar">
        <Sidebar />
      </div> -->
  <RouterView></RouterView>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
