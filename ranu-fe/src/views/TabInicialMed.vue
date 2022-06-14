<template>

    <v-data-table :headers="headers" :items="nascimentosList" :items-per-page="15" class="elevation-1"
        @click:row="openDetails">

        <template v-slot:top>
            <v-app-bar app color="primary" dark>
                <v-tool-title>Hospital de Braga</v-tool-title>
            </v-app-bar>
            <h2 class="font-weight-light">Bem-vindo(a), {{ user.name }}</h2>
            <v-spacer></v-spacer>


        </template>

        <template v-slot:item.actions="{ nascimentosList }">

            <v-icon small class="mr-2" @click="$router.push(`historico/${nseq}`)">
                mdi-pencil</v-icon>
            <v-icon small class="mr-2" @click="deleteNascimento(nascimentosList)"> mdi-delete </v-icon>

        </template>

        <template v-slot:item.fase="{ fase_atual }">


        </template>

    </v-data-table>



</template>

<script>
import { toRefs } from "vue";


export default {
    data() {
        return {
            headers: [
                {
                    text: 'Número',
                    align: 'start',
                    sortable: false,
                    value: 'numero',
                },
                { text: 'Nome', value: 'nome' },
                { text: 'Número Seq', value: 'nseq' },
                { text: 'Data de Nascimento', value: 'dta_nascimento' },
                { text: 'Fase', value: 'fase' },
                { text: 'Ações', value: 'actions' },
            ],
            nascimentosList: [],

            lastSelectedItem: null,

            user: { role: "", name: "", email: "" }
        }
    },
    created() {

        this.loadNascimentos();
        this.getInfo();

    },


    methods: {

        async getFase() {

            

        },

        async getInfo() {
            try {
                this.user = JSON.parse(sessionStorage.getItem('session'));
                console.log(user)
                if (this.user == null) {
                    this.$router.push('/');
                }
            } catch (err) {
                this.error = err;
                this.state = "error"
            }

        },
        async loadNascimentos() {
            try {
                const res = await this.axios.post('http://localhost:3000/medico/tabInicial');
                console.log(res)
                this.nascimentosList = res.data;
                console.log(this.nascimentosList)
                ///this.nascimentos = await nascimentos.json();
                ///this.state = "ready";
            } catch (err) {
                this.error = err;
                this.state = "error"
            }
        },

        async openDetails(nascimentosList) {
            try {
                this.$router.push(`tabInicial/${nascimentosList.nseq}`)
            } catch (err) {
                this.error = err;
                this.state = "error"
            }
        },

        async historico(nascimentosList) {
            try {
                this.$router.push(`historico/${nascimentosList.nseq}`);
            } catch (err) {
                this.error = err;
                this.state = "error"
            }

        },

        async deleteNascimento(nascimentosList) {
            try {
                const res = await this.axios.delete(`http://localhost:3000/tecnico/delete/${nascimentosList.nseq}`);
                const index = this.nascimentosList.findIndex(c => c.nseq == nseq);
                this.nascimentosList.splice(index, 1);
                this.alert = {
                    show: true,
                    type: "info",
                    message: res.data.message
                };
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>