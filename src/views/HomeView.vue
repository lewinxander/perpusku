<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton
} from '@ionic/vue'
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

    <ion-content></ion-content>
  </ion-page>
</template>

<style scoped>
</style>