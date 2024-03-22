<template>
    <ProgressCircular v-if="loading" :color="colors.info" />
        
    <div v-else>
        <Table-notes :notes="notes" />

        <v-card :color="colors.secondary" dark class="mb-3">
            <BarChart :chartData="chartData" />
        </v-card>

        <v-card :color="colors.secondary" dark>
            <BarChart :chartData="chartDataMonth" />
        </v-card>
        
        <pre>{{ notes }}</pre>
    </div>
</template>

<script>
import API from "@/api";
import UTILS from "@/utils";
import ProgressCircular from "@/views/Application/Components/ProgressCircular";
import TableNotes from '@/views/Application/Notes/Components/TableNotes';
import BarChart from "@/views/Application/Components/Charts/Bar";

export default {
    name: "NotesIndex",
    components: { ProgressCircular, TableNotes, BarChart},
    data() {
        return {
            notes: [],
            loading: true,
            colors: UTILS.colors(),
        };
    },
    computed: {
        chartData() {
            const notesSort = this.notes.sort(function (a, b) {
                if (a.emitted_at > b.emitted_at) {
                    return 1;
                }
                if (a.emitted_at < b.emitted_at) {
                    return -1;
                }
                return 0;
            });

            const labels = notesSort.map((item) => item.emitted_at_formated);
            const data = notesSort.map((item) => item.value);

            return {
                labels: labels,
                datasets: [
                    {
                        label: "Gasto por nota",
                        backgroundColor: this.colors.info,
                        data: data,
                    },
                ],
            };
        },
        chartDataMonth() {
            // group by month and sum values
            const grouped = this.notes.reduce((acc, curr) => {
                const key = curr.emitted_at.substring(0, 7);
                if (!acc[key]) {
                    acc[key] = {
                        month: key,
                        value: parseFloat(curr.value),
                    };
                } else {
                    acc[key].value =
                        parseFloat(acc[key].value) + parseFloat(curr.value);
                }
                return acc;
            }, {});

            const labels = Object.keys(grouped).map((el) =>
                el.split("-").reverse().join("/")
            );
            const values = Object.values(grouped).map((el) =>
                el.value.toFixed(2)
            );

            return {
                labels: labels,
                datasets: [
                    {
                        label: "Gasto por mês",
                        backgroundColor: this.colors.info,
                        data: values,
                    },
                ],
            };
        },
    },
    created() {
        this.getNotes();
    },
    methods: {
        async getNotes() {
            let { invoices, error } = await API.getNotes();
            this.notes = invoices.map((el) => {
                el.created_at_formated = UTILS.formatDate(el.created_at);
                el.emitted_at_formated = UTILS.formatDate(el.emitted_at);
                el.value_formated = UTILS.formatMoney(el.value);
                return el;
            });
            this.loading = false;
        },
    },
};
</script>

<style scoped>

</style>