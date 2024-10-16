<template>
    <div>
      <pre v-if="count !== null">{{ JSON.stringify({ count: count }, null, 2) }}</pre> 
      <pre v-if="error">{{ error }}</pre>
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
  