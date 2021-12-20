import { defineStore } from 'pinia'

export const useBooks = defineStore('books-store', {
    state: () => ({
        value: []
    }),

    getters: {
        getBookById: state => {
            return idbuku => state.value.find(book => book.idbuku === idbuku)
        }
    },

    actions: {
        addBook(book) {
            this.value.push(book)
        }
    }
})