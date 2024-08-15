<template>
    <div class="flex-1 flex-col items-center w-full h-full" style="margin-left: 16rem">
      <div class="flex space-x-4 mb-8 w-full" style="margin-left: 22rem">
        <div class="bg-yellow-100 p-4 ml-4 rounded-lg shadow-md flex-grow max-w-lg w-full place-content-start">
          <h2 class="text-lg font-bold mb-2">Ponto de Origem</h2>
          
          <div id="autocomplete-origin" class="autocomplete-container w-full"></div>
        </div>
        <div class="main-box bg-[#cfedfe]">
          <h2 class="text-lg font-bold mb-2">Destino(s)</h2>
            <div id="autocomplete-destination" class="autocomplete-container w-full"></div>
          
          <div class="flex justify-end mt-4">
            <!-- <button class="rounded-full bg-white w-6 mr-2" @click="">
              <i class="fas fa-plus"></i>
            </button> -->
          </div>
        </div>
      </div>
      <div class="flex w-full space-x-4 mb-8">
    <div class="card flex flex-col items-start mb-2">
      <h2 class="text-lg font-bold mb-2">Tempo de viagem</h2>
      <!-- <p class="text-4xl font-bold">Guaxupé</p> -->
      <div class="flex items-center space-x-2">
      <input type="text" class="text-4xl font-bold w-10"placeholder="00" v-model="periodo_viagem"/>
      <span class="text-4xl font-bold">dias</span>
      </div>
      <span class="mt-2 text-blue-500">Data de inicio</span>
      
      <VueDatePicker 
        v-model="date"
        locale="pt"
        class="mt-2"
        :enable-time-picker="false"
      ></VueDatePicker>
    </div>
  <div class="flex space-x-8"> <!-- Flex container for Pessoas and child ages boxes -->
    <!-- Pessoas Box -->
    <div class="card flex flex-col items-start mb-2">
      <h2 class="text-lg font-bold mb-2">Pessoas</h2>
      <div class="flex items-center space-x-2 mb-8">
        <input 
          type="text" 
          class="text-4xl font-bold w-10" 
          placeholder="00" 
          v-model="numAdults"
        />
        <span class="text-4xl font-bold">Adultos</span>
      </div>
      <div class="flex items-center space-x-2">
        <input 
          type="text" 
          class="text-4xl font-bold w-10" 
          placeholder="00"  
          v-model="formattedChildren"
          @input="formatChildren"
        />
        <span class="text-4xl font-bold">Crianças</span>
      </div>
    </div>

    <!-- Child Ages Box -->
    <div v-if="numChildren > 0" class="flex items-center space-x-2 mb-2 card">
      <button 
        @click="prevChild" 
        :disabled="currentIndex === 0" 
        class="px-4 py-2 bg-gray-300 rounded"
      >
        &lt;
      </button>
      
      <div class="flex items-center space-x-2">
        <span class="text-2xl font-bold mt-1 w-32">
          Criança {{ currentIndex + 1 }}:
        </span>
        <input 
          type="text" 
          class="text-2xl font-bold w-16 mt-1" 
          placeholder="Idade" 
          v-model.number="childAges[currentIndex]"
        />
      </div>

      <button 
        @click="nextChild" 
        :disabled="currentIndex === numChildren - 1" 
        class="px-4 py-2 bg-gray-300 rounded"
      >
        &gt;
      </button>
    </div>
  </div>
    </div>
    <div class="flex w-full space-x-4">
      <div class="card flex flex-col items-start mb-2">
      <h2 class="text-lg font-bold mb-2">Meio de Transporte</h2>
      <VueSelect :options="transporteOptions" class="w-32" v-model="meio_transporte"></VueSelect>
    </div>
      <div class="card flex flex-col items-start mb-2">
      <h2 class="text-lg font-bold mb-2">Moeda preferida</h2>
      <VueSelect :options="Moedas" class="w-32"></VueSelect>
    </div>
    
    </div>
    <div class="flex w-full space-x-4 mb-4">
      <div class="card">
    <h3>Lista de interesses:</h3>
    <div 
      v-for="(interest, index) in interesses" 
      :key="index" 
      class="interest-item"
    >
      <label>
        <input type="checkbox" :name="interest" :value="interest" />
        <span class="interest-label ml-2">{{ interest }}</span>
      </label>
    </div>
  </div>
        <div class="main-box bg-white">
          <h2 class="text-lg font-bold mb-2">Quero Conhecer</h2>
          <div id="autocomplete-conhecer" class="autocomplete-container w-full"></div>
        </div>
        <div class="main-box bg-white">
          <h2 class="text-lg font-bold mb-2">Não Quero Ir</h2>
          <div id="autocomplete-nir" class="autocomplete-container minimal round-borders w-full"></div>
        </div>
    </div>
    <div class="flex w-full space-x-4 ml-4">
    <input 
      type="button" 
      value="Enviar"
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded" 
      @click="postRoteiro"
    />
    <input 
      type="button" 
      value="Apagar"
      class="bg-red-500 text-white font-bold py-2 px-4 rounded" 
    />
  </div>
  <Loading :loading="isLoading"/>
    </div>
    
</template>
  
