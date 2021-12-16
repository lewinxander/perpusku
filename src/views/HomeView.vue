<script setup>
import { ref } from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton
} from '@ionic/vue'
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'

const swiperRef = ref(null)
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary" mode="ios">
        <ion-title class="app-title">Perpusku</ion-title>
      </ion-toolbar>
      <ion-toolbar color="primary">
        <ion-segment value="daftar">
          <ion-segment-button value="daftar">Daftar Buku</ion-segment-button>
          <ion-segment-button value="tambah">Tambah Buku</ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="ion-padding">
        <swiper auto-height :slides-per-view="1" :space-between="50" ref="swiperRef">
          <swiper-slide>Daftar Buku</swiper-slide>
          <swiper-slide>Tambah Buku</swiper-slide>
        </swiper>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.app-title {
  font-size: 25px;
  font-weight: bold;
}
</style>