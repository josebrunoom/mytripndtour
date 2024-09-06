<template>
  <div class="container-fluid px-3 px-md-5 scrollable-container"> <!-- Adjust padding for different screen sizes -->
    <div class="row mb-4">
      <div class="col-12 col-md-6 mb-3 mb-md-0">
        <div class="p-4 rounded-lg shadow-md h-44" style="background-color: #FEECCF;">
          <div class="d-flex align-items-center justify-content-between">
              <h2 class="h3 fw-bold text-left">
                Cidade de Origem
                <i 
                  class="bi bi-question-circle-fill mr-2"
                  data-toggle="tooltip" 
                  data-placement="top"
                  title="tooltip 1"
                ></i>
              </h2>
            </div>
            <input ref="inputOrigem" id="autocompleteO" type="text" placeholder="Origem" class="w-full h-10 bg-white rounded-lg" v-model="OrigemCity" style="padding-left: 10px; padding-right: 10px;">
            <!-- <vue-google-autocomplete id="map" types="(cities)" classname="form-control" placeholder="Origem" v-on:placechanged="handlePlaceOrigem">
            </vue-google-autocomplete> -->
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="p-4 rounded-lg shadow-md h-44" style="background-color: #CFEDFE;">
          <div class="d-flex align-items-center justify-content-between">
              <h2 class="h3 fw-bold  text-left">
                Destino(s)
                <i 
                  class="bi bi-question-circle-fill mr-2"
                  data-toggle="tooltip" 
                  data-placement="top"
                  title="tooltip 1"
                ></i>
              </h2>
              <div class="h5 fw-bold mb-6 ms-auto">
                <!-- <button @click="addDestino">
                <i 
                  class="fa-solid fa-plus "
                  data-toggle="tooltip" 
                  data-placement="top"
                  title="adicionar destino"
                ></i>
              </button> -->
              </div>
            </div>
            <input ref="inputDestino" id="autocompleteD" type="text" placeholder="Destino" class="w-full h-10 bg-white rounded-lg" v-model="location2" @change="handleSelect2()" style="padding-left: 10px; padding-right: 10px;">
            <!-- <vue-google-autocomplete id="map2" types="(cities)" classname="form-control" placeholder="Destino" v-on:placechanged="handlePlaceDestino">
            </vue-google-autocomplete> -->
          <div class="selected-placesDestino">
            <div v-for="(place, index) in lugaresDestinosFullNames" :key="index">
              <span class=" text-black" style="font-size: 0.8rem;">
                {{ place }};
            </span>
            <button @click="removePlaceDestino(index)" class="btn-sm ms-2"><i class="fa-solid fa-trash"></i></button>
            </div>
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
          <div class="col-12 col-md-2 mt-2">
            <input 
              type="number" 
              class="form-control" 
              placeholder="0" 
              v-model="periodo_viagem"
              min="0"
              @change="transformDates(date,periodo_viagem)"
            />
          </div>
          <div class="col-6 mt-3 text-start fw-bold">Dias</div>
        </div>
        <div class=" align-items-center d-flex">
          <div class="col-12 col-md-3 mt-2">
            <VueDatePicker 
              v-model="date"
              locale="pt-BR"
              :enable-time-picker="false"
              class="w-100"
              style="z-index: 999;"
              cancel-text="Fechar"
              select-text="Selecionar"
              :format="customFormat"
              auto-apply
              :min-date="new Date()"
              @date-update="transformDates(date,periodo_viagem)"
            ></VueDatePicker>
          </div>
          <div v-if="date && periodo_viagem" class="pt-2 px-3">
            <i class="fa-solid fa-arrow-right"></i>
          </div>
          <div v-if="date && periodo_viagem" class="pt-2 ">
            <span class="fw-bold">
              {{ FinalDate }}
            </span>
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
          <div class="col-md-2 mt-2">
            <input 
              type="number" 
              class="form-control" 
              placeholder="0" 
              v-model.number="numAdults"
              min="0"
            />
          </div>
          <div class="col-2 mt-3 text-start fw-bold">Adultos</div>
          <div class="col-md-2 mt-2">
            <input 
              type="number" 
              class="form-control" 
              placeholder="0"  
              v-model="numChildren"
              @input="formatChildren"
              min="0"
              max="5"
            />
          </div>
          <div class="col-4 mt-3 text-start fw-bold">Menores</div>
          <!-- <div v-if="numChildren > 0" class="col-4 mt-2 text-center fw-bold">
            <button 
              @click="prevChild" 
              :disabled="currentIndex === 0" 
              class="bg-gray-300 hover:bg-gray-500  rounded-lg w-6"
            >
            <i class="fa-solid fa-arrow-left"></i>
            </button>
            Idade {{ currentIndex + 1 }}° Menor 
            <button 
              @click="nextChild" 
              :disabled="currentIndex === numChildren - 1" 
              class="bg-gray-300 hover:bg-gray-500 rounded-lg w-6"
            >
            <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div> -->

        </div>
        <div class="row align-items-center">
          <div class="col-3 mt-2 text-center fw-bold">
            <div class="d-flex space-x-4">
              <div 
                v-for="(age, index) in numChildren" 
                :key="index" 
                class="col-6 mb-2"
              >
                <input 
                  type="number" 
                  class="form-control" 
                  :placeholder="`Idade ${index + 1}`" 
                  v-model.number="childAges[index]"
                  min="0"
                  max="17"
                />
              </div>
            </div>
          </div>
          <!-- <div v-if="numChildren > 0" class="col-12 col-md-4 mt-2">
              <input 
                type="number" 
                class="form-control" 
                placeholder="Idade" 
                v-model.number="childAges[currentIndex]"
                min="0"
              />
          </div> -->
        </div>
      </div>
      </div>
    </div>

    <div class="row mb-4 col-12">
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
      <!-- <div class="col-12 col-md-4 mb-3 mb-md-0">
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
      </div> -->
      <div class="col-12 col-md-3">
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
              <input type="checkbox" :name="interest" v-model="inChecked[index]" :value="interest" class="me-2 custom-checkbox" @input="pushInteresses($event,interest)"/>
              <span>{{ interest }}</span>
            </label>
          </div>
        </div>
        <!-- <div class="bg-white p-3">
          <h2 class="h5 fw-bold mb-2">Moeda preferida</h2>
          <VueSelect :options="Moedas" class="w-100"></VueSelect>
        </div> -->
      </div>
      <div class="col-12 col-md-3 mb-3 mb-md-0">
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
                  <!-- <i 
                  class="fa fa-plus mb-2 pl-1 pb-1"
                  data-toggle="tooltip" 
                  data-placement="top"
                  title="adicionar item"
                ></i> -->
                </button>
                </div>
          </div>
          <input id="autocompleteQ" type="text" placeholder="Informe o local" class="w-full h-10" v-model="location3" @change="handleSelect3()" style="padding-left: 10px; padding-right: 10px;">
          <div class="selected-places mt-2">
            <div v-for="(place, index) in lugaresConhecerFullNames" :key="index" class="d-flex mb-2 align-items-center">
              <span class=" text-black place-item">
                {{ place }};
            </span>
            <button @click="removePlace(index)" class="btn  btn-sm ms-2"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-3 mb-3 mb-md-0">
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
                  <!-- <i 
                  class="fa fa-plus mb-2 pl-1 pb-1"
                  data-toggle="tooltip" 
                  data-placement="top"
                  title="adicionar item"
                ></i> -->
                </button>
                </div>
          </div>
          <input id="autocompleteN" type="text" placeholder="Informe o local" class="w-full h-10" v-model="location4" @change="handleSelect4()" style="padding-left: 10px; padding-right: 10px;">
          <div class="selected-places mt-2">
            <div v-for="(place, index) in lugaresNaoIrFullNames" :key="index" class="d-flex mb-2 align-items-center">
              <span class=" text-black place-item">
                {{ place }};
            </span>
            <button @click="removePlaceNir(index)" class="btn  btn-sm ms-2"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>
      </div>
      
    </div>

    <div class="row mb-4">


    </div>

    <div class="row mb-4">
      <div style="display: none !important" class="col-12 d-flex justify-content-start">
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
          class="btn btn-warning me-2 "
          @click="dialogLimpar=true"
        >
          Limpar Tudo
        </button>
      
          <button v-if="roteiroData.Roteiro!=null" class="btn btn-danger" @click="downloadPdf"> Baixar como pdf </button>
        
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-12 roteiro-container bg-white">
        
        <!-- Render each item after parsing with marked -->
         <div v-if="roteiroData.Roteiro!=null">
          
          <div  id="pdf-content" v-html="roteiroData.Roteiro.Roteiro" class="roteiro-item"></div>
          
          <div class="col-md-12 d-flex align-items-start">
            <span class="fw-bold pl-4">
                Como foi o roteiro gerado?
            </span>
          </div>
          <div class="col-start-12 d-flex">
            <div class="col-md-12 pb-2 pr-36">
              <v-rating
                v-model="starValue"
                background-color="blue-grey lighten-2"
                color="amber"
                dense
                style="float: left;"
              ></v-rating>
              <button class="btn btn-secondary" @click="sendRating"> Enviar </button>
            </div>
          </div>
          <div class="col-start-12 d-flex">
            <div class="pl-4 pb-6" style="width:100%" v-show="starValue<=3 && starValue != null">
              <textarea class="razoes_avalicao form-control" v-model="whyCardComentario" placeholder="Quais as razões para essa avaliação?"></textarea>
            </div>
            
          </div>
          </div>
      </div>
    </div>
    <Loading :loading="isLoading"/>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Atenção</v-card-title>
        <v-card-text>O campo: {{ errMsg }} é obrigatório!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="[#78c0d6]" text @click="dialog=false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogLimpar" max-width="500px">
      <v-card>
        <v-card-title class="headline">Atenção</v-card-title>
        <v-card-text>Deseja mesmo limpar tudo?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="[#78c0d6]" text @click="resetData">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


  
