<template>
<v-container>
    <v-app-bar app color="primary" dark>
    <v-tool-title>Hospital de Braga</v-tool-title>
  </v-app-bar>
    <h2 class="font-weight-light">Bem-vindo(a) </h2>
<v-spacer></v-spacer>
<v-text-field v-model="search" append-icon="mdi-magnify" label="search" single-line hide-details>
</v-text-field>
    <v-row justify="center">
        <v-col md="9" sm="12">
            <v-simple-table fixed-header>
                <thead>
                    <tr>
                        <th class="text-center">ID</th>
                        <th class="text-center">Nome</th>
                        <th class="text-center">Fase</th>
                        <th class="text-center">Ações</th>
                    </tr>
                </thead>
                <v-card class="ma-3" max-width="" v-for="nascimento in nascimentosList" :key="nascimento.nseq" :nascimento="nascimento">
                <tbody>
                    <tr>
                        <td class="text-left">{{nascimento.numero}}</td>
                        <td class="text-center">{{nascimento.nome}}</td>
                       <v-btn color="blue" small dark fab @click="$router.push(`tabInicial/${nascimento.nseq}`)">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
            <v-btn color="blue" small dark fab @click="$router.push(`historico/${nascimento.nseq}`)">
            <v-icon>mdi-pencil</v-icon>     </v-btn>
            <v-icon medium @click="deleteNascimento(nascimento.nseq)"> mdi-delete </v-icon>
                    </tr>
                    </tbody>
                    </v-card>
            </v-simple-table>
        </v-col>
    </v-row>
</v-container>
   
</template>

<script>
import { toRefs } from "vue";




export default ({
   data: () => ({
       medico: {},
       nascimentosList: [],
       nascimentosVer: {},
       alert: {show: false},
       state: "loading",
       error: ""
   }),
   created() {
       this.loadNascimentos();
   },
   methods: {

       async loadNascimentos() {
           try {
               const res = await this.axios.post('http://localhost:3000/medico/tabInicial');
               console.log(res)
               this.nascimentosList = res.data;

               ///this.nascimentos = await nascimentos.json();
               ///this.state = "ready";
           } catch (err) {
               this.error = err;
               this.state = "error"
           }
       },
       async seeBebe(nseq) {
            try {
                const res = await this.axios.post(`http://localhost:3000/medico/tabInicial/${nseq}`);
                this.edit_bebe = res.data;
                console.log(this.edit_bebe)
                this.edit = true;
            } catch (error) {
                console.log(error);
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
   
});

</script>
