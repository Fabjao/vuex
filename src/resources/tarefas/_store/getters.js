export default {
    //tarefasConcluidas: (state) => state.tarefas.filter(t => t.concluido),
    tarefasConcluidas: (state, getters, rootState, rootGetters) => {
        console.log('Getters: state ', state, rootState);
        return state.tarefas.filter(t => t.concluido)
    },
    tarefasAFazer: (state) => state.tarefas.filter(t => !t.concluido),
    totalDeTarefasConcluidas: (state, getters) => getters.tarefasConcluidas.length,
    buscarTarefaporId: state => id => state.tarefas.find(t => t.id === id),
    boasVindas: (state, getters, rootState, rootGetters) => {
        //state.tarefas // tarefas.tarefas
        //getter.tarefasAFazer // tarefas/tarefasAFazer
        console.log('State Global: ', rootState.usuario);
        console.log('Getter Global: ', rootGetters.mensagemBoasVindas)
        return rootGetters.mensagemBoasVindas
    }
}