<script setup>
  import { ref, onMounted, watch, computed, onUpdated,nextTick  } from 'vue'
  import VueDatePicker from '@vuepic/vue-datepicker';
  import VueSelect from 'vue-select';
  import axios from 'axios';
  import moment from 'moment';
  import Loading from './Loading.vue';
  import { marked } from 'marked';
  import html2pdf from 'html2pdf.js';


  const date = ref(new Date());
  const numAdults = ref()
  const numChildren = ref();
  //const childAges = ref([]);
  const currentIndex = ref(0);
  const isLoading=ref(false)
  const showOrigem=ref(false)
  const showDestino=ref(false)
  const dialog=ref(false)
  const inputOrigem = ref(null);
  const inputDestino = ref(null);
  const OrigemCity=ref(null)
  const DestinoCity=ref(null)
  const lugaresConhecerFullNames=ref([])
  const lugaresNaoIrFullNames=ref([])
  const lugaresDestinosFullNames=ref([])
  const inChecked = ref([])
  const meio_transporte = ref()
  const hospedagemSelecionada=ref()
  const starValue=ref(null)
  const dialogLimpar=ref(false)
  const whyCardComentario=ref('')
  const errMsg=ref('')
  const FinalDate=ref(null);
  const periodo_viagem=ref(null);
  const user=JSON.parse(localStorage.getItem('user'));
  let childAges=[]
  let transporteOptions=['Aéreo','Marítimo','Meios Próprios (não gerar)','Rodoviário', 'Trens','Veículos de Aluguel']
  let opc=['Sim','Não']
  let interesses=['Compras', 'Cidades Históricas', 'Cultura Local', 'Diversão Noturna','Ecoturismo', 'Esportes',  'Gastronomia', 'Museus',  'Parques de Diversão']
  let selectedInteresses=[]
  let lugares=['Alto luxo','Hostel', 'Pousadas','Resorts', 'Só pra dormir (3 estrelas)']
  let Destinos=[]
  let Origem
  let lugar_nIr=[]
  let lugar_Conhecer=[]
  let roteiroData = {Roteiro:null,}
  let opcaoGerar = 'Sim'
  let location1;
  let location2;
  let location3;
  let location4;
  let lang = null;

  watch(date, (newValue) => {
    transformDates(newValue, periodo_viagem.value)
  console.log('Date updated:', newValue);
});

  onMounted(() => {

    
  const initAutocomplete = (elementId, types) => {
    const input = document.getElementById(elementId);
    const autocomplete = new google.maps.places.Autocomplete(input, { types });

    autocomplete.addListener('place_changed', () => {

      const place = autocomplete.getPlace();
      if (!place.geometry) {
      console.log('No details available for input: ' + input.value);
      return;
    }
      console.log(place.name); // Handle the place name as needed
      console.log(place)

      if(elementId=='autocompleteQ'){
        if(lugaresConhecerFullNames.value.length+1>5){
          alert('O número máximo de lugares é 5')
        } else{
          lugaresConhecerFullNames.value.push(document.getElementById('autocompleteQ').value)
          console.log(lugaresConhecerFullNames.value)
          lugar_Conhecer.push(place.name)
        }
      }
      if(elementId=='autocompleteN'){
        if(lugaresNaoIrFullNames.value.length+1>5){
          alert('O número máximo de lugares é 5')
        } else {
          lugaresNaoIrFullNames.value.push(document.getElementById('autocompleteN').value)
          console.log(lugaresNaoIrFullNames.value)
          lugar_nIr.push(place.name)
        }
      }
      if(elementId=='autocompleteO'){
        console.log("a");
        Origem=place.name
        OrigemCity.value=place.name
        showOrigem.value=false
      }
      if(elementId=='autocompleteD'){
        console.log("b");
        if(lugaresDestinosFullNames.value.length+1>5){
          showDestino.value=false;
          alert('O número máximo de lugares é 5')
        }else{
          console.log("c");
          Destinos.push(place.name)
          DestinoCity.value=place.name
          lugaresDestinosFullNames.value.push(place.name)
          showDestino.value=false
        }
      }
    });
  };
  console.log(user)
  initAutocomplete('autocompleteQ', ['point_of_interest', 'country', 'continent','locality']);
  initAutocomplete('autocompleteN', ['point_of_interest', 'country', 'continent','locality']);
  initAutocomplete('autocompleteO', ['(cities)']);
  initAutocomplete('autocompleteD', ['locality', 'country', 'continent']);
  
  document.getElementById("autocompleteO").focus();

});

  onUpdated(()=> {
    if (showOrigem.value) {
      nextTick(() => {
        inputOrigem.value.focus();
      });
    }
    if (showDestino.value) {
      nextTick(() => {
        inputDestino.value.focus();
      });
    }
  })

  const setOrigem = () =>{
    showOrigem.value=true
  }
  const setDestino = () =>{
    showDestino.value=true;
  }
  
  const refreshPage = () => {
    window.location.reload();
  };
  
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
      //numChildren.value = parseInt(formattedChildren.value) || 0;
      console.log(numChildren.value)
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
        if(date&&periodo_viagem){
          console.log('initdate',initialDateStr, 'numdays', numberOfDays)
          const initialDate = moment(date.value);
          console.log(initialDate)
          const endDate = initialDate.clone().add(periodo_viagem.value, 'days');
          console.log(endDate)
          const formattedEndDate = endDate.format('DD/MM/YYYY');
          FinalDate.value= `${formattedEndDate}`;
          console.log(FinalDate.value)
        }
      }
      function transformDate(initialDateStr) {
        if(!initialDateStr){
          dialog.value = true;
          isLoading.value = false; 
          errMsg.value='Data de início'
        } else {
          const initialDate = moment(initialDateStr);
          const formattedStartDate = initialDate.format('DD/MM/YYYY');
          console.log(formattedStartDate)
          return `${formattedStartDate}`;
        }
      }

