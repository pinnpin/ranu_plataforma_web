<template>
    <v-container>
        <v-row justify="center">
            <v-col md="6" sm="6">
                <v-card-title class="text-uppercase">{{user.role}}</v-card-title>
                <v-card-text>
                    <h2>{{user.name}}</h2>
                    <h4>{{user.email}}</h4>
                    <h4>Ações</h4>
                    <h4>Tabela de Pacientes<tr><v-btn elevation="2" fab color="primary" to="/tabInicial"> Ir
                        </v-btn></tr></h4>
                    <h4>Registar Fatores de Risco<tr><v-btn elevation="2" fab color="primary" to="/historico"> Ir
                        </v-btn></tr></h4>
                </v-card-text>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        user: { role:"", name: "", email:""}
    }),
    created: function () {
        this.user = JSON.parse(sessionStorage.getItem('session'));
        if (this.user== null) {
            this.$router.push('/');
        }    
    }
}
</script>