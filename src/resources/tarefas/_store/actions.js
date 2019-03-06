import * as types from './mutation-types'
import tarefasServices from './../_sevices/TarefasServices'
import TarefasServices from './../_sevices/TarefasServices';
import { type } from 'os';

export default {
    concluirTarefa: async ({ dispatch }, payload) => {
        const tarefa = Object.assign({}, payload.tarefa)
        tarefa.concluido = !tarefa.concluido
        dispatch('editarTarefa', { tarefa })
    },
    criarTarefa: ({ commit }, { tarefa }) => {
        return tarefasServices.postTarefa(tarefa)
            .then(response => {
                commit(types.CRIAR_TAREFAS, { tarefa: response.data })
            })
            .catch(error => commit(types.SETAR_ERRO, { error }))
    },
    editarTarefa: async ({ commit }, { tarefa }) => {
        const response = await TarefasServices.putTarefa(tarefa)
        commit(types.EDITAR_TAREFAS, { tarefa: response.data })
    },
    deletarTarefa: async ({ commit }, { tarefa }) => {
        console.log('Chegou na action deletar ', tarefa.id)
        const response = await TarefasServices.deleteTarefa(tarefa.id)
        commit(types.DELETAR_TAREFAS, { tarefa })
    },
    listarTarefas: async ({ commit }) => {
        try {
            const response = await tarefasServices.getTarefas()
            commit(types.LISTAR_TAREFAS, { tarefas: response.data })
        } catch (erro) {
            commit(types.SETAR_ERRO, { erro })
        }
    },
    selecionarTarefa: ({ commit }, payload) => {
        commit(types.SELECIONAR_TAREFA, payload)
    },
    resetarTarefaSelecionada: ({ commit }) => {
        commit(types.SELECIONAR_TAREFA, { tarefa: undefined })
    }

    /* buscarTarefas: (context, payload) => {
         return new Promise((resolve, reject) => {
             setTimeout(() => {
                 resolve([
                     { id: 1, titulo: "Aprender Vue", concluido: true },
                     { id: 2, titulo: "Aprender Vue Router", concluido: true },
                     { id: 3, titulo: "Aprender Vuex", concluido: false }
                 ])
             }, 2000);
         })
     },*/

    //listarTarefas: (context, payload) => {
    /* listarTarefas: ({ commit }, payload) => {
         console.log('action chamada');
         setTimeout(() => {
             console.log('actions executada');
             //context.commit('listarTarefas', payload)
             commit('listarTarefas', payload)
         }, 2000);
     }*/

    /*listarTarefas: ({ commit, dispatch }, payload) => {
        console.log('Action: listarTarefas');            
        return dispatch('buscarTarefas')
            .then(tarefas => {
                console.log('Mutation: listarTarefas');                    
                commit('listarTarefas', { tarefas })
            })
    }*/

    //utilizando o async await
    //listarTarefas: async ({ commit, dispatch }, payload) => {
    /*listarTarefas: async ({ commit, dispatch, state, rootState, getters, rootGetters }, payload) => {
        console.log('Action: listarTarefas');
        const tarefas = await dispatch('buscarTarefas')
        console.log('Mutation: listarTarefas');
        // commit('listarTarefas', { tarefas })
        commit(types.LISTAR_TAREFAS, { tarefas })
        console.log('Actions: state: ', state, rootState);

        //commit('logar','Fábio Gonçalves') //tarefas/logar (não funciona) está executando dentro de tarefas
        //commit('logar', 'Fábio Santos', { root: true }) //executando na raiz  logar ok

        //dispatch('logar','Fábio Santos', {root:true}) //tarefas/logar (não funciona)
        dispatch('logar', 'Fábio Santos', { root: true }) //Logar na raiz

        //dispatch('logar', null, { root: true }) //Logar na raiz caso não precise passar paramêtro
    }*/
}