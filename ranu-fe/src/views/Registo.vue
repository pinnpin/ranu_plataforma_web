<template>
<v-container>
  <v-app-bar app color="primary" dark>
    <v-tool-title>Hospital dos Bombados</v-tool-title>
  </v-app-bar>
    <v-alert text v-model="alert.show" :type="alert.type" dismissible>{{alert.message}}
    </v-alert>

    <h1 class="font-weight-light" >Novo Registo</h1>

<v-simple-table></v-simple-table>
<v-row>
    <v-col cols="12" md="6">
      <v-form ref="addForm" @submit.prevent="registerNascimento()" class="ma-3" > 
    
    <v-text-field v-model="add_bebes.nseq" label="Número de Seq" required>
    </v-text-field>
    <v-text-field v-model="add_bebes.processo" label="Número de Processo" required>
    </v-text-field>
    <v-text-field v-model="add_bebes.nome" label="Nome" required>
    </v-text-field>
    <v-text-field v-model="add_bebes.dta_nascimento" label="Data de Nascimento" required>
    </v-text-field>
    <v-text-field  v-model="add_bebes.hora" label="Hora" required>
    </v-text-field>
    <v-text-field v-model="add_bebes.gestacao" label="Gestação" required>
    </v-text-field>
    <v-text-field v-model="add_bebes.peso"  label="Peso" required>
    </v-text-field> 
    <v-text-field v-model="add_bebes.sexo" label="Sexo" required> 
    </v-text-field>
    <v-text-field v-model="add_bebes.purperio"  label="Purpério" required>
    </v-text-field>
    <v-text-field v-model="add_bebes.local_nasc"  label="Local de Nascimento" required>
    </v-text-field>
    <v-text-field v-model="add_bebes.apgar1"  label="APGAR1" required>
    </v-text-field>
    <v-text-field v-model="add_bebes.apgar5"  label="APGAR5" required>
    </v-text-field>



<v-btn block class="success mt-3" type="submit">Submeter</v-btn>

</v-form>
<v-btn to="/profile" elevation="2" color="primary" outlined >Voltar à Pagina Inicial</v-btn>

 </v-col>
</v-row>
</v-container>
</template>

<script>

export default ({
    data: () => ({
        alert: { show: false, message: ''}, 
        tecnico: {},
        lista_bebes:[],
        add_bebes: {},
        edit_bebe: {},
        newNascimento: {},
        add: false,
        edit: false

    }),
    methods: {
      
      async registerNascimento() {
            let valid= this.$refs.addForm.validate();
            if (valid) {
              ///this.add_bebes.id = this.tecnico.id
              try {

                const res = await this.axios.post("http://localhost:3000/tecnico/nascimento", this.add_bebes);
                this.lista_bebes.push(res.data.nascimento);
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
