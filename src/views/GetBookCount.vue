<template>
    <div id="app">
      <h1>Book Counter</h1>
      <button @click="getBookCount">Get Book Count</button>
      <p v-if="count !== null">Total number of books: {{ count }}</p>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  const count = ref(null);
  const error = ref(null);
  
  const getBookCount = async () => {
    try {
      const response = await axios.get('https://countbooks-fxzcagrpbq-uc.a.run.app');
      console.log(response.data); 
      count.value = response.data.count; 
      error.value = null;
    } catch (err) {
      console.error('Error fetching book count:', err);
      error.value = 'Error fetching book count'; 
      count.value = null;
    }
  };
  
  
  onMounted(() => {
    getBookCount();
  });
  </script>
  