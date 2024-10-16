<template>
    <div>
        <h1>Books with ISBN > 1000</h1>

        <div v-if="loading">Loading books...</div>

        <ul v-if="!loading && books.length">
            <li v-for="book in books" :key="book.id">
                {{ book.name }} - ISBN: {{ book.isbn }}
                <button @click="editBook(book)">Edit</button>
                <button @click="deleteBook(book.id)">Delete</button>
            </li>
        </ul>

        <div v-if="!loading && !books.length">
            No books found with ISBN greater than 1000.
        </div>

        <button @click="toggleShowAll" v-if="books.length">
            {{ showAll ? 'Show Top 5 Books' : 'Show All Books' }}
        </button>

        <div v-if="editingBook">
            <h2>Edit Book</h2>
            <form @submit.prevent="updateBook(editingBook.id)">
                <label for="name">Name:</label>
                <input type="text" v-model="editingBook.name" />

                <label for="isbn">ISBN:</label>
                <input type="number" v-model="editingBook.isbn" />

                <button type="submit">Update Book</button>
                <button @click="cancelEdit">Cancel</button>
            </form>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/init.js';  // 使用相对路径


// 状态变量
const books = ref([]);
const showAll = ref(false); 
const editingBook = ref(null);
const loading = ref(true);  // 增加加载状态

const fetchBooks = async () => {
    try {
        loading.value = true;
        let q;

        if (showAll.value) {
            q = query(
                collection(db, 'books'),
                where('isbn', '>', 1000),
                orderBy('isbn', 'asc')
            );
        } else {
            q = query(
                collection(db, 'books'),
                where('isbn', '>', 1000),
                orderBy('isbn', 'asc'),
                limit(5)
            );
        }

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

const toggleShowAll = () => {
    showAll.value = !showAll.value;
    fetchBooks(); 
}

const editBook = (book) => {
    editingBook.value = { ...book }; 
};

const cancelEdit = () => {
    editingBook.value = null;
};

const updateBook = async (bookId) => {
    try {
        const bookRef = doc(db, 'books', bookId);
        await updateDoc(bookRef, {
            name: editingBook.value.name,
            isbn: editingBook.value.isbn,
        });
        fetchBooks(); 
        editingBook.value = null; 
    } catch (error) {
        console.error('Error updating book:', error);
    }
};

const deleteBook = async (bookId) => {
    try {
        const bookRef = doc(db, 'books', bookId);
        await deleteDoc(bookRef);
        fetchBooks(); 
    } catch (error) {
        console.error('Error deleting book:', error);
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
