<template>
    <div class="scrollable-container">
        <div v-if="!Extratos">
            <span class="">{{traducao.NExt}}</span>
        </div>
        <div v-else >
            <v-data-table
            :items="Extratos"
            :headers="headers"
            item-value="id"
            class="elevation-1"
            :loading="!Extratos.length"
            :loading-text=traducao.Loading
            :items-per-page="10"
        >
            <template v-slot:top>
<!--                 <v-toolbar flat>
                    <v-toolbar-title>Extratos</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar> -->
            </template>

            <template v-slot:item="slotProps">
                <tr>
                    <td>{{ formatarData(slotProps.item.dthcreate) }}</td>
                    <td>{{ slotProps.item.vlroperacao }} {{ slotProps.item.currency_code }}</td>
                    <td>{{ slotProps.item.crdoperacao }}</td>
                    <td>{{ slotProps.item.descricao }}</td>
                    <td :class="{'text-red-500': slotProps.item.tpoperacao == 'D', 'text-[#27b3cc]': slotProps.item.tpoperacao !== 'D' }">{{ slotProps.item.tpoperacao == 'D' ? traducao.Debito : traducao.Credito }}</td>
                    <td  v-if="slotProps.item.tpoperacao == 'D' && slotProps.item.flgestornado==null" class="pl-4 ">
                        <v-btn @click="OpenModal(slotProps.item)" color="red">{{traducao.Estorno}}</v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>
        </div>
<!--         <div v-for="(extrato, index) in Extratos" :key="index" class="p-4 border-b ">
            <div class="flex items-center">
            <button @click="toggleDetails(index)" class="mr-2">
                <span :class="openIndex === index ? 'rotate-180' : 'rotate-0'">
                &#x25BC;
                </span>
            </button>
            <span class="text-lg font-bold">Transação {{ index + 1 }}</span>
            </div>
            <div v-if="openIndex === index" class="mt-2 text-gray-600 text-left">
            <p><strong>Descricao:</strong> {{ extrato.descricao }}</p>
            <p><strong>Credito da Operação:</strong> {{ extrato.crdoperacao }}</p>
            <div >
                <p><strong>Tipo de Operação:</strong> {{ extrato.tipo_operacao }}</p>
            </div>
            </div>
            
        </div> -->
        <v-dialog v-model="dialogNameChange" max-width="500px">
            <v-card>
                <v-card-title class="headline"></v-card-title>
                <v-card-text>{{ traducao.Edit }}</v-card-text>
                <div class="flex justify-center">
                </div>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="[#78c0d6]" text @click="dialogNameChange">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogEx" max-width="500px">
            <v-card>
                <v-card-title class="headline">{{traducao.Estorno}}</v-card-title>
                <v-card-text>{{ traducao.MotExt }}</v-card-text>
                <div class="flex justify-center">
                </div>
                <div class="flex justify-center items-center w-[85%] mx-auto">
                    <input type="text" class="form-control" :placeholder="traducao.PlaceHolder4" v-model="motivoEx">
                </div>
                <div class="mx-auto">
                    {{ motivoEx.length }}/50
                </div>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="[#78c0d6]" text @click="sendEx">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <Loading :loading="isLoading"></Loading>
        <HomeScreenSeeOnly v-if="ModalVisible " :isVisible="ModalVisible" :Roteiros="selectedRoteiro"></HomeScreenSeeOnly>
    </div>
