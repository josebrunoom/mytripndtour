<template>
    <div class="roteiro-container h-full">
      <!-- Render each item after parsing with marked -->
      <div v-for="(item, index) in roteiroData" :key="index" v-html="parseMarkdown(item)" class="roteiro-item"></div>
    </div>
  </template>
  
  <script>
  import { marked } from 'marked';
  
  export default {
    data() {
      return {
        roteiroData: [] // Initialize as an empty array
      };
    },
    mounted() {
      // Retrieve 'roteiro' data from localStorage
      const storedData = localStorage.getItem('roteiro');
      
      if (storedData) {
        try {
          // Parse the JSON data
          this.roteiroData = JSON.parse(storedData);
        } catch (error) {
          console.error("Error parsing JSON from localStorage:", error);
        }
      }
    },
    methods: {
      parseMarkdown(text) {
        return marked(text);
      }
    }
  };
  </script>
  
  <style scoped>
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
  