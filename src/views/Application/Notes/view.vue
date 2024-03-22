<template>
    <ProgressCircular v-if="loading" :color="colors.info" />

    <div v-else>
        <v-card :color="colors.primary" dark>
            <div style="position: absolute; right:0;">
                <v-btn icon :href="invoice.link" target="_blank">
                    <v-icon>{{icons.openLink}}</v-icon>
                </v-btn>
            </div>

            <v-card-text>
                <div>
                    <div class="text-center">{{invoice.store.name}}</div>
                    <div class="text-center">CNPJ: {{invoice.store.CNPJ}}</div>
                    <div class="text-center">{{invoice.store.address}}</div>
                </div>

                <v-divider />
                
                <div>
                    <v-text-field
                        v-model="search"
                        :append-icon="icons.search"
                        label="Buscar"
                        single-line
                        hide-details
                        class="mb-3"
                    />
                </div>
                <div>
                    <div v-for="(product, index) in invoice.products" :key="product.id_product+index" class="d-flex align-center py-2">
                        <div>
                            <div>{{product.name}}&emsp;|&emsp;(Código: {{product.store_code}})</div>
                            <div>Qtde.: <span class="text-info">{{product.amount}}</span> &emsp;|&emsp;
                            UN: <span class="text-warning">{{product.unity}}</span> &emsp;|&emsp;
                            Vl. Unit.: <span class="text-success">{{product.value_formated}}</span></div>
                        </div>
                        <v-divider class="flex-grow-1" />
                        <div class="text-right">TOTAL<br><span class="text-success">{{product.amount_value_formated}}</span></div>
                    </div>
                    
                    <v-divider class="mb-3" />

                    <div class="text-right">
                        <div>Qtde. total de itens: <span class="text-warning">{{invoice.products.length}}</span></div>
                        <div>Valor pago: <span class="text-danger">{{invoice.value_formated}}</span> | {{totalProductsValue}}</div>
                        <div>Forma de cadastro: <span class="text-info">{{invoice.input_type}}</span></div>
                        <div>Comentários: <span class="text-warning">{{invoice.comments}}</span></div>
                    </div>
                </div>
            </v-card-text>
        </v-card>

        <pre>{{invoice}}</pre>
    </div>
</template>

<script>
import API from "@/api";
import UTILS from "@/utils";
import ProgressCircular from "@/views/Application/Components/ProgressCircular";

export default {
    name: "NoteView",
    components: { ProgressCircular },
    data() {
        return {
            invoice: {},
            search: "",
            colors: UTILS.colors(),
            icons: UTILS.icons(),
            loading: true,
        };
    },
    computed: {
        id_invoice() {
            return this.$route.params.id
        },
        totalProductsValue() {
            return this.invoice.products.reduce(function(total, product) {
                return total + parseFloat(product.amount_value);
            }, 0);
        } 
    },
    created() {
        this.getNote(this.id_invoice)
    },
    methods: {
        async getNote(id) {
            let { invoice, error } = await API.getNote(id)
            
            if (!UTILS.emptyObject(invoice)) {
                alert('')
                invoice.created_at_formated = UTILS.formatDate(invoice.created_at)
                invoice.emitted_at_formated = UTILS.formatDate(invoice.emitted_at)
                invoice.value_formated = UTILS.formatMoney(invoice.value)
                invoice.store.CNPJ_formated = UTILS.formatCNPJ(invoice.store.CNPJ)

                invoice.products = invoice.products.map((el) => {
                    el.amount_value_formated = UTILS.formatMoney(el.amount_value)
                    el.value_formated = UTILS.formatMoney(el.value)
                    el.created_at_formated = UTILS.formatDate(el.created_at)
                    return el
                });
            }

            this.invoice = invoice
            this.loading = false
            
        }
    },

};
</script>

<style scoped>
</style>