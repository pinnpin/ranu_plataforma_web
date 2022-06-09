<template>
    <v-container class="px-0" fluid>
        <v-card class="mx-auto" max-width="500" outlined color="#1E88E5">
            <v-row justify="center">
                <v-card-title class="white--text" > Histórico do paciente </v-card-title>
            </v-row>
        </v-card> <br>
        <br>    
        <v-card class="mx-auto" max-width="500" >
            <v-row justify="center">
                <h5> Assinale o que se aplica ao paciente </h5>
             </v-row>
        </v-card>
        
        <v-app-bar app color="primary" dark>
            <v-tool-title>Hospital de Braga</v-tool-title>
        </v-app-bar>
        <v-form ref="addForm" @submit.prevent="registerHistorico()" class="ma-3" > 

        <v-row justify="center">
            <v-col  class="text-center" md="6">
                <br>

<v-card class="mx-auto" max-width="500" >

 <v-checkbox label="Historico Familiar de deficiência auditiva cogénita" v-model="checkbox" value="true"
    ></v-checkbox>
    <label>{{checkbox}}</label>
     <v-checkbox label="Infeção congénita: sífilis, toxoplasmose, rubéola, CMV e herpes" v-model="info.checkbox1" value="true"
    ></v-checkbox>
     <v-checkbox label="Anomalias craniofaciais" v-model="info.checkbox2" value="true"
    ></v-checkbox>
     <v-checkbox label="Hiper bilirrubinemia com critérios de ensanguinho transfusão" v-model="info.checkbox3" value="true"
    ></v-checkbox>
     <v-checkbox label="Baixo peso ao nascer (inferior a 1500g)" v-model="info.checkbox4" value="true"
    ></v-checkbox> 
     <v-checkbox label="Medicação ototóxica de 5 dias" v-model="info.checkbox5" value="true"
    ></v-checkbox>
    <v-checkbox label="Meningite bacteriana" v-model="info.checkbox6" value="true"
    ></v-checkbox>
    <v-checkbox label="Índice de APGAR 0 a 4 no 1'/ 0 a 6 no 5'" v-model="info.checkbox7" value="true"
    ></v-checkbox>
    <v-checkbox label="Ventilação Mecânica de 5 dias" v-model="info.checkbox8" value="true"
    ></v-checkbox>
    <v-checkbox label="Sinais ou síndromes associadas a hipoacusia" v-model="info.checkbox9"
    ></v-checkbox>
    
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
    data() {
        return {
            info: {},
            checkbox:false,
            checkbox1:false,
            checkbox2:false,
            checkbox3:false,
            checkbox4:false,
            checkbox5:false,
            checkbox6:false,
            checkbox7:false,
            checkbox8:false,
            checkbox9:false,
            lista_info:[],
            add: false

        }
        
    },

    methods: {
        
        async registerHistorico() {
            let valid = this.$refs.addForm.validate();
            if (valid) {
                try {
                    const nseq = this.$route.params
                    console.log(nseq.nseq)
                    const res = await this.axios.post(`http://localhost:3000/medico/historico/${nseq.nseq}`, this.info);
                    this.lista_info.push(res.data.fatores);
                    this.$refs.addForm.reset();
                    this.add=false;
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


