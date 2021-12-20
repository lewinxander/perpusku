<script setup>
import {
    IonItem,
    IonThumbnail,
    IonLabel
} from '@ionic/vue'

const props = defineProps(['book'])

</script>

<template>
    <ion-item button :routerLink="`/buku/${book.idbuku}`">
        <ion-thumbnail slot="start">
            <img :src="book.file_gambar || '/assets/no-image.png'" :alt="book.judul" />
        </ion-thumbnail>
        <ion-label>{{ book.judul }}</ion-label>
    </ion-item>
</template>
