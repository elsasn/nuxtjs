// let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiQmlsbCBHYXRlcyIsImlkX3VzZXIiOiIxMDA1Iiwicm1fbnVtYmVyIjoiMDA1IiwicnNfa2V5IjoiQTEyMyIsImlwX2FkZHJlc3MiOiIxMjcuMC4xLjEiLCJhY2Nlc3MiOiJ1c2VyIn0.riOFjZvDhuYZ8bxYA02xaedXSt_pxlEUP19cfzxupmk'

export const state =() =>({
    dataDokter: [],
    dataPerawat: []
}) 

export const mutations = {
    SET_DOKTER_DATA(state, payload){
        state.dataDokter = payload
    },
    SET_PERAWAT_DATA(state, payload){
        state.dataPerawat = payload
    }
}

export const actions = {
    getDokter({commit}, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`rs/ref/dokter`)
            .then(response => {
                commit('SET_DOKTER_DATA', response.data.data)
                resolve(response.data)
            })
            .catch(error => {
                reject(error.response)
                new Error(error)
            })
        })
    },
    getPerawat({commit}, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`rs/ref/perawat`)
            .then(response => {
                commit('SET_PERAWAT_DATA', response.data.data)
                resolve(response.data)
            })
            .catch(error => {
                reject(error.response)
                new Error(error)
            })
        })
    }
}