const postRoteiro=async () =>{
  starValue.value=null;
  whyCardComentario.value='';
  lang = localStorage.getItem('lang')
  isLoading.value=true
  let ObjRoteiro1={
    email:user.Email,
    origem:Origem,
    destino: Destinos,
    dias:periodo_viagem.value,
    data_inicio: transformDate(date.value),
    qtd_adultos: numAdults.value,
    qtd_menores: numChildren.value ? numChildren.value : 0,
    idade_menores: childAges,
    interesses: selectedInteresses,
    quero_conhecer: lugar_Conhecer,
    nao_incluir: lugar_nIr,
    meio_transporte: meio_transporte.value == 'Meios Próprios (não gerar)' ? 'N' : meio_transporte.value,
    tipo_hospedagem:hospedagemSelecionada.value,
    desc_detalhada:opcaoGerar=='Sim' ? 'S' : opcaoGerar=='Não' ? 'N' : 'S',
    idioma: lang ? lang : "pt",
    ip_origem: user.ip_origem
  }
  console.log(date.value)
  
  console.log(ObjRoteiro1)
/*   if(!ObjRoteiro1.origem || !ObjRoteiro1.destino || !ObjRoteiro1.dias || !ObjRoteiro1.data_inicio || !ObjRoteiro1.qtd_adultos){
    dialog.value = true;
    isLoading.value = false; 
  }else */ 
  if(!ObjRoteiro1.origem){
    dialog.value = true;
    isLoading.value = false; 
    errMsg.value='Ponto de Origem'
  }
  else if(!ObjRoteiro1.destino){
    dialog.value = true;
    isLoading.value = false;
    errMsg.value='Destino' 
  }
  else if(!ObjRoteiro1.dias){
    dialog.value = true;
    isLoading.value = false; 
    errMsg.value='Quantidade de dias'
  }
  else if(!ObjRoteiro1.qtd_adultos){
    dialog.value = true;
    isLoading.value = false; 
    errMsg.value='Adultos'
  }

  else{
    try {
      const response = await axios.post('https://mytripntour-lm7edjmduq-uc.a.run.app/', ObjRoteiro1)
      console.log(response.data)
      localStorage.setItem('roteiro', JSON.stringify(response.data));
      roteiroData.Roteiro=response.data
      console.log(ObjRoteiro1.origem);
      document.getElementById("autocompleteO").value = ObjRoteiro1.origem;
    } catch (error) {
      alert('Erro ao Gerar Roteiro')
    }
    finally {
      isLoading.value = false; 
    }
  }
  
}

