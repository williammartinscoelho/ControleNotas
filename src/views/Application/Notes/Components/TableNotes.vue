<template>
    <v-card :color="colors.secondary" dark class="mb-3">
        <v-card-title>
            <span class="mr-3 text-info d-flex">
                <v-icon small :color="colors.info">{{icons.notes}}</v-icon>
                Notas Fiscal
            </span>
            <v-btn
                v-if="showCreateLink"
                class="bg-primary"
                elevation="2"
                icon
                small
                @click="toCreate"
            >
                <v-icon>{{icons.create}}</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                :append-icon="icons.search"
                label="Buscar"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
            class="bg-secondary"
            :headers="headers"
            :items="notes"
            :search="search"
            :footer-props="footerProps"
        >
            <template v-slot:[`item.link`]="{ item }">
                <a :href="item.link" target="_blank">
                    <v-icon small :color="colors.info">{{icons.openLink}}</v-icon>
                </a>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon :color="colors.info" @click="viewItem(item)">
                    {{icons.search}}
                </v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import UTILS from "@/utils";

export default {
    name: "TableNotes",
    props: {
        notes: {
            type: Array,
            required: true,
        },
        showCreateLink: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            search: "",
            headers: [
                { text: "ID", value: "id_invoice" },
                { text: "Valor", value: "value_formated", sort: UTILS.sortValue },
                { text: "Link", value: "link" },
                { text: "Emitida em", value: "emitted_at_formated", sort: UTILS.sortDate },
                { text: "Detalhes", value: "actions", align: "center", sortable: false },
            ],
            colors: UTILS.colors(),
            icons: UTILS.icons(),
            footerProps: UTILS.dataTable.footerProps
        };
    },
    methods: {
        viewItem(item) {
            this.$router.push({ name: "NoteView", params: { id: item.id_invoice } });
        },

        toCreate() {
            this.$router.push("notes/create");
        },
    }
};
</script>

<style scoped>
</style>