</template>
<!-- {
    "extrato": [
        {
            "crdoperacao": -1,
            "descricao": "Pesquisa",
            "dthpagamento": null,
            "iduser": 7,
            "referencia": "App",
            "tipo_operacao": "D",
            "tppagamento": null,
            "vlroperacao": null
        },
} -->
<script setup>
    import moment from 'moment';
    import Loading from './Loading.vue';
    import HomeScreenSeeOnly from './HomeScreen-See-Only.vue';
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import newlang from '../data/newlang';

    const user = ref(JSON.parse(localStorage.getItem('user')))
    
    const Extratos = ref([]);
    const isLoading = ref(false);
    const ModalVisible= ref(false)
    const selectedRoteiro = ref(null);
    const dialogNameChange = ref(false)
    const dialogEx = ref(false)
    const dataToSend = ref(null)
    const motivoEx = ref('')
    const selected = ref(null)
    const traducao = ref(newlang)
    const headers = ref([
        { title: traducao.value.Data, key: 'dthcreate', align: 'center' },
        { title: traducao.value.Valor, key: 'vlroperacao', align: 'center' },
        { title: traducao.value.Creditos, key: 'crdoperacao',align: 'center' },
        { title: traducao.value.Descricao, key: 'descricao',align: 'center' },
        { title: traducao.value.Toperacao, key: 'tpoperacao',align: 'center' },
        { title: traducao.value.Acoes, key: '',align: 'center',sortable: false },
    ]);
    
    onMounted(() => {
        isLoading.value = true;
        getExtrato();
        getTraducao()
    });

    const getTraducao = async () => {
        isLoading.value=true
        try {
        let TRoteiro=JSON.parse(localStorage.getItem('Traducao'))
        console.log(TRoteiro)
        traducao.value=TRoteiro.ExtratoPage
        isLoading.value=false
        headers.value = [
            { title: traducao.value.Data, key: 'dthcreate', align: 'center' },
            { title: traducao.value.Valor, key: 'vlroperacao', align: 'center' },
            { title: traducao.value.Creditos, key: 'crdoperacao',align: 'center' },
            { title: traducao.value.Descricao, key: 'descricao',align: 'center' },
            { title: traducao.value.Toperacao, key: 'tpoperacao',align: 'center' },
            { title: traducao.value.Acoes, key: '',align: 'center',sortable: false },
        ]
        } catch (error) {
            console.log(error)
            isLoading.value=false
        }
    }
    
    const getExtrato = async () => {
        let obj = {
        tpacao: "E",
        iduser: user.value.iduser
        };
        try {
        const response = await axios.post('https://mtt-accounting-667280034337.us-central1.run.app', obj);
        Extratos.value = response.data.extrato;
        isLoading.value = false;
        console.log('extratos', response.data)
        } catch (error) {
        console.log(error);
        isLoading.value = false;
        }
    };
    
    const openIndex = ref(null);

    const OpenModal = (item) => {
        if(item.flgestornado=='S'){
            alert('Você já solicitou extorno!')
        }else{
            dialogEx.value=true
            selected.value = item
        }
    }

    const sendEx = async () => {
        if(motivoEx.value.length<50){
            alert(traducao.value.Mot50)
        }else{
            console.log(selected.value)
            try {
                let obj = {
                    iduser:user.value.iduser,
                    emailuser:user.value.email,
                    descricao:selected.value.descricao,
                    tpacao:'E',
                    obsestorno:motivoEx.value,
                    idccestorno:selected.value.idcc
                }
                console.log(obj)
                const response = await axios.post('https://usercredits-667280034337.us-central1.run.app/insert_cc', obj)
                const LocalStorageUser = {
                    Email: user.value.Email,
                    name: user.value.name,
                    photo: user.value.photo,
                    MetodoAutenticacao: user.value.MetodoAutenticacao,
                    birthday: user.value.birthday,
                    gender: user.value.gender,
                    ip_origem: user.value.ip_origem,
                    email: user.value.email,
                    saldouser: response.data.novo_saldo ?? user.saldouser,
                    vlrpdf: user.value.vlrpdf,
                    vlrpesquisa: user.value.vlrpesquisa,
                    iduser: user.value.iduser,
                    currency_data:user.value.currency_data
                };
                localStorage.setItem('user', JSON.stringify(LocalStorageUser));
                await getExtrato()
                dialogEx.value=false
                motivoEx.value=''
                alert(traducao.value.PedAv)
            } catch (error) {
                alert('Erro ao mandar extorno')
                console.log(error)
            }
        }
    }

function formatarData(data) {
    const dateObj = new Date(data);
    
    const dia = String(dateObj.getDate()).padStart(2, '0');
    const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
    const ano = dateObj.getFullYear();

    const horas = String(dateObj.getHours()).padStart(2, '0');
    const minutos = String(dateObj.getMinutes()).padStart(2, '0');

    const dadosUser = JSON.parse(localStorage.getItem('user'));
    const moedaPadrao = dadosUser.currency_data.find(moeda => moeda.padrao === 1)?.nome;

    if (moedaPadrao === "Real") {
        return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
    } else {
        return `${mes}/${dia}/${ano} - ${horas}:${minutos}`;
    }
}
</script>


<style>
.scrollable-container {
    max-height: 90vh; 
    overflow-y: auto;
    margin: 0 auto;
    padding: 1rem; 
}

.button-container {
    display: flex;
    gap: 0.5rem; /* Space between buttons */
}
</style>
