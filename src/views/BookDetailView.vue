<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    loadingController,
    toastController
} from '@ionic/vue';
import axios from 'axios';
import BookDetail from '../components/books/BookDetail.vue';
import { useBooks } from '../store';

const route = useRoute()
const book = ref(null)
const bookStore = useBooks()

const toastOptions = {
    message: '',
    color: '',
    duration: 1000
}

const fetchBook = async () => {
    try {
        const resp = await axios.get(`/api/books/${route.params.id}`);

        book.value = resp.data.book
        bookStore.addBook(resp.data.book)
    } catch (error) {
        toastOptions.message = 'Terjadi kesalahan';
        toastOptions.color = 'danger';

        const errResp = error.response
        if (errResp) {
            toastOptions.message = errResp.statusText
        }

        const toast = await toastController.create(toastOptions)
        await toast.present()
    }
}

onMounted(async () => {
    book.value = bookStore.getBookById(+route.params.id);

    if (!book.value) {
        const loading = await loadingController.create({
            message: 'Tunggu sebentar',
        });

        await loading.present()
        await fetchBook()

        loading.dismiss()
    }
})
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary" mode="ios">
                <IonButtons slot="start">
                    <IonBackButton default-href="/home" text />
                </IonButtons>
                <ion-title class="app-title">Perpusku</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div class="ion-padding">
                <book-detail v-if="book" :book="book" />
            </div>
        </ion-content>
    </ion-page>
</template>