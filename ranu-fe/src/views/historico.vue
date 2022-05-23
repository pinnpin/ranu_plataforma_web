<template>
    <v-container class="px-0" fluid>
        <h1>Histórico do Paciente</h1>
        <h4>Assinale o que se aplica ao paciente</h4>
    <v-app-bar app color="primary" dark>
    <v-tool-title>Hospital dos Bombados</v-tool-title>
  </v-app-bar>
    <v-checkbox v-mode="selected" label="Historico Familiar de deficiência auditiva cogénita"
    ></v-checkbox>
     <v-checkbox v-mode="selected" label="Infeção congénita: sífilis, toxoplasmose, rubéola, CMV e herpes"
    ></v-checkbox>
     <v-checkbox v-mode="selected" label="Anomalias craniofaciais"
    ></v-checkbox>
     <v-checkbox v-mode="selected" label="Hiper bilirrubinemia com critérios de ensanguinho transfusão"
    ></v-checkbox>
     <v-checkbox v-mode="selected" label="Baixo peso ao nascer (inferior a 1500g)"
    ></v-checkbox> 
     <v-checkbox v-mode="selected" label="Medicação ototóxica de 5 dias"
    ></v-checkbox>
    <v-checkbox v-mode="selected" label="Meningite bacteriana"
    ></v-checkbox>
    <v-checkbox v-mode="selected" label="Índice de APGAR 0 a 4 no 1'/ 0 a 6 no 5'"
    ></v-checkbox>
    <v-checkbox v-mode="selected" label="Ventilação Mecânica de 5 dias"
    ></v-checkbox>
    <v-checkbox v-mode="selected" label="Sinais ou síndromes associadas a hipoacusia"
    ></v-checkbox>

    <v-btn class="primary mt-3" justify="center" type="submit">Submeter</v-btn>
  </v-container>
</template>

<script>

export default ({
    data() {
        return {
            checkbox:true
        }
        
    },
})
</script>
