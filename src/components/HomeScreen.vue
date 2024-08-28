<template>
  <div class="container-fluid px-3 px-md-5 scrollable-container"> <!-- Adjust padding for different screen sizes -->
    <div class="row mb-4">
      <div class="col-12 col-md-6 mb-3 mb-md-0">
        <div class="p-4 rounded-lg shadow-md h-44" style="background-color: #FEECCF;">
          <div class="d-flex align-items-center justify-content-between">
              <h2 class="h5 fw-bold mb-4 text-left">
                Cidade de Origem
                <i 
                  class="bi bi-question-circle-fill"
                  data-toggle="tooltip" 
                  data-placement="top"
                  title="tooltip 1"
                ></i>
              </h2>
            </div>
          <div class="d-flex align-items-center" v-if="showOrigem==false">
            <button class="fw-bold mr-2 h1" @click="setOrigem">{{ OrigemCity ? OrigemCity : 'Selecione a Origem' }}</button>
            <!-- <button class="bg-white rounded-full w-6" @click="setOrigem"><i class="fa-solid fa-pen-to-square"></i></button> -->
          </div>
          <div v-show="showOrigem==true">
            <input id="autocompleteO" type="text" placeholder="Origem" class="w-full h-10 bg-white rounded-lg" style="padding-left: 10px; padding-right: 10px;">
            <!-- <vue-google-autocomplete id="map" types="(cities)" classname="form-control" placeholder="Origem" v-on:placechanged="handlePlaceOrigem">
            </vue-google-autocomplete> -->
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="p-4 rounded-lg shadow-md h-44" style="background-color: #CFEDFE;">
          <div class="d-flex align-items-center justify-content-between">
              <h2 class="h5 fw-bold mb-4 text-left">
                Destino(s)
                <i 
                  class="bi bi-question-circle-fill"
                  data-toggle="tooltip" 
                  data-placement="top"
                  title="tooltip 1"
                ></i>
              </h2>
            </div>
          <div class="d-flex align-items-center" v-if="showDestino==false">
            <button class="fw-bold mr-2 h1" @click="setDestino">{{ DestinoCity ? DestinoCity : 'Selecione o Destino' }}</button>
            <!-- <button class="bg-white rounded-full w-6" @click="setDestino"><i class="fa-solid fa-pen-to-square"></i></button> -->
          </div>
          <div v-show="showDestino==true">
            <input id="autocompleteD" type="text" placeholder="Destino" class="w-full h-10 bg-white rounded-lg" style="padding-left: 10px; padding-right: 10px;">
            <!-- <vue-google-autocomplete id="map2" types="(cities)" classname="form-control" placeholder="Destino" v-on:placechanged="handlePlaceDestino">
            </vue-google-autocomplete> -->
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-12 col-md-6 mb-3 mb-md-0">
        <div class="p-3 bg-white" style="border-radius: 8px;">
          <div class="d-flex align-items-center justify-content-center position-relative">
            <h2 class="h5 fw-bold mb-2">Duração da Viagem</h2>
            <i 
                  class="bi bi-question-circle-fill mb-2 pl-1"
                  data-toggle="tooltip" 
                  data-placement="top"
                  title="tooltip 1"
                ></i>
          </div>
        <div class="row">
          <div class="col-6 mt-2 text-start fw-bold">Quantidade de dias:</div>
          <div class="col-6 mt-2 text-start fw-bold">Data de início:</div>
        </div>
        <div class="row align-items-center">
          <div class="col-12 col-md-6 mt-2">
            <input 
              type="number" 
              class="form-control" 
              placeholder="00" 
              v-model="periodo_viagem"
            />
          </div>
          <div class="col-12 col-md-6 mt-2">
            <VueDatePicker 
              v-model="date"
              locale="pt-BR"
              :enable-time-picker="false"
              class="w-100"
              style="z-index: 999;"
              cancel-text="Fechar"
              select-text="Selecionar"
              :format="customFormat"
            ></VueDatePicker>
          </div>
        </div>
      </div>
      </div>
      
    
      <div class="col-12 col-md-6 mb-3 mb-md-0">
        <div class="p-3 bg-white" style="border-radius: 8px;">
          <div class="d-flex align-items-center justify-content-center position-relative">
            <h2 class="h5 fw-bold mb-2">Pessoas</h2>
            <i 
                  class="bi bi-question-circle-fill mb-2 pl-1"
                  data-toggle="tooltip" 
                  data-placement="top"
                  title="tooltip 1"
                ></i>
          </div>
        <div class="row">
          <div class="col-4 mt-2 text-start fw-bold">Adultos:</div>
          <div class="col-4 mt-2 text-start fw-bold">Crianças:</div>
          <div v-if="numChildren > 0" class="col-4 mt-2 text-start fw-bold">
            <button 
              @click="prevChild" 
              :disabled="currentIndex === 0" 
              class="bg-white hover:bg-gray-500 text-black rounded-lg"
            >
              &lt;
            </button>
            Idade Criança {{ currentIndex + 1 }}:
            <button 
              @click="nextChild" 
              :disabled="currentIndex === numChildren - 1" 
              class="bg-white hover:bg-gray-500 text-black rounded-lg"
            >
              &gt;
            </button>
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-12 col-md-4 mt-2">
            <input 
              type="number" 
              class="form-control" 
              placeholder="00" 
              v-model.number="numAdults"
            />
          </div>
          <div class="col-12 col-md-4 mt-2">
            <input 
              type="number" 
              class="form-control" 
              placeholder="00"  
              v-model="formattedChildren"
              @input="formatChildren"
            />
          </div>
          <div v-if="numChildren > 0" class="col-12 col-md-4 mt-2">
              <input 
                type="text" 
                class="form-control" 
                placeholder="Idade" 
                v-model.number="childAges[currentIndex]"
              />
          </div>
        </div>
      </div>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-12 col-md-3 mb-3 mb-md-0">
        <div class="p-3 bg-white" style="border-radius: 8px;">
          <div class="d-flex align-items-center justify-content-center position-relative" style="padding-bottom: 4%;">
            <h2 class="h5 fw-bold mb-2">Tipo de Hospedagem</h2>
            <i 
                  class="bi bi-question-circle-fill mb-2 pl-1"
                  data-toggle="tooltip" 
                  data-placement="top"
                  title="tooltip 1"
                ></i>
          </div>
          <div 
            v-for="(modo, index) in lugares" 
            :key="index" 
            class="d-inline-flex mb-2"
          >
            <label class="d-flex ml-2">
              <input type="radio" :name="lugares" :value="modo" class="me-2" v-model="hospedagemSelecionada"/>
              <span>{{ modo }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4 mb-3 mb-md-0">
        <div class="bg-white p-3 rounded-lg">
          <div class="d-flex align-items-center justify-content-center position-relative">
            <h2 class="h5 fw-bold mb-2">Quero Viajar de </h2>
            <i 
                  class="bi bi-question-circle-fill mb-2 pl-1"
                  data-toggle="tooltip" 
                  data-placement="top"
                  title="tooltip 1"
                ></i>
          </div>
          <!-- <select class="w-100 form-select" id="select-transporte">
            <option value=""></option>
            <option value="Carro">Carro</option>
            <option value="Ônibus">Ônibus</option>
            <option value="Moto">Moto</option>
            <option value="Avião">Avião</option>
          </select> -->
          <div 
            v-for="(modo, index) in transporteOptions" 
            :key="index" 
            class="d-inline-flex mb-2"
          >
            <label class="d-flex ml-2">
              <input type="radio" :name="transporteOptions" :value="modo" class="me-2" v-model="meio_transporte"/>
              <span>{{ modo }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="bg-white p-3 rounded-lg">
          <div class="d-flex align-items-center justify-content-center position-relative">
            <h2 class="h5 fw-bold mb-2">Lista de Interesses</h2>
            <i 
                  class="bi bi-question-circle-fill mb-2 pl-1"
                  data-toggle="tooltip" 
                  data-placement="top"
                  title="tooltip 1"
                ></i>
          </div>
          <div 
            v-for="(interest, index) in interesses" 
            :key="index" 
            class="d-inline-flex align-items-center mb-2"
          >
            <label class="d-flex align-items-center pl-3">
              <input type="checkbox" :name="interest" :value="interest" class="me-2" v-model="selectedInteresses"/>
              <span>{{ interest }}</span>
            </label>
          </div>
        </div>
        <!-- <div class="bg-white p-3">
          <h2 class="h5 fw-bold mb-2">Moeda preferida</h2>
          <VueSelect :options="Moedas" class="w-100"></VueSelect>
        </div> -->
      </div>
      
    </div>

    <div class="row mb-4">
      <div class="col-12 col-md-6 mb-3 mb-md-0">
        <div class="bg-white p-3 rounded-lg">
          <div class="d-flex align-items-center justify-content-center position-relative">
            <h2 class="h5 fw-bold mb-2">Quero Conhecer</h2>
            <i 
                  class="bi bi-question-circle-fill mb-2 pl-1"
                  data-toggle="tooltip" 
                  data-placement="top"
                  title="tooltip 1"
                ></i>
                <div class="">
                  <button>
                  <i 
                  class="fa fa-plus mb-2 pl-1 pb-1"
                  data-toggle="tooltip" 
                  data-placement="top"
                  title="adicionar item"
                ></i>
                </button>
                </div>
          </div>
          <input id="autocompleteQ" type="text" placeholder="Informe o local" class="w-full h-10" style="padding-left: 10px; padding-right: 10px;">
          <!-- <vue-google-autocomplete id="map3" types="establishment" classname="form-control" placeholder="" v-on:placechanged="handlePlaceC">
          </vue-google-autocomplete> -->
        </div>
      </div>
      <div class="col-12 col-md-6 mb-3 mb-md-0">
        <div class="bg-white p-3 rounded-lg">
          <div class="d-flex align-items-center justify-content-center position-relative">
            <h2 class="h5 fw-bold mb-2">Não precisa incluir</h2>
            <i 
                  class="bi bi-question-circle-fill mb-2 pl-1"
                  data-toggle="tooltip" 
                  data-placement="top"
                  title="tooltip 1"
                ></i>
                <div class="">
                  <button>
                  <i 
                  class="fa fa-plus mb-2 pl-1 pb-1"
                  data-toggle="tooltip" 
                  data-placement="top"
                  title="adicionar item"
                ></i>
                </button>
                </div>
          </div>
          <input id="autocompleteN" type="text" placeholder="Informe o local" class="w-full h-10" style="padding-left: 10px; padding-right: 10px;">
          <!-- <vue-google-autocomplete id="map4" types="establishment" classname="form-control" placeholder="" v-on:placechanged="handlePlaceN">
          </vue-google-autocomplete> -->
        </div>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-12 d-flex justify-content-start">
        <div class="fw-bold mb-2 pl-2">Gerar com detalhes descritivos dos locais sugeridos? </div>
        <div 
            class="d-inline-flex align-items-center mb-2"
          >
          <div 
            v-for="(modo, index) in opc" 
            :key="index" 
            class="d-inline-flex mb-2"
          >
            <label class="d-flex ml-2">
              <input type="radio" :name="opc" :value="modo" class="me-2" v-model="opcaoGerar"/>
              <span>{{ modo }}</span>
            </label>
          </div>
          </div>
      </div>
      <div class="col-12 d-flex justify-content-start">
        <button 
          type="button" 
          class="me-2 bg-[#78c0d6] text-white pl-2 pr-2 rounded-lg" 
          @click="postRoteiro"
        >
          Gerar Roteiro
        </button>
        <button 
          type="button" 
          class="btn btn-danger"
          @click="refreshPage"
        >
          Limpar Tudo
        </button>
        
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-12 roteiro-container bg-white">
        <!-- Render each item after parsing with marked -->
         <div v-if="roteiroData.Roteiro!=null">
          <div v-html="parseMarkdown(roteiroData.Roteiro.Roteiro)" class="roteiro-item"></div>
         </div>
      </div>
    </div>
    <Loading :loading="isLoading"/>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Atenção</v-card-title>
        <v-card-text>Os campos: origem, destino, quantidade de dias, data de inicio e quantidade de adultos são obrigatórios!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="[#78c0d6]" text @click="dialog=false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


  
<script setup>
  import { ref, onMounted, watch, computed } from 'vue'
  import VueDatePicker from '@vuepic/vue-datepicker';
  import VueSelect from 'vue-select';
  import axios from 'axios';
  import moment from 'moment';
  import Loading from './Loading.vue';
  import { marked } from 'marked';
  import VueGoogleAutocomplete from "vue-google-autocomplete";

  const date = ref();
  const numAdults = ref()
  const numChildren = ref();
  //const childAges = ref([]);
  const currentIndex = ref(0);
  const isLoading=ref(false)
  const showOrigem=ref(false)
  const showDestino=ref(false)
  const dialog=ref(false)
  const user=JSON.parse(localStorage.getItem('user'));
  let childAges=[]
  let transporteOptions=['Aéreo','Marítimo','Meios Próprios (não gerar)','Rodoviário', 'Trens','Veículos de Aluguel']
  let opc=['Sim','Não']
  let interesses=['Compras', 'Cidades Históricas', 'Cultura Local', 'Diversão Noturna','Ecoturismo', 'Esportes',  'Gastronomia', 'Museus',  'Parques de Diversão']
  let selectedInteresses=[]
  let lugares=['Alto luxo','Hostel', 'Pousadas', , 'Resorts', 'Só pra dormir (3 estrelas)']
  let hospedagemSelecionada
  let Destinos=[]
  let Origem
  let periodo_viagem
  let lugar_nIr=['',]
  let lugar_Conhecer=['',]
  let meio_transporte
  let roteiroData = {Roteiro:null,}
  let OrigemCity = null
  let DestinoCity = null
  let opcaoGerar
/*   {
    email: "luisalbergoni717@gmail.com",
    origem: "Guaxupé",
    "destino": "Santos",
    "dias": "5",
    "data_inicio": "28/08/2024",
    "qtd_adultos": 5,
    "qtd_menores": 2,
    "idade_menores": [
        2,
        2
    ],
    "interesses": [
        "Ecoturismo"
    ],
    "locais_interesse": [
        "",
        "Praia dos Milionários"
    ],
    "lugar_nao_quer_conhecer": [
        "",
        "Praia do Gonzaguinha"
    ],
    "meio_transporte": "Veículos de Aluguel",
    "tipo_hospedagem": "Alto luxo",
    "desc_detalhada": "S",
    "idioma": "PT-BR",
    "ip_origem": "186.193.138.75"
} */

  onMounted(() => {
  const initAutocomplete = (elementId, types) => {
    const input = document.getElementById(elementId);
    const autocomplete = new google.maps.places.Autocomplete(input, { types });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      console.log(place.name); // Handle the place name as needed
      if(elementId=='autocompleteQ'){
        lugar_Conhecer.push(place.name)
      }
      if(elementId=='autocompleteN'){
        lugar_nIr.push(place.name)
      }
      if(elementId=='autocompleteO'){
        Origem=place.name
        OrigemCity=place.name
        showOrigem.value=false
      }
      if(elementId=='autocompleteD'){
        Destinos.push(place.name)
        DestinoCity=place.name
        showDestino.value=false
      }
    });
  };
  console.log(user)
  initAutocomplete('autocompleteQ', ['point_of_interest', 'country', 'continent','locality']);
  initAutocomplete('autocompleteN', ['point_of_interest', 'country', 'continent','locality']);
  initAutocomplete('autocompleteO', ['(cities)']);
  initAutocomplete('autocompleteD', ['locality', 'country', 'continent']);

  
});

  const setOrigem = () =>{
    showOrigem.value=true
  }
  const setDestino = () =>{
    showDestino.value=true;
  }
  
  const refreshPage = () => {
    window.location.reload();
  };

  const handlePlaceOrigem=(place)=>{
    Origem=place.locality
    OrigemCity=place.locality
    showOrigem.value=false
  }
  const handlePlaceDestino=(place)=>{
    Destinos[0]=place.locality
    DestinoCity=place.locality
    showDestino.value=false
  }
  const handlePlaceC=(place)=>{
    lugar_Conhecer[0]=document.getElementById("map3").value
  }
  const handlePlaceN=(place)=>{
    lugar_nIr[0]=document.getElementById("map4").value
  }
  
