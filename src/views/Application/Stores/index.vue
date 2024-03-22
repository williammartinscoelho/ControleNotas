<template>
    <ProgressCircular v-if="loading" :color="colors.warning" />

    <div v-else>
        <v-card :color="colors.secondary" dark>
            <v-card-title>
                <span class="text-warning d-flex">
                    <v-icon small :color="colors.warning" >{{icons.stores}}</v-icon>
                    Lojas
                </span>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    :append-icon="icons.search"
                    label="Buscar"
                    single-line
                    hide-details
                />
            </v-card-title>
            <v-data-table
                class="bg-secondary"
                :headers="headers"
                :items="stores"
                :search="search"
                :footer-props="footerProps"
            >
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon :color="colors.warning" @click="viewItem(item)">
                        {{icons.search}}
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>

        <pre>{{ stores }}</pre>
    </div>
</template>

<script>
import API from "@/api";
import UTILS from "@/utils";
import ProgressCircular from "@/views/Application/Components/ProgressCircular";

export default {
    name: "StoresIndex",
    components: { ProgressCircular },
    data() {
        return {
            search: "",
            headers: [
                { text: "ID", value: "id_store" },
                { text: "Nome", value: "name" },
                { text: "CNPJ", value: "CNPJ_formated" },
                { text: "Endereço", value: "address" },
                { text: "Detalhes", value: "actions", align:"center", sortable: false },
            ],
            stores: [],
            loading: true,
            colors: UTILS.colors(),
            icons: UTILS.icons(),
            footerProps: UTILS.dataTable.footerProps
        };
    },
    async created() {
        this.getStores()
    },
    methods: {
        async getStores() {
            let { stores, error } = await API.getStores()
            stores = stores.map((el) => {
                el.created_at_formated = UTILS.formatDate(el.created_at)
                el.CNPJ_formated = UTILS.formatCNPJ(el.CNPJ)
                return el;
            });

            this.stores = stores
            this.loading = false
        },

        viewItem(item) {
            this.$router.push(`stores/${item.id_store}`)
        }
    }
};
</script>

<style scoped>
</style>