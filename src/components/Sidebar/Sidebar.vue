<template>
    <div class="h-screen w-screen flex fixed left-0 top-0">
        <!-- <div class="w-[400px] h-full">
            <div class="h-[calc(100vh-50px)] bg-[#ffff]">
                <div class="flex justify-center mb-4 top-0">
                <img src="../../assets/logo.jpg" alt="Logo" class="img-Logo" />
                </div>
            </div>
        </div> -->
        <div class="w-full h-full bg-[#faf8fd]"> 
            <div class="h-[50px] bg-[#faf8fd]"> 
            <!-- header sidebar -->
        </div>
        <div class="h-[calc(100vh-50px)] bg-[#faf8fd]">
            <RouterView></RouterView>
        </div>
        </div>
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import HomeScreen from '../HomeScreen.vue';

  // Add any required setup scripts here
</script>

<style scoped>
  .img-Logo{
    width: 10rem;
    height: 10rem;
    }
</style>
  