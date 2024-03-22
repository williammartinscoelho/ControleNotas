<template>
    <ProgressCircular v-if="loading" :color="colors.danger" />
        
    <div v-else>
        <v-card :color="colors.secondary" dark>
            <v-card-title>
                <span class="text-danger d-flex">
                    <v-icon small :color="colors.danger">{{icons.products}}</v-icon>
                    Produtos
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
                :items="products"
                :search="search"
                :footer-props="footerProps"
            >
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon :color="colors.danger" @click="viewItem(item)">
                        {{icons.search}}
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
import API from "@/api";
import UTILS from "@/utils";
import ProgressCircular from "@/views/Application/Components/ProgressCircular";

export default {
    name: "ProductsIndex",
    components: { ProgressCircular },
    data() {
        return {
            search: "",
            headers: [
                { text: "ID", value: "id_product" },
                { text: "Nome", value: "name" },
                { text: "Codigo", value: "store_code" },
                { text: "Unidade", value: "unity" },
                { text: "Criado em", value: "created_at_formated", sort: UTILS.sortDate },
                { text: "Detalhes", value: "actions", align:"center", sortable: false },
            ],
            products: [],
            loading: true,
            colors: UTILS.colors(),
            icons: UTILS.icons(),
            footerProps: UTILS.dataTable.footerProps
        };
    },
    created() {
        this.getProducts()
    },
    methods: {
        async getProducts() {
            let { products, error } = await API.getProducts()
            products = products.map((el) => {
                el.created_at_formated = UTILS.formatDate(el.created_at)
                return el
            });

            this.products = products;
            this.loading = false;
        },
        viewItem(item) {
            this.$router.push(`products/${item.id_product}`)
        }
    }
};
</script>

<style scoped>
</style>