watch(numChildren, (newCount) => {
  if (newCount > childAges.length) {
    for (let i = childAges.length; i < newCount; i++) {
      childAges.push('');
    }
  } 
  else if (newCount < childAges.length) {
    childAges.splice(newCount);
  }
});
const formatChildren = () => {
      numChildren.value = parseInt(formattedChildren.value) || 0;
      while (childAges.length < numChildren.value) {
        childAges.push(null);  
      }
      while (childAges.length > numChildren.value) {
        childAges.pop();
      }
    };

    const prevChild = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--;
      }
    };

    const nextChild = () => {
      if (currentIndex.value < numChildren.value - 1) {
        currentIndex.value++;
      }
    };

    const formattedChildren = computed({
      get() {
        return numChildren.value;
      },
      set(value) {
        numChildren.value = value.replace(/\D/g, '').padStart(2, '0').slice(-2);}
      })


      function transformDates(initialDateStr, numberOfDays) {
        const initialDate = moment(initialDateStr);
        const formattedStartDate = initialDate.format('YYYY-MM-DD');
        const endDate = initialDate.clone().add(numberOfDays, 'days');
        const formattedEndDate = endDate.format('YYYY-MM-DD');
        return `${formattedStartDate} a ${formattedEndDate}`;
      }
      function transformDate(initialDateStr) {
        const initialDate = moment(initialDateStr);
        const formattedStartDate = initialDate.format('DD/MM/YYYY');
        console.log(formattedStartDate)
        return `${formattedStartDate}`;
      }

