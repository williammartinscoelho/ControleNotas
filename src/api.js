
const BASE_URL = "http://localhost:80"

const OPTIONS = (body) => {
    return {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }
}

const API = {
    async getStores() {
        let response = await fetch(`${BASE_URL}/stores`)
        response = await response.json()
        return response;
    },

    async getStore(id) {
        let response = await fetch(`${BASE_URL}/stores/${id}`)
        response = await response.json()
        return response;
    },

    async getStoreAndNotes(id) {
        let response = await fetch(`${BASE_URL}/stores/${id}/invoices`)
        response = await response.json()
        return response;
    },

    async getProducts() {
        let response = await fetch(`${BASE_URL}/products`)
        response = await response.json()
        return response;
    },

    async getProduct(id) {
        let response = await fetch(`${BASE_URL}/products/${id}`)
        response = await response.json()
        return response;
    },

    async getNotes() {
        let response = await fetch(`${BASE_URL}/invoices`)
        response = await response.json()
        return response;
    },

    async getNote(id) {
        let response = await fetch(`${BASE_URL}/invoices/${id}`)
        response = await response.json()
        return response;
    },

    async postNote(data) {
        let response = await fetch(`${BASE_URL}/invoices`, OPTIONS(data))
        response = await response.json()
        return response;
    }
}

export default API;