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
                        <th class="text-center">Estado</th>
                        <th class="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center">1</td>
                        <td class="text-center">Ana</td>
                        <td class="text-center">1ª Fase</td>
                        <td class="text-center"> <v-icon color="blue" medium class="mr-6" @click="seeItem(item)"> mdi-eye
                        </v-icon>
                        <v-icon medium class="mr-6" @click="editItem(item)"> mdi-pencil
                        </v-icon>
                        <v-icon medium @click="deleteItem(item)"> mdi-delete
                        </v-icon> </td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-col>
    </v-row>
</v-container>
   
</template>

<script>


export default ({
   components: {
       medico: {},
       numero: {}
   },
   created: function() {
       this.medico = JSON.parse(sessionStorage.getItem('session'));
       console.log(this.medico);
   }
})
</script>
