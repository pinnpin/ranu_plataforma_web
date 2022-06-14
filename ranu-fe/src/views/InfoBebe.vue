<template>
  <v-container>
    <v-app-bar app color="primary" dark>
      <v-tool-title>Hospital de Braga</v-tool-title>
    </v-app-bar>

    <v-card class="mx-auto" max-width="600" outlined color="#1E88E5">
      <v-row justify="center">
        <v-card-title class="white--text"> Identificação do paciente </v-card-title>
      </v-row>
    </v-card> <br>
    <br>

    <v-row justify="center" md="8" sm="8">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Processo</th>
              <th class="text-left">Nome</th>
              <th class="text-left">Data de Nascimento</th>
              <th class="text-left">Hora</th>
              <th class="text-left">Gestação</th>
              <th class="text-left">Peso</th>
              <th class="text-left">Sexo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="edit in edit_bebe" :key="edit.nseq">

              <td>{{ edit.numero }}</td>
              <td>{{ edit.nseq }}</td>
              <td>{{ edit.nome }}</td>
              <td>{{ edit.dta_nascimento }}</td>
              <td>{{ edit.hora }}</td>
              <td>{{ edit.gestacao }}</td>
              <td>{{ edit.peso }}</td>
              <td>{{ edit.sexo }}</td>


            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>

    <v-row justify="center" md="8" sm="8">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Avaliacao</th>
              <th class="text-left">Data da Avaliação</th>
              <th class="text-left">Número Mecanográfico do Avaliador</th>
               <th class="text-left">Opção</th>
              <th class="text-left">Data de Reavaliação</th>
              <th class="text-left">Número Mecanográfico do Reavaliador</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="edit1 in edit_aval1" :key="edit1.data_avaliacao">
              <td>{{ edit1.avaliacao }}</td>
              <td>{{ edit1.data_avaliacao }}</td>
              <td>{{ edit1.nmec_avaliador }}</td>
              <td>{{ edit1.opcao }}</td>
              <td>{{ edit1.data_reavaliacao }}</td>
              <td>{{ edit1.a_reavaliador }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>

    <v-row justify="center" md="8" sm="8">
    
      <v-simple-table v-if="edit_aval2 !== null">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Avaliacao</th>
              <th class="text-left">Data da Avaliação</th>
              <th class="text-left">Número Mecanográfico do Avaliador</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="edit2 in edit_aval2" :key="edit2.data_avaliacao">
              <td>{{ edit2.avaliacao }}</td>
              <td>{{ edit2.data_avaliacao }}</td>
              <td>{{ edit2.nmec_avaliador }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>

    <v-row justify="center" md="8" sm="8">
      <v-simple-table v-if="edit_aval3 !== null">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Avaliacao</th>
              <th class="text-left">Data da Avaliação</th>
              <th class="text-left">Número Mecanográfico do Avaliador</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="edit3 in edit_aval3" :key="edit3.data_avaliacao">
              <td>{{ edit3.avaliacao }}</td>
              <td>{{ edit3.data_avaliacao }}</td>
              <td>{{ edit3.nmec_avaliador }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
  </v-container>


</template>

<script>
import router from "@/router";
import { useRoute } from 'vue-router';

export default ({
  data: () => ({
    medico: {},
    edit_bebe: [],
    edit: false,
    edit_aval1: [],
    edit_aval2: [],
    edit_aval3: [],


  }),
  created() {
    this.seeBebe();
    this.seeAval1();
    this.seeAval2();
    this.seeAval3();

  },
  methods: {

    async seeBebe() {
      try {
        //const route = useRoute();
        //console.log(route.query);
        const nseq = this.$route.params
        const res = await this.axios.post(`http://localhost:3000/medico/tabInicial/${nseq.nseq}`);
        this.edit_bebe = res.data;
        this.edit = true;
      } catch (error) {
        console.log(error);
      }
    },

    async seeAval1() {
      try {
        const nseq = this.$route.params
        const res = await this.axios.post(`http://localhost:3000/medico/tabInicial/aval1/${nseq.nseq}`);
        this.edit_aval1 = res.data;
        this.edit = true;
      } catch (error) {
        console.log(error);
      }
    },

    async seeAval2() {
      try {
        const nseq = this.$route.params
        const res = await this.axios.post(`http://localhost:3000/medico/tabInicial/aval2/${nseq.nseq}`);
        console.log(res)
        this.edit_aval2 = res.data;
        this.edit = true;
      } catch (error) {
        console.log(error);
      }
    },
    async seeAval3() {
      try {
        const nseq = this.$route.params
        const res = await this.axios.post(`http://localhost:3000/medico/tabInicial/aval3/${nseq.nseq}`);
        this.edit_aval3 = res.data;
        this.edit = true;
      } catch (error) {
        console.log(error);
      }
    },
  }
})
</script>