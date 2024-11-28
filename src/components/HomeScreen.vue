<template>
  <div  class="container-fluid px-3 px-md-5 scrollable-container"> <!-- Adjust padding for different screen sizes -->
    <div v-if="!isLargeScreen" class="button-group d-flex flex-wrap align-items-center">
        <button 
        type="button" 
        class="bg-[#78c0d6] text-white px-4 py-2 rounded-lg hover:bg-[#5ba8bd] focus:outline-none focus:ring-2 focus:ring-[#78c0d6] me-2" 
        @click="postRoteiro"
        >
        {{traducao.GerarPDF}}
        </button>
        <button 
        type="button" 
        class="bg-[#ffc109] text-white px-4 py-2 rounded-lg hover:bg-[#e0a607] focus:outline-none focus:ring-2 focus:ring-[#78c0d6] me-2" 
        @click="dialogLimpar=true"
        >
        {{ traducao.Limpar }}
        </button>
        <div v-show="showPdf==true"  class="items-start text-start" >
          <button class="btn btn-danger" @click="triggerFunctionPDF">  {{ traducao.GerarPDF }}  <i>({{ user.vlrpdf }} {{ traducao.Creditos }})</i> </button>
      </div>
    </div>
    <div class="p-3 bg-[#d9e9e0] w-full h-full rounded-lg mb-2">  <!-- começo Free -->
      <div class="flex justify-start items-start">
          <span class="h5 text-left"><b>{{traducao.Free}}</b></span> 
        </div>
    <div class="row mb-4">
      <div class="col-12 col-md-6 mb-3 mb-md-0">
        <div class="p-4 rounded-lg shadow-md h-44" style="background-color: #FEECCF;">
          <div class="d-flex align-items-center justify-content-between">
              <h2 class="h3 fw-bold text-left">
                {{ traducao.CidadeO }}
                <i 
                  class="bi bi-question-circle-fill mr-2"
                  data-toggle="tooltip" 
                  data-placement="top"
                  v-tooltip.top="{ value: traducao.Tooltip1, escape: false }"
                ></i>
              </h2>
            </div>
            <button v-show="!showOrigem" class="fw-bold float-start" style="font-size:1.8rem" @click="setOrigem">{{ OrigemCity ? OrigemCity : traducao.SelectOrigem }}</button>
            <button v-show="!showOrigem" class="fw-bold float-start pt-[0.30rem] pl-1" style="font-size:1.2rem" @click="setOrigem"><i class="fa-solid fa-pencil"></i></button>
            <div v-show="showOrigem">
                <input ref="inputOrigem" id="autocompleteO" type="text" :placeholder="traducao.Origem" class="w-full h-10 bg-white rounded-lg" v-model="OrigemCity" style="padding-left: 10px; padding-right: 10px;margin-top: 39px;">
              </div>
            <!-- <vue-google-autocomplete id="map" types="(cities)" classname="form-control" placeholder="Origem" v-on:placechanged="handlePlaceOrigem">
            </vue-google-autocomplete> -->
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="p-4 rounded-lg shadow-md h-44" style="background-color: #CFEDFE;">
          <div class="d-flex align-items-center justify-content-between">
              <h2 class="h3 fw-bold  text-left">
                {{ traducao.Destino  }}
                <i 
                  class="bi bi-question-circle-fill mr-2"
                  data-toggle="tooltip" 
                  data-placement="top"
                  v-tooltip.top="{ value: traducao.Tooltip2, escape: false }"
                ></i>
              </h2>
          </div>
          <button v-show="!showDestino" class="fw-bold float-start" style="font-size:1.8rem" @click="setDestino">{{ DestinoCity ? DestinoCity : traducao.SelectDestino }}</button>
          <button v-show="!showDestino" class="fw-bold float-start pt-[0.30rem] pl-1" style="font-size:1.2rem" @click="setDestino"><i class="fa-solid fa-pencil"></i></button>
              <div v-show="showDestino">
                <input ref="inputDestino" id="autocompleteD" type="text" :placeholder="traducao.Destino" class="w-full h-10 bg-white rounded-lg" v-model="DestinoCity" style="padding-left: 10px; padding-right: 10px;margin-top: 39px;">
              </div>
        </div>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-12 col-md-6 mb-3 md:mb-0">
        <div class="p-3 bg-white" style="border-radius: 8px;">
          <div class="d-flex align-items-center justify-content-center position-relative">
            <h2 class="h5 fw-bold ">{{ traducao.Duration }}</h2>
            <i 
              class="bi bi-question-circle-fill mb-2 pl-1"
              data-toggle="tooltip" 
              data-placement="top"
              v-tooltip.top="{ value: traducao.Tooltip3, escape: false }"
            ></i>
          </div>
          <div class="d-flex flex-wrap align-items-center">
            <!-- Travel duration input -->
            <div class="me-2 " style="flex: 1 1">
              <input 
                type="number" 
                class="form-control w-5" 
                placeholder="0" 
                v-model="periodo_viagem"
                min="0"
                @change="transformDates(date, periodo_viagem)"
                style="font-size: 0.9rem;"
              />
            </div>
            <div class="fw-bold me-2 textosDuracao">{{ traducao.Dias }}</div>
            <div class="me-2" style="">
              <VueDatePicker 
                v-model="date"
                locale="pt-BR"
                :enable-time-picker="false"
                :format="customFormat"
                auto-apply
                :min-date="new Date()"
                :hide-input-icon="true"
                @date-update="transformDates(date, periodo_viagem)"
                week-start="0"
                class="small-datepicker"
              />
            </div>
            <div class="fw-bold me-2 textosDuracao">{{ traducao.retrn }}</div>
            <div v-if="date && periodo_viagem">
              <span class="fw-bold">{{ FinalDate }}</span>
            </div>
          </div>
        </div>
      </div>
      
    
      <div class="col-12 col-md-6 mb-3 mb-md-0">
        <div class="p-3 bg-white" style="border-radius: 8px;">
          <div class="d-flex align-items-center justify-content-center position-relative">
            <h2 class="h5 fw-bold ">{{ traducao.Pessoas }}</h2>
            <i 
                  class="bi bi-question-circle-fill mb-2 pl-1"
                  data-toggle="tooltip" 
                  data-placement="top"
                  v-tooltip.top="{ value: traducao.Tooltip4, escape: false }"
                ></i>
          </div>
        <div class="row align-items-center">

          <div class="d-flex align-items-center mt-2">
            <div class="me-2">
            <input 
              type="number" 
              class="form-control" 
              placeholder="0" 
              v-model.number="numAdults"
              min="0"
              style="width: 4rem;"
            />
          </div>
          <div class="fw-bold textosDuracao me-3">{{ traducao.Adultos }}</div>
            <div class="me-2">
            <input 
              type="number" 
              class="form-control" 
              placeholder="0"  
              v-model="numChildren"
              @input="formatChildren"
              min="0"
              max="5"
              style="width: 4rem;"
            />
          </div>
          <div class="fw-bold textosDuracao">{{ traducao.Menores }}</div>
          <div class=" mt-2">
            <div class=" ms-auto">
              <div class="d-flex flex-wrap space-x-4">
              <span v-if="numChildren > 0" class="fw-bold textosDuracao mt-1 pl-4">{{ traducao.CidadesDe }}</span>
              <div 
                v-for="(age, index) in numChildren" 
                :key="index" 
              >
                <input 
                  type="number" 
                  class="form-control" 
                  :placeholder="`Idade ${index + 1}`" 
                  v-model.number="childAges[index]"
                  @input="formatAges(index)"
                  min="0"
                  max="17"
                  style="width: 4rem;"
                />
              </div>
            </div>
            </div>
          </div>
          </div>

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
    </div> <!-- Fim Free -->
    <div id="form-premium" class="content-premium">  <!--  Começo Premium -->
      <div class="p-3 bg-[#33cee9] w-full h-full rounded-lg mb-2"> 
        <div class="flex justify-start items-start">
          <span class="h5 text-left"><b>{{ traducao.Premium }} <i style="font-style: italic;
            font-family: 'Roboto', sans-serif;">{{ traducao.Opcional }}</i> {{ user.vlrpesquisa }} {{ traducao.CreditoSingular }}</b> </span> 
        </div>
        
        <div class="row mb-4">
          <div class="col-6 col-md-6">
            <div class="p-4 rounded-lg shadow-md w-full h-24" style="background-color: #ffff;">
              <div class="d-flex  position-relative">
                <h2 class="sm:h4 mr-4 fw-bold mt-[0.7rem] text-base">
                    {{ traducao.MultDestinos  }}
                    <i 
                      class="bi bi-question-circle-fill mb-2 mt-[0.7rem]"
                      data-toggle="tooltip" 
                      data-placement="top"
                      v-tooltip.top="{ value: traducao.Tooltip9, escape: false }"
                    ></i>
                </h2>
                    <input ref="inputDestinoMult" id="autocompleteDMult" type="text" :placeholder="traducao.Destino" class="h-10 pt-1 bg-white rounded-lg" v-model="location2" @change="handleSelect2()" style="padding-left: 10px; padding-right: 10px;">
                    <div class="selected-placesDestino">
                  <div v-for="(place, index) in lugaresDestinosFullNames" :key="index">
                      <span class=" text-black fw-bold" style="font-size: 1.3rem;">
                        {{ place }};
                    </span>
                    <button @click="removePlaceDestino(index)" class="btn-sm ms-2"><i class="fa-solid fa-trash"></i></button>
                  </div>
                </div>
              </div>
                
            </div>
          </div>
          <div class="col-6 col-md-6">
            <div class="p-4 rounded-lg shadow-md w-full h-24" style="background-color: #ffff; display: flex; align-items: center; justify-content: flex-start;">
              <div class="d-flex  position-relative">
                <span class="mr-1"><b>{{traducao.Custo}}:</b></span> <span class="me-2 ">{{ traducao.DetalheCusto }}</span><input type="checkbox" name="custos_detalhe" class="me-2 mt-1 custom-checkbox" v-model="custos_detalhe" />
              </div>
            </div>
          </div>
        </div>
      <div class="row mb-4">
        <div class="col-12 col-md-4 mb-md-0 max-[500px]:mb-4">
          <div class="p-3 bg-white" style="border-radius: 8px;">
            <div class="d-flex align-items-center justify-content-center position-relative" >
              <h2 class="h5 fw-bold ">{{ traducao.Hospedagem }}</h2>
              <i 
                    class="bi bi-question-circle-fill mb-2 pl-1"
                    data-toggle="tooltip" 
                    data-placement="top"
                    v-tooltip.top="{ value: traducao.Tooltip5, escape: false }"
                  ></i>
            </div>
            <div class="d-flex flex-wrap">
              <div 
              v-for="(modo, index) in lugares" 
              :key="index" 
              class="d-inline-flex mb-2 text-start 2xl:w-[33.33%] w-[50%] text-sm"
              style=""
            >
              <label class="d-flex ml-2">
                <input type="radio" :name="lugares" :value="modo" class="me-2" v-model="hospedagemSelecionada" @click="toggleSelect(modo)"/>
                <span>{{ modo }}</span>
              </label>
            </div>
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
        
        <div class="col-12 col-md-4  mb-md-0 max-[500px]:mb-4">
          <div class="bg-white p-3 rounded-lg">
            <div class="d-flex align-items-center justify-content-center position-relative">
              <h2 class="h5 fw-bold ">{{ traducao.QConhecer }}</h2>
              <i 
                    class="bi bi-question-circle-fill mb-2 pl-1"
                    data-toggle="tooltip" 
                    data-placement="top"
                    v-tooltip.top="{ value: traducao.Tooltip6, escape: false }"
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
            <input id="autocompleteQ" type="text" :placeholder="traducao.PlaceHolder2" class="w-full h-10" v-model="location3" @change="handleSelect3()" style="padding-left: 10px; padding-right: 10px;">
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
        <div class="col-12 col-md-4 mb-md-0">
          <div class="bg-white p-3 rounded-lg">
            <div class="d-flex align-items-center justify-content-center position-relative">
              <h2 class="h5 fw-bold ">{{ traducao.NaoPrecisa }}</h2>
              <i 
                    class="bi bi-question-circle-fill mb-2 pl-1"
                    data-toggle="tooltip" 
                    data-placement="top"
                    v-tooltip.top="{ value: traducao.Tooltip7, escape: false }"
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
            <input id="autocompleteN" type="text" :placeholder="traducao.PlaceHolder2" class="w-full h-10" v-model="location4" @change="handleSelect4()" style="padding-left: 10px; padding-right: 10px;">
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
      <div class="col-12 col-md-12 pb-3" style="text-align:left">
          <div class="bg-white p-3 rounded-lg">
            <div class="d-flex align-items-center justify-content-center position-relative">
              <h2 class="h5 fw-bold ">{{ traducao.Interesses }}</h2>
              <i 
                    class="bi bi-question-circle-fill mb-2 pl-1"
                    data-toggle="tooltip" 
                    data-placement="top"
                    v-tooltip.top="{ value: traducao.Tooltip8, escape: false }"
                  ></i>
            </div>
            <div class="d-flex flex-wrap align-items-start">
              <div 
              v-for="(interest, index) in interesses" 
              :key="index" 
              class="d-inline-flex text-start mb-2 lg:w-[33.33%] md:w-[50%]"
            >
              <label class="d-flex align-items-center pl-3">
                <input type="checkbox" :name="interest" v-model="inChecked[index]" :value="interest" class="me-2 custom-checkbox" @input="pushInteresses($event,interest)"
                :disabled="!canCheck && !inChecked[index]"
                />
                <span>{{ interest }}</span>
              </label>
            </div>
            </div>
          </div>
          <!-- <div class="bg-white p-3">
            <h2 class="h5 fw-bold mb-2">Moeda preferida</h2>
            <VueSelect :options="Moedas" class="w-100"></VueSelect>
          </div> -->
      </div>