var iframe = document.querySelector('iframe.skiptranslate');
    if (iframe) {
        iframe.style.display = 'none';
    }

const sendRating = async () =>{
  try {
    let ObjRoteiro1={
    email:user.Email,
    origem:Origem,
    destino: Destinos,
    dias:periodo_viagem.value,
    data_inicio: transformDate(date.value),
    qtd_adultos: numAdults.value,
    qtd_menores: numChildren.value ? numChildren.value : 0,
    idade_menores: childAges,
    interesses: selectedInteresses,
    quero_conhecer: lugar_Conhecer,
    nao_incluir: lugar_nIr,
    meio_transporte: meio_transporte.value == 'Meios Próprios (não gerar)' ? 'N' : meio_transporte.value,
    tipo_hospedagem:hospedagemSelecionada.value,
    idioma: lang ? lang : "PT-BR",
    ip_origem: user.ip_origem,
    txt_Roteiro:roteiroData.Roteiro.Roteiro,
    qtd_estrelas:starValue.value,
    txt_comentario:whyCardComentario.value,
  }
  if(!starValue.value){
    alert('Preencha a avaliação primeiro')
  }else if(starValue.value<=3 && !whyCardComentario.value){
    alert('Você deve preencher as razões')
  }else if(whyCardComentario.value.length<=35){
    alert('Motivo deve ser maior do que 35 caracteres')
  }else{
    const response = await axios.post('https://mtt-stars-667280034337.us-central1.run.app/', ObjRoteiro1)
    console.log(response.data);
    alert("Obrigado por nos informar. Já estamos trabalhar para melhorar!!!");
  }
  } catch (error) {
    console.log(error)
  }
}
function parseMarkdown(text) {
  console.log('parseText ', text)
  return marked(text);
}
const customFormat = (date) => {
  return date ? moment(date).format('DD/MM/YYYY') : '';
};
    const removePlace = (index) => {
      lugar_Conhecer.splice(index, 1);
      lugaresConhecerFullNames.value.splice(index, 1)
    };
    const removePlaceNir = (index) => {
      lugar_nIr.splice(index, 1);
      lugaresNaoIrFullNames.value.splice(index, 1)
    };
    const removePlaceDestino = (index) => {
      Destinos.splice(index, 1);
      lugaresDestinosFullNames.value.splice(index, 1)
      console.log(Destinos)
      console.log(lugaresDestinosFullNames.value)
    };
    const pushInteresses = (event, interest) =>{
      if(event.target.checked){
        selectedInteresses.push(interest)
      }else{
        selectedInteresses = selectedInteresses.filter(item => item !== interest);
      }
    }

    function handleSelect2(){
      location2 = '';
      
    }
    function handleSelect3(){
      location3 = '';
      
    }
    function handleSelect4(){
      location4 = '';
      
    }
    const resetData = () => {
      // Reset form fields and variables
      dialogLimpar.value=false
      numAdults.value = 0;
      numChildren.value = 0;
      childAges = [];
      currentIndex.value = 0;
      showOrigem.value = false;
      showDestino.value = false;
      OrigemCity.value = null;
      DestinoCity.value = null;
      lugaresConhecerFullNames.value = [];
      lugaresNaoIrFullNames.value = [];
      lugaresDestinosFullNames.value = [];
      while(lugaresDestinosFullNames.length) {
        lugaresDestinosFullNames.pop();
      }
      while(Destinos.length) {
        Destinos.pop();
      }
      console.log(Destinos)
      console.log(lugaresDestinosFullNames.value)
      while(lugaresConhecerFullNames.length) {
        lugaresConhecerFullNames.pop();
      }
      inChecked.value=[]
      location = '';
      periodo_viagem.value = null;
      date.value = null;
      meio_transporte.value = null;
      hospedagemSelecionada.value = null;
      roteiroData = { Roteiro: null };
      opcaoGerar = 'Sim';
      selectedInteresses = [];
      lugar_nIr = [];
      lugar_Conhecer = [];
      console.log(selectedInteresses)
    };

    const downloadPdf = () => {
      const element = document.getElementById('pdf-content'); 
      const opt = {
        margin:       1,
        filename:     'MyTripNTour_Roteiro.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().from(element).set(opt).save();
    }

    const handleDate=()=>{

    }
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
.selected-places {
  max-height: 100px; /* Adjust height as needed */
  overflow-y: auto; /* Make the div scrollable */
}
.selected-placesDestino {
  max-height: 40%; /* Adjust height as needed */
  overflow-y: auto; /* Make the div scrollable */
  display: flex; /* Make items inline */
  flex-wrap: wrap; /* Wrap items to the next line if they exceed the container width */
  gap: 10px; /* Add space between items */
  align-items: center; /* Align items vertically center */
}
.place-item {
  display: block; /* Ensure each place is on its own line */
  padding: 5px 0; /* Add some spacing between each line */
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
 
/* Reset de CSS para inputs de formulário */
input[type="radio"],
input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: initial;
    border-style: none;
    color: inherit;
    box-sizing: border-box;
    border: 2px solid #cccccc;
    cursor: pointer;
    position: relative;
    transition: background 0.3s ease;
    display: inline-block;
    width: 15px;
    height: 15px;
}
input[type="radio"]{
  border-radius: 50%;
}
input[type="checkbox"]:checked{
  background-color: black;
    border-color:black
}
input[type="radio"]:checked{
  background-color: black;
    border-color:black
}
iframe.skiptranslate {
    display: none;
    visibility: hidden;
}
div#google_translate_element {
    display: none;
}
html{
  background-color: #fdf8fd;
}
.goog-te-banner-frame.skiptranslate {
    display: none !important;
}

body {
    top: 0px !important;
}
#autocompleteQ, #autocompleteN{
  border: var(--bs-border-width) solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
}
.child-age {
  width: 4rem; /* Adjust width as necessary */
  flex: 0 0 auto; 
}
.child-container {
  display: flex;
  overflow-x: auto; /* Allow horizontal scrolling */
  white-space: nowrap; /* Prevent wrapping */
  gap: 10px; /* Optional: Add space between inputs */
}
</style>
  