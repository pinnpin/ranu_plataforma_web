<template>
<v-container>
  <v-app-bar app color="primary" dark>
    <v-tool-title>Hospital dos Bombados</v-tool-title>
  </v-app-bar>

<v-col class="text-center" md="2" sm="2"> </v-col>
<v-row justify="center">
    <h2>Identificação do paciente</h2>
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
    </v-simple-table>
</v-row>
</v-container>


</template>

<script>

export default defineComponent({
  setup() {
    

  },
})
</script>
