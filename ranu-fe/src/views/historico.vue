<template>
    <v-container class="px-0" fluid>
        <v-card class="mx-auto" max-width="500" outlined color="#1E88E5">
            <v-row justify="center">
                <v-card-title class="white--text"> Histórico do paciente </v-card-title>
            </v-row>
        </v-card> <br>
        <br>
        <v-card class="mx-auto" max-width="500">
            <v-row justify="center">
                <h5> Assinale o que se aplica ao paciente </h5>
            </v-row>
        </v-card>

        <v-app-bar app color="primary" dark>
            <v-tool-title>Hospital de Braga</v-tool-title>
        </v-app-bar>
        <v-form ref="addForm" @submit.prevent="registerHistorico()" class="ma-3">

            <v-row justify="center">
                <v-col class="text-center" md="6">
                    <br>

                    <v-card class="mx-auto" max-width="500">



                        <input type="checkbox" id="histfam" v-model="info.histfam" true-value="true" false-value="false" ></input> <label
                            for="histfam">Historico Familiar de deficiência auditiva cogénita</label>
                        <v-spacer></v-spacer>

                        <input type="checkbox" id="infecong" v-model="info.infecong" value="true"></input> <label
                            for="infecong">Infeção congénita: sífilis, toxoplasmose, rubéola, CMV e herpes</label>
                        <v-spacer></v-spacer>

                        <input type="checkbox" id="anomcranio" v-model="info.anomcranio" value="true"></input> <label
                            for="anomcranio">Anomalias craniofaciais</label>
                        <v-spacer></v-spacer>

                        <input type="checkbox" id="hiperbili" v-model="info.hiperbili" value="true"></input> <label
                            for="hiperbili">Hiper bilirrubinemia com critérios de ensanguinho transfusão</label>
                        <v-spacer></v-spacer>

                        <input type="checkbox" id="baixopeso" v-model="info.baixopeso" value="true"></input> <label
                            for="baixopeso">Baixo peso ao nascer (inferior a 1500g)</label>
                        <v-spacer></v-spacer>

                        <input type="checkbox" id="medototo" v-model="info.medototo" value="true"></input> <label
                            for="medototo">Medicação ototóxica de 5 dias</label>
                        <v-spacer></v-spacer>

                        <input type="checkbox" id="meninbacte" v-model="info.meninbacte" value="true"></input> <label
                            for="meninbacte">Meningite bacteriana</label>
                        <v-spacer></v-spacer>

                        <input type="checkbox" id="indexapgar" v-model="info.indexapgar" value="true"></input> <label
                            for="indexapgar">Índice de APGAR 0 a 4 no 1'/ 0 a 6 no 5</label>
                        <v-spacer></v-spacer>

                        <input type="checkbox" id="ventmec" v-model="info.ventmec" value="true"></input> <label
                            for="ventmec">Ventilação Mecânica de 5 dias</label>
                        <v-spacer></v-spacer>
                        <input type="checkbox" id="hipoacusia" v-model="info.hipoacusia" value="true"></input> <label
                            for="hipoacusia">Sinais ou síndromes associadas a hipoacusia</label>

                    </v-card>
                </v-col>
            </v-row><br>
            <br>
            <v-row justify="center">
                <v-btn class="primary mt-3" justify="center" type="submit">Submeter</v-btn>
            </v-row>
        </v-form>

    </v-container>

</template>



<script>

export default ({
    data: () => ({

        info: {},
        lista_info: [],
        add: false



    }),

    methods: {

        async registerHistorico() {
            let valid = this.$refs.addForm.validate();
            if (valid) {
                try {
                    const nseq = this.$route.params
                    console.log(this.info)
                    const res = await this.axios.post(`http://localhost:3000/medico/historico/${nseq.nseq}`, this.info);
                    console.log(res)
                    this.lista_info.push(res.data.fatores && nseq.nseq);
                    console.log(this.lista_info)
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
}

    /* created: async function() {
         const nseq = this.$route.params
         const fatoresrisco = new FormData()
         fatoresrisco.append("nseq", nseq.nseq)
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
 }*/
)

</script>