<!--       <div class="items-start text-start" >
        <button v-show="roteiroData.Roteiro!=null" class="btn btn-danger" @click="askModalPDF">  {{ traducao.GerarPDF }}  <i>({{ user.vlrpdf }} {{ traducao.Creditos }})</i> </button>
      </div> -->
      
    </div>
    
    </div> <!--  Fim Premium -->

    <div class="row mb-4 pl-[0.80rem]">
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


      
          
        
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-12 roteiro-container bg-white">
        
        <!-- Render each item after parsing with marked -->
         <div ref="pdfButton" v-if="roteiroData.Roteiro!=null">
          
          <div id="pdf-content"  v-html="roteiroData.Roteiro.Roteiro" class="roteiro-item"></div>
          
          <div class="col-md-12 d-flex align-items-start">
            <span class="pl-4" style="text-align: left;">
              <b>{{ traducao.ComoFoi }}</b><br> {{ traducao.Criticas }}
            </span>
          </div>
          <div class="col-start-12 d-flex">
            <div class="row align-items-center">
            <div class="col-auto">
              <v-rating
                v-model="starValue"
                background-color="blue-grey lighten-2"
                color="amber"
                dense
                class="me-2"
                :disabled="disabledRating==true"
              ></v-rating>
            </div>
            <div class="col-auto">
              <button class="btn btn-primary" @click="sendRating" :disabled="disabledRating==true">{{ traducao.Enviar }}</button>
            </div>
          </div>
          </div>
          <div class="col-start-12 d-flex">
            <div class="pl-4 pb-1" style="width:100%" v-show="starValue != null">
              <textarea class="razoes_avalicao form-control" v-model="whyCardComentario" :placeholder="traducao.PlaceHolder3" :disabled="disabledRating==true"></textarea>
              {{ whyCardComentario.length }}/35
            </div>

          </div>
          <div class="mx-auto">
                    
                </div>
          </div>
      </div>
    </div>


    <Loading :loading="isLoading" :isRoteiro="isRoteiro" :LoadingText1="traducao.Loading1" :LoadingText2="traducao.Loading2"/>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ traducao.Atencao }}</v-card-title>
        <v-card-text>{{ errMsg }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="[#78c0d6]" text @click="dialog=false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogLimpar" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ traducao.Atencao }}</v-card-title>
        <v-card-text>{{traducao.DialogLimpar}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="[#78c0d6]" text @click="resetData">{{ traducao.Sim }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogRating" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ traducao.Atencao }}</v-card-title>
        <v-card-text>{{ RatingText }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="[#78c0d6]" text @click="dialogRating=false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogVlr" max-width="500px">
      <v-card>
        <!-- <v-card-title class="headline">{{ traducao.Atencao }}</v-card-title> -->
        <v-card-text>{{ vlrModalText }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="[#78c0d6]" text @click="dialogVlr=false">{{traducao.Cancelar}}</v-btn>
          <v-btn color="[#78c0d6]" text @click="dialogVlr=false, showModal=true">{{ traducao.Adcionar }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogPDF" max-width="500px">
      <v-card>
        <!-- <v-card-title class="headline">{{ traducao.Atencao }}</v-card-title> -->
        <v-card-text>{{ traducao.NameRoteiro }}</v-card-text>
        <div class="flex justify-center items-center w-[85%] mx-auto">
          <input type="text" class="form-control" :placeholder="traducao.PlaceHolder4" v-model="PDFname">
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="[#78c0d6]" text @click="dialogPDF=false">{{traducao.Cancelar}}</v-btn>
          <v-btn color="[#78c0d6]" text @click="downloadPdf">{{ traducao.GerarBtn }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogConfirm" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ traducao.Atencao }}</v-card-title>
        <v-card-text>{{ traducao.PremiumService1 }} {{ dialogPesqPdf == 'pesquisa' ? parseInt(user.vlrpesquisa) : parseInt(user.vlrpdf) }} {{ traducao.PremiumService2 }}</v-card-text>
        <div class="flex justify-center">
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="[#78c0d6]" text @click="dialogConfirm=false, confirmHandler(false)">{{traducao.Cancelar}}</v-btn>
          <v-btn color="[#78c0d6]" text @click="confirmHandler(true), dialogConfirm=false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogCurrent" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ traducao.Atencao }}</v-card-title>
        <v-card-text>{{traducao.Same}}</v-card-text>
        <div class="flex justify-center">
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="[#78c0d6]" text @click="dialogCurrent=false,confirm=false">{{traducao.Cancelar}}</v-btn>
          <v-btn color="[#78c0d6]" text @click="dialogCurrent=false,confirm=true">{{traducao.Sim}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <compraModal v-if="showModal" :closeModal="closeModal" :traducao="TRoteiro.Sidebar"></compraModal>
  </div>
</template>


  
<script setup>
  import { ref, onMounted, watch, computed, onUpdated,nextTick,onBeforeUnmount   } from 'vue'
  import VueDatePicker from '@vuepic/vue-datepicker';
  import VueSelect from 'vue-select';
  import axios from 'axios';
  import moment from 'moment';
  import Loading from './Loading.vue';
  import { marked, use } from 'marked';
  import html2pdf from 'html2pdf.js';
  import Tooltip from 'primevue/tooltip';
  import compraModal from './compraModal.vue';
  import ptLang from '../data/ptlang';
  import { eventBus } from '../data/eventbus';

  let location = JSON.parse(localStorage.getItem('location'))
  let TRoteiro 
  const traducao = ref(ptLang)
  const date = ref();
  const numAdults = ref()
  const numChildren = ref();
  const childAges = ref([]);
  const currentIndex = ref(0);
  const isLoading=ref(false)
  const showOrigem=ref(false)
  const showDestino=ref(true)
  const dialog=ref(false)
  const inputOrigem = ref(null);
  const inputDestino = ref(null);
  const inputDestinoMult = ref(null);
  const OrigemCity=ref(location.city)
  const DestinoCity=ref(null)
  const lugaresConhecerFullNames=ref([])
  const lugaresNaoIrFullNames=ref([])
  const lugaresDestinosFullNames=ref([])
  const inChecked = ref([])
  const meio_transporte = ref()
  const hospedagemSelecionada=ref()
  const custos_detalhe=ref(false)
  const starValue=ref(null)
  const dialogLimpar=ref(false)
  const whyCardComentario=ref('')
  const errMsg=ref('')
  const FinalDate=ref(null);
  const FinalDatePDF=ref(null);
  const InitDate=ref(null);
  const periodo_viagem=ref(null);
  const isRoteiro=ref(false);
  const selectedCount = computed(() => inChecked.value.filter(Boolean).length);
  const canCheck = computed(() => selectedCount.value < 3);
  const dialogRating = ref(false)
  const RatingText = ref('')
  const disabledRating = ref(false)
  const vlrModalText = ref('')
  const dialogVlr = ref(false)
  const dialogPDF = ref(false)
  const PDFname = ref('')
  const showModal=ref(false)
  const dialogConfirm=ref(false)
  const dialogPesqPdf=ref('')
  const pdf_button = ref(null);
  const dialogCurrent = ref(false)
  const confirm = ref(null)
  let resolveConfirm;
  const interesses = ref(null/* ['Compras', 'Cidades Históricas', 'Cultura Local', 'Diversão Noturna','Ecoturismo', 'Esportes',  'Gastronomia', 'Museus',  'Parques de Diversão'] */)
  const user=JSON.parse(localStorage.getItem('user'));
  const currentRoteiro = ref(null)
  const currentPDF = ref(null)
  //let childAges=[]
  let transporteOptions=['Aéreo','Marítimo','Meios Próprios (não gerar)','Rodoviário', 'Trens','Veículos de Aluguel']
  let opc=['Sim','Não']
  /* let interesses=['Compras', 'Cidades Históricas', 'Cultura Local', 'Diversão Noturna','Ecoturismo', 'Esportes',  'Gastronomia', 'Museus',  'Parques de Diversão'] */
  let selectedInteresses=[]
  let lugares=/* ['Luxo (5★)','Hostel', 'Pousadas','Resorts', 'Só pra dormir (3★)'] */ ref(null)
  let Destinos=[]
  let Origem = location.city
  let lugar_nIr=[]
  let lugar_Conhecer=[]
  const roteiroData = ref({Roteiro:null,})
  let opcaoGerar = 'Sim'
  let location1;
  let location2;
  let location3;
  let location4;
  let lang = null;
  const isLargeScreen = computed(() => window.innerWidth >= 640);

  const handleResize = () => {
    // Force Vue to re-evaluate computed properties on resize
    isLargeScreen.value = window.innerWidth >= 640;
  };

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

  eventBus.on('PostRoteiro', () => {
    postRoteiro();
  });

  eventBus.on('LimparTudo', () => {
    dialogLimpar.value=true
  });

  eventBus.on('GeraPDF', () => {
    askModalPDF();
  });

  const triggerFunctionPDF = () => {
    eventBus.emit('RoteiroAppear');
  };

  const pdfButton = ref(null)

  const closeModal=()=>{
    showModal.value=false
  }
  const confirmSameRoteiro = () => {
  return new Promise((resolve) => {
    watch(confirm, (val) => {
      if (val === true) {
        console.log('Confirm is true:', val);
        resolve(true);
      } else if (val === false) {
        console.log('Confirm is false:', val);
        resolve(false);
      }
    });
  });
};

  watch(date, (newValue) => {
    transformDates(newValue, periodo_viagem.value)
});
  const toggleSelect = (modo) =>{
    if (hospedagemSelecionada.value === modo) {
        hospedagemSelecionada.value = null; 
      }
  }
  const toggleSelectCustos = () => {
  // Toggle the value of the radio button
  if (custos_detalhe.value === 'S') {
    custos_detalhe.value = null; // Uncheck by setting to null
  } else {
    custos_detalhe.value = 'S'; // Set the selected value
  }
};
  const getdata = () =>{
    const queryParams = new URLSearchParams(window.location.search);
    const receivedData = queryParams.get('data');
    if (receivedData) {
      const decodedData = JSON.parse(decodeURIComponent(receivedData));
      hospedagemSelecionada.value=decodedData.hospedagemSelecionada
      lugaresDestinosFullNames.value=decodedData.lugaresDestinosFullNames
      selectedInteresses=decodedData.interesses
      DestinoCity.value=decodedData.lugaresDestinosFullNames.join()
      Destinos=decodedData.lugaresDestinosFullNames.join()
      lugaresConhecerFullNames.value=decodedData.quero_conhecer
      inChecked.value = interesses.value.map(interest => selectedInteresses.includes(interest));
    }
  }

  onMounted(() => {
  const initAutocomplete = (elementId, types) => {
    const input = document.getElementById(elementId);
    const autocomplete = new google.maps.places.Autocomplete(input, { types });
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
      return;
    }
      if(elementId=='autocompleteQ'){
        if(lugaresConhecerFullNames.value.length+1>5){
          alert('O número máximo de lugares é 5')
        } else{
          lugaresConhecerFullNames.value.push(place.name)
          console.log(lugaresConhecerFullNames.value)
          lugar_Conhecer.push(place.name)
        }
      }
      if(elementId=='autocompleteN'){
        if(lugaresNaoIrFullNames.value.length+1>5){
          alert('O número máximo de lugares é 5')
        } else {
          lugaresNaoIrFullNames.value.push(place.name)
          console.log(lugaresNaoIrFullNames.value)
          lugar_nIr.push(place.name)
        }
      }
      if(elementId=='autocompleteO'){
        console.log("a", place);
        Origem=place.formatted_address
        OrigemCity.value=place.name
        showOrigem.value=false
      }
      if(elementId=='autocompleteD'){
        console.log("b");
        if(lugaresDestinosFullNames.value.length+1>1){
          showDestino.value=true;
          alert('O número máximo de lugares no serviço grátis é 1')
        }else{
          console.log("c");
          Destinos[0]=(place.formatted_address)
          DestinoCity.value=place.name
          console.log(DestinoCity.value)
          //lugaresDestinosFullNames.value.push(place.name)
          showDestino.value=false
        }
      }
      if(elementId=='autocompleteDMult'){
        console.log("b");
        if(lugaresDestinosFullNames.value.length+1>5){
          //showDestino.value=true;
          alert('O número máximo de lugares é 5')
        }else{
          console.log("c");
          Destinos.push(place.formatted_address)
          //DestinoCity.value=place.formatted_address
          lugaresDestinosFullNames.value.push(place.name)
          //showDestino.value=true
        }
      }
    });
  };
  initAutocomplete('autocompleteQ', ['point_of_interest', 'locality']);
  initAutocomplete('autocompleteN', ['point_of_interest', 'locality']);
  initAutocomplete('autocompleteO', ['(cities)']);
  initAutocomplete('autocompleteD', ['(regions)']); 
  initAutocomplete('autocompleteDMult', ['(regions)']);
  
  //document.getElementById("autocompleteO").focus();
  getdata();
  getTraducao()
});
  const getTraducao = async () => {
    isLoading.value=true
    try {
    TRoteiro=JSON.parse(localStorage.getItem('Traducao'))
    traducao.value=TRoteiro.Roteiros
    interesses.value=traducao.value.ListInteresses
    lugares.value=traducao.value.lugares
    isLoading.value=false
    } catch (error) {
      console.log(error)
      isLoading.value=false
    }
  }
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
  if (newCount > childAges.value.length) {
    for (let i = childAges.value.length; i < newCount; i++) {
      childAges.value.push('');
    }
  } 
  else if (newCount < childAges.value.length) {
    childAges.value.splice(newCount);
  }
});

