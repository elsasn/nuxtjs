let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiQmlsbCBHYXRlcyIsImlkX3VzZXIiOiIxMDA1Iiwicm1fbnVtYmVyIjoiMDA1IiwicnNfa2V5IjoiQTEyMyIsImlwX2FkZHJlc3MiOiIxMjcuMC4xLjEiLCJhY2Nlc3MiOiJ1c2VyIn0.riOFjZvDhuYZ8bxYA02xaedXSt_pxlEUP19cfzxupmk'

export const state =() =>({
    data: null
}) 

export const mutations = {
    SET_TEMPLATE_DATA(state, payload){
        state.data = payload
    }
}

export const actions = {
    getTemplate({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`employees`)
            .then(response => {
                commit('SET_TEMPLATE_DATA', response.data.data)
                resolve(response.data)
            })
            .catch(error => {
                reject(error.response)
                new Error(error)
            })
        })
    }
}