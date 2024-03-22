<template>
    <ProgressCircular v-if="loading" :color="colors.warning" />

    <div v-else>
        <v-card :color="colors.secondary" dark class="mb-3">
            <v-card-text>
                <div class="d-flex align-center">
                    <div class="mr-3">
                        <v-icon large :color="colors.warning">
                            {{icons.stores}}
                        </v-icon>
                    </div>

                    <div class="flex-grow-1">
                        <div>{{store.name}}</div>
                        <div>
                            {{store.address}}
                            <a :href="`https://maps.google.com/?q=${store.address}`" target="_blank">
                                <v-icon small :color="colors.warning">
                                    {{icons.maps}}
                                </v-icon>
                            </a>
                        </div>
                        <div>
                            {{store.CNPJ_formated}}
                            <a :href="`https://cnpjs.rocks/cnpj/${store.CNPJ}`" target="_blank">
                                <v-icon small :color="colors.warning">
                                    {{icons.search}}
                                </v-icon>
                            </a>
                        </div>
                    </div>
                </div>
            </v-card-text>
        </v-card>

        <Table-notes :notes="store.notes" :show-create-link="false" />

        <pre>{{store}}</pre>
    </div>
</template>

<script>
import API from "@/api";
import UTILS from "@/utils";
import ProgressCircular from "@/views/Application/Components/ProgressCircular";
import TableNotes from "@/views/Application/Notes/Components/TableNotes";

export default {
    name: "StoreView",
    components: { ProgressCircular, TableNotes },
    data() {
        return {
            store: null,
            loading: true,
            colors: UTILS.colors(),
            icons: UTILS.icons(),
        };
    },
    computed: {
        id_store() {
            return this.$route.params.id;
        },
    },
    created() {
        this.getStoreAndNotes(this.id_store);
    },
    methods: {
        async getStoreAndNotes(id) {
            let { store, error } = await API.getStoreAndNotes(id);
            
            store.CNPJ_formated = UTILS.formatCNPJ(store.CNPJ);

            store.notes = store.notes.map(note => {
                note.value_formated = UTILS.formatMoney(note.value);
                note.emitted_at_formated = UTILS.formatDate(note.emitted_at);
                return note;
            });

            this.store = store;
            this.loading = false;
        }
    },

};
</script>

<style scoped>
</style>