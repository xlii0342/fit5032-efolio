<template>
    <pre>{{ books }}</pre>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase/init.js';  

// 状态变量
const books = ref([]);

const loading = ref(true);  // 增加加载状态

const fetchBooks = async () => {
    try {
        loading.value = true;
        let q;

       
            q = query(
                collection(db, 'books'),
                
            );
        
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
    } catch (error) {
        console.error('Error fetching books:', error);
    } finally {
        loading.value = false;
    }
};



onMounted(() => {
    fetchBooks();
});
</script>

<style scoped>
/* 简单样式 */
.container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 80vw;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
}

button {
    margin-left: 10px;
}

.loading {
    font-size: 18px;
    font-weight: bold;
}
</style>
