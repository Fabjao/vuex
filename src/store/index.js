import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

import contador from '@/resources/contador/_store/index'

Vue.use(Vuex)

/*export default new Vuex.Store({
    modules: {
        contador: contadorModules,
        tarefas: tarefasModulo
    }
})*/

const state = {
    usuario: 'Fábio Gonçalves'
}

const getters = {
    mensagemBoasVindas: state => `Olá boas vindas ${state.usuario}`
}

const actions = {
    //extraindo o commit do context de forma destruturada
    //Passando o payload como usuario
    logar: ({ commit }, usuario) => {
        commit('logar', usuario)
    }
}

const mutations = {
    logar: (state, usuario) => {
        state.usuario = usuario
    }
}

const modules = {
    contador
}

//console.log('Store: ', store);

export default new Vuex.Store({
    //strict: true,
    strict: process.env.NODE_ENV !=='production',
    state,
    getters,
    actions,
    mutations,
    modules
})



//export default store
