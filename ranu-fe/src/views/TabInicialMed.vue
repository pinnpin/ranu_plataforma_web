<template>

    <v-data-table :headers="headers" :items="nascimentosList" :items-per-page="15" class="elevation-1"
     :search="search">

        <template v-slot:top>
            <v-app-bar app color="primary" dark>
                <v-tool-title>Hospital de Braga</v-tool-title>
            </v-app-bar>
            <h2 class="font-weight-light">Bem-vindo(a), {{ user.name }}</h2>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
            <v-spacer></v-spacer>
        </template>

        <template v-slot:item.actions="{ item }">
            <div class="text-truncate">
                <v-icon small class="mr-2" @click="historico(item)" color="primary">
                    mdi-pencil
                </v-icon>
                <v-icon small class="mr-2" @click="deleteNascimento(item)" color="pink">
                    mdi-delete
                </v-icon>
                <v-icon small class="mr-2" @click="openDetails(item)" color="blue">
                    mdi-eye
                </v-icon>
            </div>
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
            search: "",
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
        this.historico();

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
                console.log(this.nascimentosList.nseq)
                this.$router.push(`historico/${nascimentosList.nseq}`);
            } catch (err) {
                this.error = err;
                this.state = "error"
            }

        },

        async deleteNascimento(nascimentosList) {
            try {
                if (confirm('Tem a certeza que pretende apagar este registo?')) {
                const res = await this.axios.delete(`http://localhost:3000/medico/delete/${nascimentosList.nseq}`);
                window.location.reload();
                const index = this.nascimentosList.findIndex(c => c.nseq == nseq);
                this.nascimentosList.splice(index, 1);
                }
                ///this.alert = {
                ///    show: true,
                ///    type: "info",
                ///    message: res.data.message
            
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>