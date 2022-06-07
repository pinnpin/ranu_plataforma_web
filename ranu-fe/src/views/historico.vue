<template>
    <v-container class="px-0" fluid>
        <h1>Histórico do Paciente</h1>
        <h4>Assinale o que se aplica ao paciente</h4>
    <v-app-bar app color="primary" dark>
    <v-tool-title>Hospital dos Bombados</v-tool-title>
  </v-app-bar>
  <form>
 <v-checkbox label="Historico Familiar de deficiência auditiva cogénita" v-model="checkbox" value="true"
    ></v-checkbox>
    <label>{{checkbox}}</label>
     <v-checkbox label="Infeção congénita: sífilis, toxoplasmose, rubéola, CMV e herpes" v-model="checkbox1" value="true"
    ></v-checkbox>
     <v-checkbox label="Anomalias craniofaciais" v-model="checkbox2" value="true"
    ></v-checkbox>
     <v-checkbox label="Hiper bilirrubinemia com critérios de ensanguinho transfusão" v-model="checkbox3" value="true"
    ></v-checkbox>
     <v-checkbox label="Baixo peso ao nascer (inferior a 1500g)" v-model="checkbox4" value="true"
    ></v-checkbox> 
     <v-checkbox label="Medicação ototóxica de 5 dias" v-model="checkbox5" value="true"
    ></v-checkbox>
    <v-checkbox label="Meningite bacteriana" v-model="checkbox6" value="true"
    ></v-checkbox>
    <v-checkbox label="Índice de APGAR 0 a 4 no 1'/ 0 a 6 no 5'" v-model="checkbox7" value="true"
    ></v-checkbox>
    <v-checkbox label="Ventilação Mecânica de 5 dias" v-model="checkbox8" value="true"
    ></v-checkbox>
    <v-checkbox label="Sinais ou síndromes associadas a hipoacusia" v-model="checkbox9"
    ></v-checkbox>
    <v-btn block class="primary mt-3" justify="center" type="submit">Submeter</v-btn>

    </form>


  </v-container>
</template>

<script>

export default ({
    data() {
        return {
            checkbox:false,
            checkbox1:false,
            checkbox2:false,
            checkbox3:false,
            checkbox4:false,
            checkbox5:false,
            checkbox6:false,
            checkbox7:false,
            checkbox8:false,
            checkbox9:false

        }
        
    },

    created: async function() {
        const fatoresrisco = new FormData()
        fatoresrisco.append("histfam", this.checkbox)
        fatoresrisco.append("infecong", this.checkbox1)
        fatoresrisco.append("anomcranio", this.checkbox2)
        fatoresrisco.append("baixopeso", this.checkbox3)
        fatoresrisco.append("medototo", this.checkbox4)
        fatoresrisco.append("meninbacte", this.checkbox5)
        fatoresrisco.append("indexapgar", this.checkbox6)
        fatoresrisco.append("ventmec", this.checkbox7)
        fatoresrisco.append("hipoacusia", this.checkbox8)
        fatoresrisco.append("histfam", this.checkbox9)
        const res = await this.axios.post("http://localhost:3000/historico", fatoresrisco)
}
})

</script>


