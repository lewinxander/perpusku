<script setup>
import { ref, onMounted } from 'vue'

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSpinner,
  toastController,
  loadingController
} from '@ionic/vue';
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'

import BookList from '../components/BookList.vue'
import AddBook from '../components/AddBook.vue';

const segments = ['daftar', 'tambah'];
const swiperRef = ref(null)

const books = ref([])
const categories = ref([])
const selectedSegment = ref('daftar')
const searchBooksInput = ref('')
const searching = ref(false)

const toastOptions = {
  message: '',
  color: '',
  duration: 1000
}

const fetchBooks = async (search = '') => {
  try {
    const resp = await axios.get('/api/books', {
      params: !search ? {} : { search }
    })

    books.value = resp.data.books
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

const fetchCategories = async () => {
  try {
    const resp = await axios.get('/api/categories');

    categories.value = resp.data.categories
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

const refreshBooks = async event => {
  await fetchBooks()

  searchBooksInput.value = ''
  event.target.complete()
}

const searchBooks = async event => {
  searching.value = true
  await fetchBooks(event.detail.value)
  searching.value = false
}

const slideChanged = swiper => {
  selectedSegment.value = segments[swiper.activeIndex]
}

const segmentChanged = event => {
  swiperRef.value.$el.swiper.slideTo(segments.findIndex(segment => segment === event.detail.value))
}

const updateSwiper = () => {
  setTimeout(() => {
    swiperRef.value.$el.swiper.updateAutoHeight();
  }, 100);
}

onMounted(async () => {
  const loading = await loadingController.create({
    message: 'Tunggu sebentar',
  });

  await loading.present()
  await fetchBooks()
  await fetchCategories()

  loading.dismiss()
})
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary" mode="ios">
        <ion-title class="app-title">Perpusku</ion-title>
      </ion-toolbar>
      <ion-toolbar color="primary">
        <ion-segment v-model="selectedSegment" @ion-change="segmentChanged">
          <ion-segment-button value="daftar">Daftar Buku</ion-segment-button>
          <ion-segment-button value="tambah">Tambah Buku</ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-refresher
        v-show="selectedSegment === 'daftar'"
        slot="fixed"
        @ionRefresh="refreshBooks($event)"
      >
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div class="ion-padding">
        <swiper
          auto-height
          :slides-per-view="1"
          :space-between="50"
          @slide-change="slideChanged"
          ref="swiperRef"
        >
          <swiper-slide>
            <ion-searchbar v-model="searchBooksInput" placeholder="Cari" @ion-change="searchBooks"></ion-searchbar>
            <div v-show="searching" class="ion-text-center ion-margin-top">
              <ion-spinner />
            </div>
            <book-list v-show="!searching" :books="books" />
          </swiper-slide>
          <swiper-slide>
            <add-book :categories="categories" @invalid="updateSwiper" />
          </swiper-slide>
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