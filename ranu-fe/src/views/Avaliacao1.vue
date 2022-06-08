<template>
<v-container>
  <v-app-bar app color="primary" dark>
    <v-tool-title>Hospital dos Bombados</v-tool-title>
  </v-app-bar>

<v-col class="text-center" md="2" sm="2"> </v-col>
<v-row justify="center">
    <h2>1ª Avaliação</h2>
</v-row>

<v-row justify="center" md="8" sm="8">
    <v-simple-table fixed-header>
                <thead>
                    <tr>
                        <th class="text-center">ID</th>
                        <th class="text-center">Processo</th>
                        <th class="text-center">Nomr</th>
                        <th class="text-center">Data de Nascimento</th>
                        <th class="text-center">Hora</th>
                        <th class="text-center">Gestação</th>
                        <th class="text-center">Peso</th>
                        <th class="text-center">Sexo</th>
                    </tr>
                </thead> 
                <v-card class="ma-3" max-width="" v-for="nascimento in nascimentosList" :key="nascimento.nseq" :nascimento="nascimento">
                    <tr>
                        <td class="text-left">{{nascimento.numero}}</td>
                        <td class="text-center">{{nascimento.nome}}</td>
                        <td class="text-right"> <v-icon color="blue" medium class="mr-6" @click="seeBebe(nascimento.nseq)"> mdi-eye
                        </v-icon>
                        <v-icon medium class="mr-6" @click="editItem(item)"> mdi-pencil
                        </v-icon>
                        <v-icon medium @click="deleteItem(item)"> mdi-delete
                        </v-icon> </td>
                    </tr>
                    </v-card>
    </v-simple-table>
</v-row>
</v-container>


</template>

<script>

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
               const res = await this.axios.post('http://localhost:3000/medico//avaliacao/primeira');
               this.nascimentosList = res.data;

               ///this.nascimentos = await nascimentos.json();
               ///this.state = "ready";
           } catch (err) {
               this.error = err;
               this.state = "error"
           }
       }
   }
   
});

</script>
