<script setup>
import { reactive, ref, watchEffect } from 'vue'
import {
    IonList,
    IonItem,
    IonInput,
    IonLabel,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonThumbnail,
    IonIcon,
    loadingController,
    toastController,
    isPlatform
} from '@ionic/vue'
import { imageOutline } from 'ionicons/icons'
import axios from 'axios'
import { Camera, CameraResultType } from '@capacitor/camera';
import * as yup from 'yup'

const schema = yup.object().shape({
    isbn: yup.string().trim().required().length(13, 'ISBN harus diisi (13 angka)').test('is-numeric', 'ISBN hanya dapat berupa angka', value => !isNaN(value)),
    judul: yup.string().trim().required('Judul harus diisi').max(255, 'Judul maksimal 255 karakter'),
    pengarang: yup.string().trim().required('Pengarang harus diisi').max(255, 'Pengarang maksimal 255 karakter'),
    penerbit: yup.string().trim().required('Penerbit harus diisi').max(255, 'Penerbit maksimal 255 karakter'),
    stok: yup.number().typeError('Harus berupa angka').min(1, "Stok minimal 1")
})

const props = defineProps(['categories'])
const emit = defineEmits(['invalid'])

const formInitialValue = {
    isbn: '',
    judul: '',
    pengarang: '',
    penerbit: '',
    kota_terbit: '',
    editor: '',
    file_gambar: '',
    kategori: "1",
    stok: "1",
}


const form = reactive({ ...formInitialValue })
const tempImage = ref('')
const errors = ref({})

const isEmpty = (attr, value, message) => {
    if (value.trim() === "") {
        errors.value[attr] = message;
        return false;
    }

    return true;
}



const toastOptions = {
    message: '',
    color: '',
    duration: 1000
}

const submit = async () => {
    errors.value = {}
    form.stok = form.stok === '' ? 1 : form.stok

    toastOptions.color = 'danger';
    toastOptions.message = 'Terjadi kesalahan!'

    let isValid = false;

    try {
        await schema.validate({
            isbn: form.isbn,
            judul: form.judul,
            pengarang: form.pengarang,
            penerbit: form.penerbit,
            stok: form.stok,
        }, { abortEarly: false })

        isValid = true;
    } catch (error) {
        error.inner.forEach(e => {
            errors.value[e.path] = e.message
        })
    }



    if (!isValid) {
        emit('invalid')
        toastOptions.message = 'Data tidak lengkap / tidak sesuai!'
        const toast = await toastController.create(toastOptions)
        await toast.present()
        return false;
    }

    const loading = await loadingController.create({
        message: 'Tunggu sebentar',
    });

    await loading.present()

    try {
        const resp = await axios.post('/api/books', form)

        toastOptions.color = 'success';
        toastOptions.message = 'Berhasil menambah buku!'

        for (const formKey in formInitialValue) {
            form[formKey] = formInitialValue[formKey]
        }

        errors.value = {}
        tempImage.value = ''
    } catch (error) {
        emit('invalid')

        const errResp = error.response

        if (errResp) {
            if (errResp.status === 422) {
                errors.value = errResp.data.errors
                toastOptions.message = 'Data tidak lengkap / tidak sesuai!'
            }
        }

    }

    const toast = await toastController.create(toastOptions)

    loading.dismiss()
    await toast.present()
}

const getImage = async () => {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl
    });

    tempImage.value = image.dataUrl;
    form.file_gambar = image.dataUrl;
}

watchEffect(() => {
    if (props.categories.length > 0) {
        form.kategori = props.categories[0].idkategori
    }
})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </script>