const postRoteiro=async () =>{
  isLoading.value=true
  let ObjRoteiro={
    cidade_origem:Origem,
    destinos:[{cidade_destino: Destinos[0],
            periodo_viagem: transformDates(date.value, periodo_viagem),
            quantidade_adultos: numAdults.value,
            quantidade_criancas: numChildren.value ? numChildren.value : 0,
            idades_criancas: childAges,
            locais_interesse: lugar_Conhecer,
            lugar_nao_quer_conhecer: lugar_nIr,
            meio_transporte: meio_transporte}]
  }
  let ObjRoteiro1={
    email:user.Email,
    origem:Origem,
    destino: Destinos[0],
    dias:periodo_viagem,
    data_inicio: transformDate(date.value),
    qtd_adultos: numAdults.value,
    qtd_menores: numChildren.value ? numChildren.value : 0,
    idade_menores: childAges,
    interesses: selectedInteresses,
    locais_interesse: lugar_Conhecer,
    lugar_nao_quer_conhecer: lugar_nIr,
    meio_transporte: meio_transporte == 'Meios Próprios (não gerar)' ? 'N' : meio_transporte,
    tipo_hospedagem:hospedagemSelecionada,
    desc_detalhada:opcaoGerar=='Sim' ? 'S' : 'N',
    idioma: "PT-BR",
    ip_origem: user.ip_origem
  }
  
  console.log(ObjRoteiro1)
  if(!ObjRoteiro1.origem || !ObjRoteiro1.destino || !ObjRoteiro1.dias || !ObjRoteiro1.data_inicio || !ObjRoteiro1.qtd_adultos){
    dialog.value = true;
    isLoading.value = false; 
  }
  else{
    try {
      const response = await axios.post('https://mytripntour-lm7edjmduq-uc.a.run.app/', ObjRoteiro1)
      console.log(response.data)
      localStorage.setItem('roteiro', JSON.stringify(response.data));
      roteiroData.Roteiro=response.data
    } catch (error) {
      alert('Erro ao Gerar Roteiro')
    }
    finally {
      isLoading.value = false; 
    }
  }
  
}
function parseMarkdown(text) {
  console.log('parseText ', text)
  return marked(text);
}
const customFormat = (date) => {
  return date ? moment(date).format('DD/MM/YYYY') : '';
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');

* {
  font-family: 'Sora', sans-serif;
}
.scrollable-container {
  max-height: 90vh; /* Adjust as needed */
  overflow-y: auto;
  margin: 0 auto;
  padding: 1rem; /* Adjust as needed */
}
.autocomplete-container {
    position: relative;
}

  .suggestions-list {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 0.5rem;
  width: 100%;
  z-index: 10;
  position: absolute;
}

.suggestion-item {
  padding: 0.5rem;
  cursor: pointer;
}

.suggestion-item:hover {
  background-color: #f0f0f0;
}
  .fixed-container {
    width: 1000px; 
    height: 1000px; 
    overflow: auto; 
    background-color: #ffffff; 
    margin-right: 20rem;
  }
  .img-Logo {
    width: 40rem;
    height: 40rem;
  }
  .img-Google {
    width: 2rem;
    height: 2rem;
  }
  .input-box {
    width: 32rem;
  }
  .google-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .interest-list {
  max-width: 300px;
  margin: 15px;
  font-family: Arial, sans-serif;
  background-color: #ffffff
  }

h3 {
  font-size: 18px;
  margin-bottom: 15px;
}

.interest-item {
  background-color: #faf8fd;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

label {
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
}

input[type="radio"] {
  margin-right: 10px;
  accent-color: #000; 
}

.interest-label {
  font-size: 16px;
}
.children-ages {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; 
}

.child-age-item {
  flex: 1 1 calc(50% - 16px); 
  display: flex;
  align-items: center;
}
.roteiro-item {
    margin-bottom: 20px;
    line-height: 1.6;
    text-align: left;
    -webkit-touch-callout: none;  /* iPhone OS, Safari */
    -webkit-user-select: none;    /* Chrome, Safari 3 */
    -khtml-user-select: none;     /* Safari 2 */
    -moz-user-select: none;       /* Firefox */
    -ms-user-select: none;        /* IE10+ */
    user-select: none;            /* Possível implementação no futuro */
    /* cursor: default; */
  }

</style>
  