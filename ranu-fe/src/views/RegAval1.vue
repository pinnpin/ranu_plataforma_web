<template>
<v-container>
  <v-app-bar app color="primary" dark>
    <v-tool-title>Hospital dos Bombados</v-tool-title>
  </v-app-bar>
    <v-alert text v-model="alert.show" :type="alert.type" dismissible>{{alert.message}}
    </v-alert>

    <h1 class="font-weight-light" >Registo da 1ª Avaliação</h1>

<v-simple-table></v-simple-table>
<v-row>
    <v-col cols="12" md="6">
      <v-form class="ma-3" @submit.prevent="registerAval1()" ref="addForm"> 
    
     <v-text-field v-model="add_aval.numero" label="Número" required>
    </v-text-field>
    <v-text-field v-model="add_aval.numseq" label="Número de Seq" required>
        </v-text-field>
        <v-text-field v-model="add_aval.avaliacao" label="Avaliação" required>
        </v-text-field>
        <v-text-field v-model="add_aval.data_avaliacao" label="Data da Avaliação" required>
        </v-text-field>
        <v-text-field  v-model="add_aval.nmec_avaliador" label="ID Avaliador" required>
        </v-text-field>
        <v-text-field v-model="add_aval.opcao" label="Opção" required>
        </v-text-field>
        <v-text-field v-model="add_aval.data_reavaliacao"  label="Data da Reavaliação" required>
        </v-text-field> 
        <v-text-field v-model="add_aval.a_reavaliador" label="ID Reavaliador" required> 
        </v-text-field>
        
<v-btn block class="success mt-3" type="submit">Submeter</v-btn>

</v-form>
 </v-col>
</v-row>
</v-container>
</template>



<script>

export default ({
    data: () => ({
        alert: { show: false, message: ''}, 
        medico: {},
        lista_aval:[],
        add_aval: [],
        edit_aval: [],
        newAvaliacao1: {},
        add: false,
        edit: false

    }),
    methods: {
        async registerAval1() {
            let valid= this.$refs.addForm.validate();
            if (valid) {
              ///this.add_aval.id = this.tecnico.id
              try {
                const newAvaliacao1 = new FormData();
                newAvaliacao1.append("numero", this.add_aval.numero);
                newAvaliacao1.append("nseq", this.add_aval.nseq);
                newAvaliacao1.append("avaliacao", this.add_aval.avaliacao);
                newAvaliacao1.append("data_avaliacao", this.add_aval.data_avalicao);
                newAvaliacao1.append("nmec_avaliador", this.add_aval.nmec_avaliador);
                newAvaliacao1.append("opcao", this.add_aval.opcao);
                newAvaliacao1.append("data_reavaliacao", this.add_aval.data_reavaliacao);
                newAvaliacao1.append("a_reavaliador", this.add_aval.a_reavaliador);

                

                const res = await this.axios.post('http://localhost:3000/medico/avaliacao/primeira', newAvaliacao1);
                this.lista_aval.push(res.data.avaliacao1);
                this.$refs.addForm.reset();
                this.add = false;
                this.alert = {
                  show: true,
                  type: 'success',
                  message: res.data.message
                };
        } catch (error) {
          console.log(error);

        }

      }
    }
  }
})

</script>
