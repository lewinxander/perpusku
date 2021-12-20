<script setup>
import {
    IonList,
    IonItem,
    IonLabel,
    IonInput
} from '@ionic/vue'

const props = defineProps(['book'])
</script>

<template>
    <div>
        <div class="ion-text-center ion-margin-bottom">
            <img
                v-if="book.file_gambar"
                :src="book.file_gambar"
                :alt="book.judul"
                style="max-height: 250px;"
            />
            <h2>{{ book.judul }}</h2>
        </div>

        <ion-list>
            <ion-item>
                <ion-label position="stacked">ISBN</ion-label>
                <ion-input :value="book.isbn" readonly />
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Pengarang</ion-label>
                <ion-input :value="book.pengarang" readonly />
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Penerbit</ion-label>
                <ion-input :value="book.penerbit" readonly />
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Kota Terbit</ion-label>
                <ion-input :value="book.kota_terbit || '-'" readonly />
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Editor</ion-label>
                <ion-input :value="book.editor || '-'" readonly />
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Kategori</ion-label>
                <ion-input :value="book.Kategori ? book.Kategori.nama : ''" readonly />
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Stok</ion-label>
                <ion-input :value="book.stok" readonly></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Stok Tersedia</ion-label>
                <ion-input :value="book.stok_tersedia" readonly></ion-input>
            </ion-item>
        </ion-list>
    </div>
</template>

<style scoped>
ion-list ion-item {
    margin-bottom: 15px;
}

ion-list ion-item:last-child {
    margin-bottom: 0;
}
</style>
