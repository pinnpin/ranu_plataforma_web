<template>

  <v-data-table :headers="headers" :items="nascimentosList" :items-per-page="15" @click:row="openDetails"
    class="elevation-1">

    <template v-slot:header>
      <v-app-bar app color="primary" dark>
        <v-tool-title>Hospital de Braga</v-tool-title>
      </v-app-bar>
    </template>

    <template v-slot:top>

      <v-row align="center" justify="space-around">

      <v-btn color="primary" dark class="mb-2" @click="$router.push('/nascimento')"> Criar novo registo</v-btn>

      <v-btn color="primary" dark class="mb-2" @click="$router.push('/avaliacao1_registo')"> Registar 1ª Avaliação</v-btn>

      <v-btn color="primary" dark class="mb-2" @click="$router.push('/avaliacao2_registo')"> Registar 2ª Avaliação</v-btn>

      <v-btn color="primary" dark class="mb-2" @click="$router.push('/avaliacao3_registo')"> Registar 3ª Avaliação</v-btn>
      </v-row>
    </template>

    <template v-slot:item.actions="{ nseq }">
      <v-icon small class="mr-2" @click="deleteNascimento(nseq)"> mdi-delete </v-icon>
    </template>

  </v-data-table>



</template>

<script>
import { toRefs } from "vue";


export default {
  data() {
    return {
      headers: [
        {
          text: 'Número',
          align: 'start',
          sortable: false,
          value: 'numero',
        },
        { text: 'Nome', value: 'nome' },
        { text: 'Número Seq', value: 'nseq' },
        { text: 'Data de Nascimento', value: 'dta_nascimento' },
        { text: 'Fase', value: 'fase' },
        { text: 'Ações', value: 'actions' },
      ],
      nascimentosList: [],

      user: { role: "", name: "", email: "" },
    
    }
  },
  created() {

    this.loadNascimentos();

  },


  methods: {

    async getInfo() {
      this.user = JSON.parse(sessionStorage.getItem('session'));
      console.log(this.user.name)
      if (this.user == null) {
        this.$router.push('/');
      }

    },

    async openDetails(nascimentosList) {
      try {
        this.$router.push(`tabInicial/${nascimentosList.nseq}`)
      } catch (err) {
        this.error = err;
        this.state = "error"
      }
    },

    async loadNascimentos() {
      try {
        const res = await this.axios.post('http://localhost:3000/medico/tabInicial');
        this.nascimentosList = res.data;
        console.log(this.nascimentosList)
        ///this.nascimentos = await nascimentos.json();
        ///this.state = "ready";
      } catch (err) {
        this.error = err;
        this.state = "error"
      }
    },

    async deleteNascimento(nseq) {
      try {
        const res = await this.axios.delete(`http://localhost:3000/tecnico/delete/${nseq}`);
        const index = this.nascimentosList.findIndex(c => c.nseq == nseq);
        this.nascimentosList.splice(index, 1);
        this.alert = {
          show: true,
          type: "info",
          message: res.data.message
        };
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>