const formatChildren = () => {
      //numChildren.value = parseInt(formattedChildren.value) || 0;
      if (numChildren.value > 5) {
        numChildren.value = 5;
      } else if (numChildren.value < 0) {
        numChildren.value = 0;
      }
      while (childAges.value.length < numChildren.value) {
        childAges.value.push(null);  
      }
      while (childAges.value.length > numChildren.value) {
        childAges.value.pop();
      }
    };
const formatAges = (index) => {
      if (childAges.value[index] > 17) {
        childAges.value[index] = 17;
      } else if (childAges.value[index] < 0) {
        childAges.value[index] = 0;
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
          const initialDate = moment(date.value);
          const endDate = initialDate.clone().add(periodo_viagem.value, 'days');
          const formattedEndDate = endDate.format('DD/MM/YYYY');
          FinalDate.value= `${formattedEndDate}`;
        }
      }
      async function transformDatesToSave(initialDateStr, numberOfDays) {
        if(date&&periodo_viagem){
          const initialDate = moment(date.value);
          const formattedInitDate = initialDate.format('YYYY-MM-DD');
          InitDate.value = `${formattedInitDate}`
          const endDate = initialDate.clone().add(periodo_viagem.value, 'days');
          const formattedEndDate = endDate.format('YYYY-MM-DD');
          FinalDatePDF.value= `${formattedEndDate}`;
        }
      }
      function transformDate(initialDateStr) {
        if(!initialDateStr){
          dialog.value = true;
          isLoading.value = false; 
          errMsg.value=traducao.value.ErrMsg4
        } else {
          const initialDate = moment(initialDateStr);
          const formattedStartDate = initialDate.format('DD/MM/YYYY');
          return `${formattedStartDate}`;
        }
      }

