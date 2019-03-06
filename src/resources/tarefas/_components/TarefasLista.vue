<template>
  <div>
    <div class="row">
      <div class="col-sm-10">
        <h1 class="font-weight-light">Lista de Tarefas</h1>
      </div>
      <div class="col-sm-2">
        <button class="btn btn-primary float-right" @click="exibirFormularioCriarTarefa">
          <i class="fa fa-plus mr-2"></i>
          <span>Criar</span>
        </button>
      </div>
    </div>

    <h3 class="font-weight-light mt-4">A Fazer ({{tarefasAFazer.length}})</h3>

    <ul class="list-group" v-if="tarefasAFazer.length > 0">
      <TarefasListaIten
        v-for="tarefa in tarefasAFazer"
        :key="tarefa.id"
        :tarefa="tarefa"
        @editar="selecionarTarefaParaEdicao"
        @concluir="concluirTarefa({tarefa: $event})"
        @deletar="confirmarRemocaoTarefa"
      />
    </ul>

    <p v-else>Nenhuma tarefa a fazer.</p>

    <h3 class="font-weight-light mt-4">Concluidas ({{totalDeTarefasConcluidas}})</h3>

    <ul class="list-group" v-if="tarefasConcluidas.length > 0">
      <TarefasListaIten
        v-for="tarefa in tarefasConcluidas"
        :key="tarefa.id"
        :tarefa="tarefa"
        @editar="selecionarTarefaParaEdicao"
        @concluir="concluirTarefa({tarefa: $event})"
        @deletar="confirmarRemocaoTarefa"
      />
    </ul>

    <p v-else>Nenhuma tarefa foi concluida.</p>

    <!--<TarefaSalvar v-if="exibirFormulario" :tarefa="tarefaSelecionada"/>-->
    <TarefaSalvar v-if="exibirFormulario" @salvar="salvarTarefa"/>

    <div class="alert alert-danger" v-if="error">{{error.message}}</div>
  </div>
</template>

<script>
//import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

import { createNamespacedHelpers } from "vuex";
//import tarefasModules from "./../_store/index";
import register from "./../_store/register";

const {
  mapActions,
  mapGetters,
  mapMutations,
  mapState
} = createNamespacedHelpers("tarefas");

import TarefaSalvar from "./TarefaSalvar.vue";
import TarefasListaIten from "./TarefasListaIten.vue";
import { type } from "os";
import { log } from "util";
import { realpathSync, open } from "fs";

export default {
  components: {
    TarefaSalvar,
    TarefasListaIten
  },
  data() {
    return {
      exibirFormulario: false
      //tarefaSelecionada: undefined
    };
  },
  computed: {
    //...mapState("tarefas", ["tarefas"]),
    //...mapGetters("tarefas", [
    ...mapState(["tarefaSelecionada", "error"]),
    ...mapGetters([
      "tarefasConcluidas",
      "tarefasAFazer",
      "totalDeTarefasConcluidas",
      "boasVindas"
    ])
    //tarefasConcluidas(){return this.$store.getters.tarefasConcluidas}
  },
  created() {
    register(this.$store);
    this.listarTarefas();
    //   this.$store.registerModule("tarefas", tarefasModules);

    /*this.$store.commit({
      type: "listarTarefas",
      tarefas: [
        { id: 1, titulo: "Aprender Vue", concluido: true },
        { id: 2, titulo: "Aprender Vue Router", concluido: true },
        { id: 3, titulo: "Aprender Vuex", concluido: false }
      ]
    });*/
    /*
    setTimeout(() => {
          this.listarTarefas({
        tarefas: [
          { id: 1, titulo: "Aprender Vue", concluido: true },
          { id: 2, titulo: "Aprender Vue Router", concluido: true },
          { id: 3, titulo: "Aprender Vuex", concluido: false }
        ]
      });
    }, 1000);*/

    //Utilizando as actions
    // setTimeout(async () => {
    //  console.log("Usuário atual: ", this.boasVindas);

    /* this.$store.dispatch('listarTarefas', {
        tarefas: [
          { id: 1, titulo: "Aprender Vue", concluido: true },
          { id: 2, titulo: "Aprender Vue Router", concluido: true },
          { id: 3, titulo: "Aprender Vuex", concluido: false }
        ]
      });*/

    /*this.$store.dispatch({
        type: "listarTarefas",
        tarefas: [ ]
      });*/

    // this.$store.dispatch("listarTarefas")
    /*this.listarTarefas().then(() => {
        console.log("Actions executadas");
      });
    }, 1000);*/

    //Utilizando o async await
    //  await this.listarTarefas();
    // console.log("Actions executadas");
    //  console.log("Usuário novo: ", this.boasVindas);
    // }, 1000);
    // console.log("Boas vindas: ", this.boasVindas);
  },
  methods: {
    ...mapActions([
      "concluirTarefa",
      "criarTarefa",
      "editarTarefa",
      "listarTarefas",
      "deletarTarefa",
      "selecionarTarefa",
      "resetarTarefaSelecionada"
    ]),

    confirmarRemocaoTarefa(tarefa) {
      const confirmar = window.confirm(
        `Deseja deletar a tarefa "${tarefa.titulo}"?`
      );
      if (confirmar) {
        console.log("objeto para deletar ", tarefa);
        this.deletarTarefa({ tarefa });
      }
    },
    //...mapActions("tarefas", {
    /*  ...mapActions({
      carregarTarefas: "listarTarefas",
      listarTarefas: (dispatch, payload, options) => {
        return dispatch("listarTarefas", payload, options);
      }
    }),*/

    // ...mapMutations(["listarTarefas"]),
    /*...mapMutations({
      carregarTarefa: "listarTarefas",
      listarTarefas: (commit, payload, options) => {
        commit("listarTarefas", payload, options);
      }
    })*/ exibirFormularioCriarTarefa(
      event
    ) {
      if (this.tarefaSelecionada) {
        //this.tarefaSelecionada = undefined; //Desse modo causa mutação direto no objeto sem para pessa registor de mutação
        this.resetarTarefaSelecionada();
        return;
      }
      this.exibirFormulario = !this.exibirFormulario;
    },
    async salvarTarefa(event) {
      switch (event.operacao) {
        case "editar":
          await this.editarTarefa({ tarefa: event.tarefa });
          break;
        case "criar":
          await this.criarTarefa({ tarefa: event.tarefa });
          break;
      }
      this.resetar();
    },
    selecionarTarefaParaEdicao(tarefa) {
      this.exibirFormulario = true;
      //this.tarefaSelecionada = tarefa; //Causa mutação
      this.selecionarTarefa({ tarefa });
    },
    resetar() {
      this.exibirFormulario = false;
      //this.tarefaSelecionada = undefined; //causa mutação
      this.resetarTarefaSelecionada();
    }
  }
};
</script>
