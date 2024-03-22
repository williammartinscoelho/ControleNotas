<template>
    <ProgressCircular v-if="loading" :color="colors.danger" />
        
    <div v-else>
        <v-card :color="colors.secondary" dark class="mb-3">
            <v-card-text>
                <div class="d-flex align-center">
                    <div class="mr-3">
                        <v-icon large :color="colors.danger">
                            {{icons.products}}
                        </v-icon>
                    </div>

                    <div>
                        <div>{{product.name}}</div>
                        <div>{{product.cod}}</div>
                    </div>
                </div>
            </v-card-text>
        </v-card>

        <v-card :color="colors.secondary" dark>
            <LineChart :chartData="chartData" />
        </v-card>

        <pre>{{ product }}</pre>
        <pre>{{ chartData }}</pre>
    </div>
</template>

<script>
import API from "@/api";
import UTILS from "@/utils";
import ProgressCircular from "@/views/Application/Components/ProgressCircular";
import LineChart from "@/views/Application/Components/Charts/Line";

export default {
    name: "ProductView",
    components: { ProgressCircular, LineChart },
    data() {
        return {
            product: {
                values: [],
            },
            loading: true,
            colors: UTILS.colors(),
            icons: UTILS.icons(),
        };
    },
    computed: {
        id_product() {
            return this.$route.params.id;
        },

        chartData() {
            const valuesSort = this.product.values.sort(function(a, b) {
                if (a.emitted_at > b.emitted_at) {
                    return 1;
                }
                if (a.emitted_at < b.emitted_at) {
                    return -1;
                }
                return 0;
            })

            const labels = valuesSort.map((item) => UTILS.formatDate(item.emitted_at));
            const data = valuesSort.map((item) => item.value);

            return {
                labels: labels,
                datasets: [
                    {
                        label: "Histórico de preços",
                        backgroundColor: this.colors.danger,
                        data: data,
                    },
                ],
            };
        },
    },
    created() {
        this.getProduct(this.id_product);
    },
    methods: {
        async getProduct(id) {
            let { product, error } = await API.getProduct(id);

            this.product = product;
            this.loading = false;
        },
    },
};
</script>

<style scoped>
</style>