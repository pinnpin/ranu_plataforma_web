<template>
<v-container>
  <v-app-bar app color="primary" dark>
    <v-tool-title>Hospital de Braga</v-tool-title>
  </v-app-bar>

  <v-card class="mx-auto" max-width="600" outlined color="#1E88E5">
    <v-row justify="center">
      <v-card-title class="white--text" > Identificação do paciente </v-card-title>
    </v-row>
  </v-card> <br>
  <br>

<v-row justify="center" md="8" sm="8">
    <v-simple-table fixed-header>
                <thead>
                    <tr>
                        
                        <th class="text-center">ID</th>
                        <th class="text-center">Processo</th>
                        <th class="text-center">Nome</th>
                        <th class="text-center">Data de Nascimento</th>
                        <th class="text-center">Hora</th>
                        <th class="text-center">Gestação</th>
                        <th class="text-center">Peso</th>
                        <th class="text-center">Sexo</th>
                    </tr>
                </thead>
               
  </v-simple-table>
  
  <v-simple-table> 
    
    <v-card class="ma-3" max-width="" v-for="edit in edit_bebe" :key="edit.nseq">
               <tbody>
               <tr>
                        <th class="text-left">{{edit.numero}}</th>
                        <td class="text-center">{{edit.nseq}}</td>
                        <td class="text-left">{{edit.nome}}</td>
                        <td class="text-center">{{edit.dta_nascimento}}</td>
                        <td class="text-left">{{edit.hora}}</td>
                        <td class="text-center">{{edit.gestacao}}</td>
                        <td class="text-left">{{edit.peso}}</td>
                        <td class="text-center">{{edit.sexo}}</td>
                       
                    </tr>
                    </tbody>
                    </v-card>
               
                
    </v-simple-table>
</v-row>
</v-container>


</template>

<script>
import router from "@/router";
import {useRoute} from 'vue-router';

export default ({
  data: () => ({
    medico: {},
    edit_bebe: [],
    edit: false,


    

  }),
  created() {
       this.seeBebe();
   },
  methods: {

    async seeBebe() {
            try {
              //const route = useRoute();
              //console.log(route.query);
              const nseq = this.$route.params
              console.log(nseq.nseq)
              const res = await this.axios.post(`http://localhost:3000/medico/tabInicial/${nseq.nseq}`);
              console.log(res)
              this.edit_bebe = res.data;
              console.log(this.edit_bebe)
              this.edit = true;
            } catch (error) {
                console.log(error);
            }
    },
  }
})
</script>