<template>
    <form action="#" @submit.prevent="submit" novalidate>
        <ion-list>
            <ion-item :class="{ 'invalid': !!errors.isbn }">
                <ion-label position="floating">ISBN</ion-label>
                <ion-input v-model="form.isbn" inputmode="numeric" />
            </ion-item>
            <div class="error-message">
                <ion-label color="danger">
                    <small>{{ errors.isbn }}</small>
                </ion-label>
            </div>
            <ion-item :class="{ 'invalid': !!errors.judul }">
                <ion-label position="floating">Judul</ion-label>
                <ion-input v-model="form.judul" />
            </ion-item>
            <div class="error-message">
                <ion-label color="danger">
                    <small>{{ errors.judul }}</small>
                </ion-label>
            </div>
            <ion-item :class="{ 'invalid': !!errors.pengarang }">
                <ion-label position="floating">Pengarang</ion-label>
                <ion-input v-model="form.pengarang" />
            </ion-item>
            <div class="error-message">
                <ion-label color="danger">
                    <small>{{ errors.pengarang }}</small>
                </ion-label>
            </div>
            <ion-item :class="{ 'invalid': !!errors.penerbit }">
                <ion-label position="floating">Penerbit</ion-label>
                <ion-input v-model="form.penerbit" />
            </ion-item>
            <div class="error-message">
                <ion-label color="danger">
                    <small>{{ errors.penerbit }}</small>
                </ion-label>
            </div>
            <ion-item :class="{ 'invalid': !!errors.kota_terbit }">
                <ion-label position="floating">Kota Terbit</ion-label>
                <ion-input v-model="form.kota_terbit" />
            </ion-item>
            <div class="error-message">
                <ion-label color="danger">
                    <small>{{ errors.kota_terbit }}</small>
                </ion-label>
            </div>
            <ion-item :class="{ 'invalid': !!errors.editor }">
                <ion-label position="floating">Editor</ion-label>
                <ion-input v-model="form.editor" />
            </ion-item>
            <div class="error-message">
                <ion-label color="danger">
                    <small>{{ errors.editor }}</small>
                </ion-label>
            </div>
            <ion-item :class="{ 'invalid': !!errors.file_gambar }">
                <ion-thumbnail slot="start">
                    <img :src="tempImage || '/assets/no-image.png'" alt="no-image" />
                </ion-thumbnail>
                <ion-button type="button" size="default" @click="getImage">
                    <ion-icon slot="start" :icon="imageOutline"></ion-icon>Tambah Gambar
                </ion-button>
            </ion-item>
            <div class="error-message">
                <ion-label color="danger">
                    <small>{{ errors.file_gambar }}</small>
                </ion-label>
            </div>
            <ion-item :class="{ 'invalid': !!errors.kategori, 'select-on-ios': isPlatform('ios') }">
                <ion-label>Kategori</ion-label>
                <ion-select v-model="form.kategori" ok-text="Pilih" cancel-text="Tutup">
                    <ion-select-option
                        v-for="category in categories"
                        :key="category.idkategori"
                        :value="category.idkategori"
                    >{{ category.nama }}</ion-select-option>
                </ion-select>
            </ion-item>
            <div class="error-message">
                <ion-label color="danger">
                    <small>{{ errors.kategori }}</small>
                </ion-label>
            </div>
            <ion-item :class="{ 'invalid': !!errors.stok }">
                <ion-label position="floating">Stok</ion-label>
                <ion-input v-model="form.stok" type="number" inputmode="numeric" />
            </ion-item>
            <div class="error-message">
                <ion-label color="danger">
                    <small>{{ errors.stok }}</small>
                </ion-label>
            </div>
        </ion-list>

        <button type="submit" class="ion-hide"></button>
        <div class="ion-padding-top">
            <ion-button type="submit" expand="block">Tambah</ion-button>
        </div>
    </form>
</template>

<style scoped>
ion-list .error-message {
    margin-bottom: 15px;
}

.error-message {
    padding-left: 15px;
}

ion-list .error-message:last-child {
    margin-bottom: 0;
}

.select-on-ios {
    padding-top: 23px;
}

.invalid {
    --highlight-color-focused: var(--ion-color-danger);
}
</style>