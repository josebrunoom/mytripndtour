<template>
    <div class="container-fluid px-3 px-md-5 scrollable-container">
      <div class="d-flex align-items-start">
        <div class="mb-4">
          <!-- <img class="inline-block h-20 w-20 rounded-full ring-2 ring-white me-2" :src="img" alt="" /> -->
          <h1>{{ traducao.MeuPerfil }}</h1>
        </div>
      </div>
      <div class="row mb-4">
      <div class="col-12 col-md-4">
        <div class="bg-white p-3 rounded-lg">
          <div class="col-12 pb-2">
            <h5 class="text-left">{{ traducao.Nome }}:</h5>
            <input v-model="name" class="form-control"/>
          </div>
          <div class="col-12 pb-2">
            <h5 class="text-left">{{ traducao.Aniversario }}</h5>
            <VueDatePicker 
              v-model="birthday"
              locale="pt-BR"
              :enable-time-picker="false"
              class="w-100"
              style="z-index: 999;"
              cancel-text="Fechar"
              select-text="Selecionar"
              :format="customFormat"
            />
          </div>
          <div class="col-12 pb-2">
            <h5 class="text-left">{{ traducao.Genero }}</h5>
            <select class="w-100 form-select" id="selectedGender" v-model="selectedGender">
            <option value=""></option>
            <option value="male">{{ traducao.Masculino }}</option>
            <option value="female">{{ traducao.Feminino }}</option>
            <option value="other">{{ traducao.Outro }}</option>
            </select>
          </div>
        </div>
        </div>
        <div class="col-12 d-flex justify-content-start pt-3">
        <button 
          type="button" 
          class="me-2 bg-[#78c0d6] text-white pl-2 pr-2 rounded-lg" 
          @click="postRoteiro"
        >
          {{ traducao.EditPerfil }}
        </button>
        <button 
          type="button" 
          class="btn btn-danger"
          @click="dialog = true"
        >
          {{ traducao.ApagarPerfil }}
        </button>
        
      </div>
      </div>
      <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ traducao.ConfirmAcao }}</v-card-title>
        <v-card-text>{{ traducao.Ctz }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="[#78c0d6]" text @click="dialog=false">{{ ptLtraducaoang.Cancelar }}</v-btn>
          <v-btn color="red darken-1" text @click="deleteItem()">{{ traducao.Apagar }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Loading :loading="isLoading" />
    </div>
    
</template>
  
<script setup>
  import {ref, onMounted} from 'vue';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import moment from 'moment';
  import ptLang from '../data/ptlang';

  let TRoteiro
  const traducao = ref(ptLang)
  const user = JSON.parse(localStorage.getItem('user'));
  const name = ref('')
  const birthday = ref('')
  const selectedGender=ref('')
  const date=ref('')
  const dialog=ref(false)
  const isLoading = ref(true)
  let img
  onMounted(() => {
    console.log(user)
    name.value=user.name
    if (user.birthday) {
      const formattedDate = moment(user.birthday, 'DD/MM/YYYY').toDate();
      birthday.value = formattedDate;
    }
    date.value=user.birthday
    selectedGender.value=user.gender
    img=user.photo
    getTraducao()
  })
  const getTraducao = async () => {
    isLoading.value=true
    const userLocale = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'pt-br'
    try {
      let objUser = {
            email: user.email ? user.email : user.Email,
            name: user.name,
            birthday: user.birthday,
            gender: user.gender,
            sigla_idioma:userLocale.toUpperCase(),
            ip_origem:user.ip_origem,
            pagina:'Roteiros',
          };
    const response = await axios.post('https://newlogin-lm7edjmduq-uc.a.run.app', objUser)
    TRoteiro=JSON.parse(response.data.traducao)
    traducao.value=TRoteiro.Perfil
    isLoading.value=false
    console.log(traducao.value)
    } catch (error) {
      console.log(error)
      isLoading.value=false
    }
  }
  const customFormat = (date) => {
  return date ? moment(date).format('DD/MM/YYYY') : '';
  };
  const editPerfil = () =>{
    
  }
  const deletePerfil = () =>{
      dialog.value = true;
  }
</script>
  
  <style scoped>
.scrollable-container {
  max-height: 90vh; /* Adjust as needed */
  overflow-y: visible; /* Change to visible */
  margin: 0 auto;
  padding: 1rem; /* Adjust as needed */
}
  .roteiro-container {
    overflow-y: auto; 
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
  }
  
  .roteiro-item {
    margin-bottom: 20px;
    line-height: 1.6;
    text-align: left
  }
  
  h1, h2, h3 {
    color: #333;
    margin-bottom: 10px;
    text-align: left
  }
  
  p, li {
    color: #555;
    text-align: left
  }
  
  ul {
    padding-left: 20px;
    list-style-type: disc;
  }
  
  ul li {
    margin-bottom: 8px;
  }
  </style>
  