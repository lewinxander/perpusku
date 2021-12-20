<script setup>
import {
    IonList
} from '@ionic/vue'
import BookListItem from './BookListItem.vue';

const props = defineProps(['books'])

</script>

<template>
    <div style="min-height: calc(100vh - 44px - 56px - 110px)">
        <ion-list v-if="books.length > 0">
            <book-list-item v-for="book in books" :key="book.id" :book="book" />
        </ion-list>
        <h3 v-else class="ion-text-center">Tidak ada buku</h3>
    </div>
</template>
