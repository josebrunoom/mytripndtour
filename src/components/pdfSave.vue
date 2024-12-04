<template>
    <div v-if="Roteiro" v-html="Roteiro.Roteiro" class="roteiro-item" id="pdf-content">

    </div>
</template>


<script setup>
import { ref,onMounted,defineProps } from 'vue';
import html2pdf  from 'html2pdf.js';
import router from '../routes';


const PDFname = localStorage.getItem('pdfName')
const Roteiro = JSON.parse(localStorage.getItem('roteiro'))

onMounted(async ()=>{
    await savePDF()
    router.back()
})

const savePDF = async () =>{
    try {
        const element = document.getElementById('pdf-content'); 
        const opt = {
            margin: 0.5, 
            filename: `${PDFname}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
        
    } catch (error) {
        console.log(error)
    }

}
</script>
<style>
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