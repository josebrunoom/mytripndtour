<template>
    <div class="h-screen w-screen flex fixed left-0 top-0">
        <div class="w-full hidden sm:block md:w-[500px] lg:w-[300px] h-full mt-4 ml-4">
            <div class="h-[calc(100vh-50px)] bg-[#ffff] rounded-lg">
                <div class="flex justify-center mb-4 top-0">
                    <img src="../../assets/logo.jpg" alt="Logo" class="img-Logo" />
                </div>
            </div>
        </div>
        <div class="w-full bg-[#faf8fd]"> 
            <div style="height:5% !important;" class=" bg-[#faf8fd]"> 
            <!-- <img data-v-86585a1e="" src="/src/assets/logo.jpg" alt="Logo" class="" style="
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                    width: 10%;
                "> -->
                <div class="d-flex justify-content-end align-items-center mt-4 pr-16">
                    <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white me-2" :src="img" alt="" />
                    <button class="fw-bold">{{ name }}</button>
                </div>
            </div>
            <div class="h-[calc(100vh-50px)] bg-[#faf8fd]">
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router';

const user = JSON.parse(localStorage.getItem('user'));
const name = ref('')
let img

onMounted(() => {
    name.value=user.Nome
    img=user.photo
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');

* {
    font-family: 'Sora', sans-serif;
}
    .img-Logo{
    width: 10rem;
    height: 10rem;
    }
</style>