const postRoteiro=async () =>{
  isRoteiro.value=true
  starValue.value=null;
  whyCardComentario.value='';
  const userLocale = navigator.language
  lang = localStorage.getItem('lang')
  isLoading.value=true
  const destinoString = Destinos.map(location => `'${location}'`).join(', ');
  const selectedInteressesString = selectedInteresses.map(location => `'${location}'`).join(', ');
  const lugar_ConhecerString = lugar_Conhecer ? lugar_Conhecer.map(location => `'${location}'`).join(', ') : "";
  const lugar_nIrString = lugar_nIr ? lugar_nIr.map(location => `'${location}'`).join(', ') : "";
  const childAgesString = childAges.value ? childAges.value.map(age=> `${age}`).join(', ') : ""
  let ObjRoteiro1={
    iduser:user.iduser,
    email:user.Email ? user.Email : user.email,
    origem:Origem,
    destino: destinoString,
    dias:periodo_viagem.value,
    data_inicio: transformDate(date.value),
    data_fim:FinalDate.value,
    qtd_adultos: numAdults.value,
    qtd_menores: numChildren.value ? numChildren.value : 0,
    idade_menores: childAgesString,
    interesses: selectedInteressesString,
    quero_conhecer: lugar_ConhecerString,
    nao_incluir: lugar_nIrString,
    meio_transporte: meio_transporte.value == 'Meios Próprios (não gerar)' ? 'N' : meio_transporte.value,
    tipo_hospedagem:hospedagemSelecionada.value,
    idioma: lang ? lang : userLocale,
    ip_origem: user.ip_origem,
    custos_detalhe:custos_detalhe.value == false ? 'N' : 'S'
  }
  if(localStorage.getItem('idAgent_start') || localStorage.getItem('idAgent_end')){

  }
  
  console.log('Obj Roteiro',ObjRoteiro1)
/*   if(!ObjRoteiro1.origem || !ObjRoteiro1.destino || !ObjRoteiro1.dias || !ObjRoteiro1.data_inicio || !ObjRoteiro1.qtd_adultos){
    dialog.value = true;
    isLoading.value = false; 
  }else */ 
  if(!ObjRoteiro1.origem){
    dialog.value = true;
    isLoading.value = false; 
    errMsg.value=traducao.value.ErrMsg1
  }
  else if(!ObjRoteiro1.destino){
    dialog.value = true;
    isLoading.value = false;
    errMsg.value=traducao.value.ErrMsg2
  }
  else if(!ObjRoteiro1.dias){
    dialog.value = true;
    isLoading.value = false; 
    errMsg.value=traducao.value.ErrMsg3
  }
  else if(!ObjRoteiro1.qtd_adultos){
    dialog.value = true;
    isLoading.value = false; 
    errMsg.value=traducao.value.ErrMsg4
  }
  else if(!ObjRoteiro1.data_inicio){
    dialog.value = true;
    isLoading.value = false; 
    errMsg.value=traducao.value.ErrMsg5
  }
  else{
    if(ObjRoteiro1.tipo_hospedagem||ObjRoteiro1.quero_conhecer.length>1||ObjRoteiro1.nao_incluir.length>1||ObjRoteiro1.interesses.length>1||lugaresDestinosFullNames.value.length>0||ObjRoteiro1.custos_detalhe=='S'){
    let saldoValido = haveSaldo()
    if(saldoValido==false){
        dialogVlr.value=true
        isLoading.value = false; 
        vlrModalText.value=traducao.value.VlrModal1
        return;
    }else{
      dialogPesqPdf.value = 'pesquisa'
      let confirmed = await confirmUseCredits();
      if (!confirmed) {
        isLoading.value = false;
        return; 
      }
    }
  }
    try {
      if(localStorage.getItem('isDev')=='dev'){ /* if is admin testing */
        let ObjRoteiroAdmin={
          iduser:user.iduser,
          email:user.Email ? user.Email : user.email,
          origem:Origem,
          destino: destinoString,
          dias:periodo_viagem.value,
          data_inicio: transformDate(date.value),
          data_fim:FinalDate.value,
          qtd_adultos: numAdults.value,
          qtd_menores: numChildren.value ? numChildren.value : 0,
          idade_menores: childAgesString,
          interesses: selectedInteressesString,
          quero_conhecer: lugar_ConhecerString,
          nao_incluir: lugar_nIrString,
          meio_transporte: meio_transporte.value == 'Meios Próprios (não gerar)' ? 'N' : meio_transporte.value,
          tipo_hospedagem:hospedagemSelecionada.value,
          idioma: lang ? lang : "pt",
          ip_origem: user.ip_origem,
          idAgent_start: localStorage.getItem('idAgent_start'),
          idAgent_end: localStorage.getItem('idAgent_end'),
          custos_detalhe:custos_detalhe.value
        }
        if(deepEqual(currentRoteiro.value,ObjRoteiroAdmin)){
          console.log('equal')
          const same = await confirmSameRoteiro()
          console.log('sameAdmin',same)
          if(same==false){
            console.log('same',same)
            return
          }
        }
        const response = await axios.post('https://mytripntour-dev-667280034337.us-central1.run.app/', ObjRoteiroAdmin)
      if(disabledRating.value==true){
        disabledRating.value=false;
      }
      localStorage.setItem('roteiro', JSON.stringify(response.data));
      roteiroData.value.Roteiro=response.data
      document.getElementById("autocompleteO").value = ObjRoteiro1.origem;
      const userLocale = navigator.language
          const LocalStorageUser = {
                Email: user.Email,
                name: user.name,
                photo: user.photo,
                MetodoAutenticacao: user.MetodoAutenticacao,
                birthday: user.birthday,
                gender: user.gender,
                ip_origem: user.ip_origem,
                email: user.email,
                saldouser: response.data.novo_saldo ?? user.saldouser,
                vlrpdf: user.vlrpdf,
                vlrpesquisa: user.vlrpesquisa,
                iduser: user.iduser,
                currency_data:user.currency_data
              };
              currentRoteiro.value=ObjRoteiroAdmin //save the current roteiro
              triggerFunctionPDF();
      localStorage.setItem('user', JSON.stringify(LocalStorageUser));
      }else{
        if(deepEqual(currentRoteiro.value,ObjRoteiro1)){
          console.log('equal')
          dialogCurrent.value=true
          const same = await confirmSameRoteiro()
          console.log('same',same)
          if(same==false){
            console.log('same',same)
            return
          }
        }
        const response = await axios.post('https://mytripntour-lm7edjmduq-uc.a.run.app/', ObjRoteiro1)
        if(disabledRating.value==true){
          disabledRating.value=false;
        }
        localStorage.setItem('roteiro', JSON.stringify(response.data));
        roteiroData.value.Roteiro=response.data
        document.getElementById("autocompleteO").value = ObjRoteiro1.origem;
            const LocalStorageUser = {
                  Email: user.Email,
                  name: user.name,
                  photo: user.photo,
                  MetodoAutenticacao: user.MetodoAutenticacao,
                  birthday: user.birthday,
                  gender: user.gender,
                  ip_origem: user.ip_origem,
                  email: user.email,
                  saldouser: response.data.novo_saldo ?? user.saldouser,
                  vlrpdf: user.vlrpdf,
                  vlrpesquisa: user.vlrpesquisa,
                  iduser: user.iduser,
                  currency_data:user.currency_data
                };
                triggerFunctionPDF();
        localStorage.setItem('user', JSON.stringify(LocalStorageUser));
        currentRoteiro.value=ObjRoteiro1 //save the current roteiro
      }
      await nextTick()
      if (pdfButton.value) {
        pdfButton.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }else{
        console.log('error in scroll to pdf')
      }
    } catch (error) {
      console.log('error in postRoteiro:',error)
      alert(traducao.value.ErrRoteiro)
      isLoading.value = false; 
    }
    finally {
      isLoading.value = false; 
      isRoteiro.value = false;
    }
  }
}
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true; 
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!obj2.hasOwnProperty(key) || !deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}
watch(
  () => roteiroData.value.Roteiro,
  async (newVal) => {
    if (newVal) {
      // Wait for DOM to update
      await nextTick()

      // Scroll to the button after DOM is updated
      if (pdfButton.value) {
        pdfButton.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
)

var iframe = document.querySelector('iframe.skiptranslate');
    if (iframe) {
        iframe.style.display = 'none';
    }

const sendRating = async () =>{
  try {
    const destinoString = Destinos.map(location => `'${location}'`).join(', ');
    const selectedInteressesString = selectedInteresses.map(location => `'${location}'`).join(', ');
    const lugar_ConhecerString = lugar_Conhecer.map(location => `'${location}'`).join(', ');
    const lugar_nIrString = lugar_nIr ? lugar_nIr.map(location => `'${location}'`).join(', ') : "";
    let ObjRoteiro1={
    email:user.Email ? user.Email : user.email,
    origem:Origem,
    destino: destinoString,
    dias:periodo_viagem.value,
    data_inicio: transformDate(date.value),
    data_fim:FinalDate.value,
    qtd_adultos: numAdults.value,
    qtd_menores: numChildren.value ? numChildren.value : 0,
    idade_menores: childAges.value,
    interesses: selectedInteressesString,
    quero_conhecer: lugar_ConhecerString,
    nao_incluir: lugar_nIrString,
    meio_transporte: meio_transporte.value == 'Meios Próprios (não gerar)' ? 'N' : meio_transporte.value,
    tipo_hospedagem:hospedagemSelecionada.value,
    idioma: lang ? lang : "PT-BR",
    ip_origem: user.ip_origem,
    txt_Roteiro:roteiroData.value.Roteiro.Roteiro,
    qtd_estrelas:starValue.value,
    txt_comentario:whyCardComentario.value,
  }
  if(!starValue.value){
    RatingText.value=traducao.value.RatinText1
    dialogRating.value=true
  }else if(starValue.value<=3 && !whyCardComentario.value){
    RatingText.value=traducao.value.RatinText2
    dialogRating.value=true
  }else if(starValue.value<=3 && whyCardComentario.value.length<=35){
    RatingText.value=traducao.value.RatinText3
    dialogRating.value=true
  }else{
    isLoading.value=true
    const response = await axios.post('https://mtt-stars-667280034337.us-central1.run.app/', ObjRoteiro1)
    disabledRating.value=true
    if(starValue.value<=3){
      RatingText.value=traducao.value.RatinText4
    }else{
      RatingText.value=traducao.value.RatinText5
    }
    dialogRating.value=true
    isLoading.value=false
  }
  } catch (error) {
    console.log(error)
    alert('Erro ao Mandar Avaliação')
  }
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
      childAges.value = [];
      currentIndex.value = 0;
      //showOrigem.value = true;
      showDestino.value = true;
      //OrigemCity.value = null;
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
      while(lugaresConhecerFullNames.length) {
        lugaresConhecerFullNames.pop();
      }
      inChecked.value=[]
      location = '';
      periodo_viagem.value = null;
      date.value = null;
      meio_transporte.value = null;
      hospedagemSelecionada.value = null;
      roteiroData.value = { Roteiro: null };
      opcaoGerar = 'Sim';
      selectedInteresses = [];
      lugar_nIr = [];
      lugar_Conhecer = [];
    };

    const downloadPdf = async () => {
      if(user.saldouser<parseInt(user.vlrpdf)){
        dialogPDF.value=false
        dialogVlr.value=true
        vlrModalText.value=traducao.value.VlrModal2
      }else{
        try {
          const destinoString = Destinos.map(location => `'${location}'`).join(', ');
        const selectedInteressesString = selectedInteresses.map(location => `'${location}'`).join(', ');
        const lugar_ConhecerString = lugar_Conhecer.map(location => `'${location}'`).join(', ');
        const lugar_nIrString = lugar_nIr ? lugar_nIr.map(location => `'${location}'`).join(', ') : "";
        const childAgesString = childAges.value ? childAges.value.map(age=> `${age}`).join(', ') : ""
        await transformDatesToSave(date.value)
        let ObjRoteiro1={
          email:user.Email ? user.Email : user.email,
          origem:Origem,
          destino: destinoString,
          dias:periodo_viagem.value,
          data_inicio: InitDate.value,
          data_fim:FinalDatePDF.value,
          qtd_adultos: numAdults.value,
          qtd_menores: numChildren.value ? numChildren.value : 0,
          idade_menores: childAgesString,
          interesses: selectedInteressesString,
          quero_conhecer: lugar_ConhecerString,
          nao_incluir: lugar_nIrString,
          meio_transporte: meio_transporte.value == 'Meios Próprios (não gerar)' ? 'N' : meio_transporte.value,
          tipo_hospedagem:hospedagemSelecionada.value,
          idioma: lang ? lang : "PT-BR",
          ip_origem: user.ip_origem,
          txt_Roteiro:roteiroData.value.Roteiro.Roteiro,
          nome_roteiro: PDFname.value,
          tpacao: 'I',
          iduser: user.iduser,
        }
        if(deepEqual(currentPDF,ObjRoteiro1)){
          alert(traducao.ErrMsg9)
          return
          
        }
        const element = document.getElementById('pdf-content'); 
        const opt = {
          margin: 0.5, 
          filename: `${PDFname.value}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
            const response = await axios.post('https://mtt-savetrip-667280034337.us-central1.run.app', ObjRoteiro1)
            const LocalStorageUser = {
                    Email: user.Email,
                    name: user.name,
                    photo: user.photo,
                    MetodoAutenticacao: user.MetodoAutenticacao,
                    birthday: user.birthday,
                    gender: user.gender,
                    ip_origem: user.ip_origem,
                    email: user.email,
                    saldouser: response.data.novo_saldo ?? user.saldouser,
                    vlrpdf: user.vlrpdf,
                    vlrpesquisa: user.vlrpesquisa,
                    iduser: user.iduser,
                    currency_data:user.currency_data
                  };
          localStorage.setItem('user', JSON.stringify(LocalStorageUser));
          currentPDF.value=ObjRoteiro1    
          dialogPDF.value=false;
          alert(traducao.value.ErrMsg7)
        } catch (error) {
          console.log(error)
          dialogPDF.value=false
          alert(traducao.value.ErrMsg8)
        }
      }

    }
  const haveSaldo=()=>{
    if (user.saldouser<parseInt(user.vlrpesquisa)) {
      return false
    } else {
      return true
    }
  }
  const askModal = async (ObjRoteiro1) =>{
    if(ObjRoteiro1.tipo_hospedagem||ObjRoteiro1.quero_conhecer.length>1||ObjRoteiro1.nao_incluir.length>1||ObjRoteiro1.interesses.length>1){
      dialogConfirm.value=true
    }else{
      return true
    }
  }
  const askModalPDF = async () =>{
    dialogPesqPdf.value = 'pdf'
        let confirmed = await confirmUseCredits();
        if (!confirmed) {
          return; 
        }else{
          if(parseFloat(user.saldouser) < parseFloat(user.vlrpdf)){
            dialogPDF.value=false
            dialogVlr.value=true
            vlrModalText.value=traducao.value.VlrModal2 + "saldo user:" + parseFloat(user.saldouser) + " valor pdf:" + parseFloat(user.vlrpdf)
          }else{
            dialogPDF.value=true
          }
        }
  }
  const confirmUseCredits = () => {
  return new Promise((resolve) => {
    dialogConfirm.value = true; // Open the dialog
    resolveConfirm = resolve; // Save resolve function to call later
  });
};

// Function to handle Yes/No clicks
const confirmHandler = (confirmed) => {
  dialogConfirm.value = false; 
  resolveConfirm(confirmed); // Resolve the promise with the confirmed value
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
  height: 32px; /* Adjust height as needed */
  overflow-y: auto; /* Make the div scrollable */
  display: flex; /* Make items inline */
  flex-wrap: wrap; /* Wrap items to the next line if they exceed the container width */
  gap: 10px; /* Add space between items */
  align-items: center; /* Align items vertically center */
  margin-bottom: 5px;
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
@media (max-width: 1300px) {
  .fontDestino {
    font-size: 2rem;
  }
}
@media (max-width: 1010px) {
  .fontDestino {
    font-size: 1.3rem;
  }
}
/* Remove as setas em navegadores baseados no WebKit (Chrome, Safari, etc.) */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Remove as setas no Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}

.textosDuracao{
    text-align: left;
    padding-left: 5px !important;
    font-size: 0.7rem;
}
@media (min-width: 768px) { 
  .textosDuracao {
    text-align: left;
    padding-left: 5px !important;
    font-size: 0.8rem;
  }
}

@media (min-width: 1024px) { 
  .textosDuracao {
    text-align: left;
    padding-left: 5px !important;
    font-size: 0.9rem;
  }
}

input::-webkit-calendar-picker-indicator{
    display: none;
}

input[type="date"]::-webkit-input-placeholder{ 
    visibility: hidden !important;
}
.small-datepicker {
  font-size: 0.85rem;  /* Smaller font size */
  padding: 4px 8px;    /* Smaller padding */
  width: 100%;         /* Ensure it stays responsive */
  height: auto;        /* Adjust height automatically */
}

@media (max-width: 768px) {
  .small-datepicker {
    width: 80px;  /* Adjust width for smaller screens */
  }
}

@media (max-width: 576px) {
  .small-datepicker {
    width: 60px;  /* Even smaller on mobile */
  }
}
.custom-checkbox {
  appearance: none; /* Remove default browser styling */
  -webkit-appearance: none; /* For WebKit browsers */
  width: 20px;
  height: 20px;
  border: 2px solid #007bff;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  background-color: white;
  display: inline-block;
}

.custom-checkbox:checked {
  background-color: #007bff; /* Change background to desired color */
  border-color: #007bff;
  position: relative;
}

.custom-checkbox:checked::after {
  content: "✔"; /* Add the checkmark */
  color: white; /* Color of the checkmark */
  font-size: 16px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (min-width: 640px) {
    .hide-on-large {
      display: none;
    }
  }
</style>
  