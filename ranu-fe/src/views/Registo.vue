<template>
<v-container>
  <v-app-bar app color="primary" dark>
    <v-tool-title>Hospital de Braga</v-tool-title>
  </v-app-bar>
  
<v-col class="text-center" md="2" sm="2"> </v-col>
<v-card class="mx-auto" max-width="420" outlined color="#1E88E5">
    <v-row justify="center">
      <v-card-title class="white--text" > Registo </v-card-title>
    </v-row>
</v-card> <br>
<v-row justify="center" >
    <v-col cols="12" md="6">
        <v-form class="ma-3" @submit.prevent="registerNascimento()" ref="addForm"> 
        <v-text-field v-model="add_bebes.numero" label="Número" required>
        </v-text-field>
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
        </v-form>
      <v-btn block class="success mt-3" type="submit">Submeter</v-btn>
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