<script setup>
  import { ref, onMounted, watch,computed } from 'vue'
  import VueDatePicker from '@vuepic/vue-datepicker';
  import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
  import VueSelect from 'vue-select';
  import { Carousel, Navigation, Slide, Pagination } from 'vue3-carousel'
  import 'vue3-carousel/dist/carousel.css'
  import "@geoapify/geocoder-autocomplete/styles/minimal.css";
  import router from '../routes';
  import axios from 'axios';
  import moment from 'moment';
  import Loading from './Loading.vue';

  const date = ref();
  const numAdults = ref()
  const numChildren = ref();
  //const childAges = ref([]);
  const currentIndex = ref(0);
  const isLoading=ref(false)
  let childAges=[]
  let transporteOptions=['Carro','Ônibus','Moto','Avião']
  let interesses=['Compras','Cultura Local','Esporte','Natureza']
  let Moedas=['Dolar','Real','Euro']
  let Destinos=[]
  let Origem
  let periodo_viagem
  let lugar_nIr=[]
  let lugar_Conhecer=[]
  let meio_transporte
  let ObjRoteiro={
    cidade_origem:'',
    destinos:[{cidade_destino: "Rio de Janeiro",
            periodo_viagem: "2024-08-10 a 2024-08-20",
            quantidade_adultos: 2,
            quantidade_criancas: 2,
            idades_criancas: [8, 12],
            locais_interesse: ["Cristo Redentor", "Pão de Açúcar", "Copacabana"],
            lugar_nao_quer_conhecer: ["Museu de Arte Moderna"],
            meio_transporte: "Avião"}]
  }

  onMounted(() => {
    const autocompleteElementOrigin = document.getElementById('autocomplete-origin');
  if (autocompleteElementOrigin) {
    const autocompleteOrigin = new GeocoderAutocomplete(
      autocompleteElementOrigin,
      'f1b2e9cbd43d4c0bbd85d576804e3f0e',
      { lang: 'pt',
      placeholder:'Digite um Lugar'
       }
    );
    
    autocompleteOrigin.on('select', (location) => {
      Origem=location.properties.city;
      ObjRoteiro.cidade_origem=Origem
    });

    autocompleteOrigin.on('suggestions', (suggestions) => {
    });
  }
  
  const autocompleteElementDestination = document.getElementById('autocomplete-destination');
  if (autocompleteElementDestination) {
    const autocompleteDestination = new GeocoderAutocomplete(
      autocompleteElementDestination,
      'f1b2e9cbd43d4c0bbd85d576804e3f0e',
      { lang: 'pt',
      placeholder:'Digite um Lugar'
       }
    );
    
    autocompleteDestination.on('select', (location) => {
      Destinos.push(location.properties.city);
    });

    autocompleteDestination.on('suggestions', (suggestions) => {
    });
  }
  const autocompleteElementConhecer = document.getElementById('autocomplete-conhecer');
  if (autocompleteElementConhecer) {
    const autocompleteConhecer = new GeocoderAutocomplete(
      autocompleteElementConhecer,
      'f1b2e9cbd43d4c0bbd85d576804e3f0e',
      { lang: 'pt',
      placeholder:'Digite um Lugar'
       }
    );
    
    autocompleteConhecer.on('select', (location) => {
      lugar_Conhecer.push(location.properties.city);
    });

    autocompleteConhecer.on('suggestions', (suggestions) => {
    });
  }
  const autocompleteElementNir = document.getElementById('autocomplete-nir');
  if (autocompleteElementNir) {
    const autocompleteNir = new GeocoderAutocomplete(
      autocompleteElementNir,
      'f1b2e9cbd43d4c0bbd85d576804e3f0e',
      { lang: 'pt',
      placeholder:'Digite um Lugar'
       }
    );
    
    autocompleteNir.on('select', (location) => {
      lugar_nIr.push(location.properties.city);
    });

    autocompleteNir.on('suggestions', (suggestions) => {
    });
  }
});
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
function formatAdults() {
  if (numAdults.value.length === 1) {
    numAdults.value = '0' + numAdults.value; 
  } else if (numAdults.value.length === 0) {
    numAdults.value = '00'; 
  }
}

const formattedAdults = computed({
  get() {
    return numAdults.value;
  },
  set(value) {
    numAdults.value = value.replace(/\D/g, '').padStart(2, '0').slice(-2);
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

const postRoteiro=async () =>{
  isLoading.value=true
  let ObjRoteiro={
    cidade_origem:Origem,
    destinos:[{cidade_destino: Destinos[0],
            periodo_viagem: transformDates(date.value, periodo_viagem),
            quantidade_adultos: numAdults.value,
            quantidade_criancas: numChildren.value,
            idades_criancas: childAges,
            locais_interesse: lugar_Conhecer,
            lugar_nao_quer_conhecer: lugar_nIr,
            meio_transporte: meio_transporte}]
  }
  
  console.log(ObjRoteiro)
  try {
    const response = await axios.post('https://mytipntourapi-gxf2gkfjfmcuaegv.eastus-01.azurewebsites.net/gerar_roteiro', ObjRoteiro)
    console.log(response.data)
    localStorage.setItem('roteiro', JSON.stringify(response.data));
    router.push('/mytrip/roteiro');
  } catch (error) {
    alert('Erro ao Gerar Roteiro')
  }
  finally {
    isLoading.value = false; 
  }
}
</script>
<style scoped>
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

</style>
  