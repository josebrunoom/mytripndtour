<template>
    <div class="h-screen w-screen flex fixed left-0 top-0">
        <div class="w-full hidden sm:block md:w-[500px] lg:w-[300px] h-full mt-4 ml-4">
            <div class="h-[calc(100vh-50px)] bg-[#ffff] rounded-lg">
                <div class="flex justify-center mb-4 top-0">
                    <img src="../../assets/Logotipo/Arquivos em Imagem/Arquivos com Fundo/Logotipo_MyTripNTour_ComFundo-01.jpg" alt="Logo" class="img-Logo" />
                </div>
                <div class="col-12 pb-3">
                    <div v-if="currentRouteName=='home'">
                        <button 
                            type="button" 
                            class="me-2 bg-[#78c0d6] text-white pl-2 pr-2 rounded-lg w-36" 
                            @click=""
                        >
                        <i class="fa-regular fa-file"></i>
                        Roteiros
                        </button>
                    </div>
                    <div v-else>
                        <button 
                            type="button" 
                            class="me-2 text-black pl-2 pr-2 rounded-lg w-36" 
                            @click="goTo('home')"
                        >
                        <i class="fa-regular fa-file"></i>
                        Roteiros
                        </button>
                    </div>
            </div>
            <div class="col-12 pb-3">
                <div v-if="currentRouteName=='Perfil'">
                    <button 
                    type="button" 
                    class= "me-2 bg-[#78c0d6] text-white pl-2 pr-2 rounded-lg w-36" 
                    @click=""
                    >
                    <i class="fa-regular fa-user"></i>
                    Meu Perfil
                    </button>
                </div>
                <div v-else>
                    <button 
                    type="button" 
                    class="me-2 text-black pl-2 pr-2 rounded-lg w-36" 
                    @click="goTo('perfil')"
                    >
                    <i class="fa-regular fa-user"></i>
                    Meu Perfil
                    </button>
                </div>
            </div>
            <div class="col-12 pb-3">
                <button 
                    type="button" 
                    class="me-2 text-black hover:text-white pl-2 pr-2 rounded-lg w-36" 
                    @click="openDialog('sair')"
                >
                <i class="fa-solid fa-door-open"></i>
                Sair
                </button>
            </div>
            </div>
        </div>
        <div class="w-full bg-[#faf8fd]"> 
            <div style="height:5% !important;" class=" bg-[#faf8fd]"> 
                <div class="d-flex justify-content-end align-items-center mt-4 pr-16">
                    <button class="fw-bold mr-4" @click="openDialog('lang')"><i class="fa-solid fa-globe"></i> Idioma</button>
                    <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white me-2" :src="img" alt="" />
                    <button class="fw-bold">{{ name }}</button>
                </div>
            </div>
            <div class="h-[calc(100vh-50px)] bg-[#faf8fd]">
                <RouterView></RouterView>
            </div>
        </div>
        <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Selecionar Idioma</v-card-title>
        <v-card-text></v-card-text>
            <select class="form-control " v-model="lenguage" @change="savelang">
                <option value="" disabled>Selecione o Idioma</option>
                <option value="EN-US">Inglês</option>
                <option value="PT-BR">Português</option>
                <option value="ES">Espanhol</option>
            </select>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="[#78c0d6]" text @click="dialog=false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogSair" max-width="500px">
      <v-card>
        <v-card-title class="headline">Atenção</v-card-title>
        <v-card-text>Deseja mesmo Sair?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="[#78c0d6]" text @click="sairUser">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted,watchEffect  } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import router from '../../routes';

const user = JSON.parse(localStorage.getItem('user'));
const name = ref('')
const route = useRoute();
const currentRouteName=ref(route.name)
const img = ref('')
const dialog=ref(false)
const dialogSair=ref(false)
const lenguage = ref('')

const savelang = () => {
    localStorage.setItem('lang', lenguage.value)
}
onMounted(() => {
    name.value=user.Nome
    img.value=user.photo
    console.log(route.name);
})
watchEffect(() => {
    currentRouteName.value = route.name;
    console.log('Current route name:', currentRouteName.value);
});
const goTo=(id)=>{
    router.push('/mytrip/'+id);
}
const openDialog = (id) =>{
    if(id=='lang'){
        dialog.value = true;
    }
    if(id=='sair'){
        dialogSair.value=true;
    }
}
const sairUser = () =>{
    dialogSair.value=false
    localStorage.clear();
    router.push('/')
}
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