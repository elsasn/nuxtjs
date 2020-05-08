export const state =() =>({
    items: [],
    fields: [
        {
            key: 'employee_name',
            label: 'Employee Name'
        },
        {
            key: 'employee_salary',
            label: 'Employee Salary'
        },
        {
            key: 'employee_age',
            label: 'Employee Age'
        },
        {
            key: 'action',
        }
    ]
}) 

export const mutations = {
    SET_USERS_ITEMS(state, payload){
        state.items = payload
    }
}

export const actions = {
    getUsersData({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`employees`)
            .then(response => {
                commit('SET_USERS_ITEMS', response.data.data)
                resolve(response.data)
            })
            .catch(error => {
                reject(error.response)
                new Error(error)
            })
        })
    },
    deleteUser({commit}, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`delete/${payload}`)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                new Error(error)
            })
        })
    }
}