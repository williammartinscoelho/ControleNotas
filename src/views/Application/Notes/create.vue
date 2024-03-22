<template>
    <div>
        <v-card :color="colors.secondary" dark class="mb-3">
            <v-card-text>
                <v-textarea
                    outlined
                    name="input-7-4"
                    label="Outlined textarea"
                    v-model="textarea"
                    rows="10"
                />
                <div class="d-flex justify-end">
                    <v-btn
                        :color="colors.success"
                        :loading="loading"
                        :disabled="disableButton"
                        @click="postNotes"
                    >
                        Salvar
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>

        <pre>{{ textarea }}</pre>

        <pre>{{ links }}</pre>

        <v-snackbar v-model="snackbar.status" top right :color="snackbar.color">
            {{ snackbar.text }}

            <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="snackbar.status = false">
                    Fechar
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import API from "@/api";
import UTILS from "@/utils";

export default {
    name: "NoteCreate",
    data() {
        return {
            textarea: "",
            snackbar: {
                status: false,
                text: "",
                color: "",
            },
            loading: false,
            colors: UTILS.colors(),
        };
    },
    computed: {
        links() {
            return this.textarea.split("\n");
        },
        disableButton() {
            const MIN_STRING_LENGTH = 134;
            return this.textarea.trim().length < MIN_STRING_LENGTH;
        }
    },
    methods: {
        async postNotes() {
            this.loading = true;
            const response = await API.postNote({link:this.links});

            if (response.error) {
                this.snackbar.text = response.error;
                this.snackbar.color = this.colors.danger;
            } else {
                this.snackbar.text = "Notas salvas com sucesso!";
                this.snackbar.color = this.colors.success;
            }

            this.snackbar.status = true;
            this.loading = false;
        },
    },
};
</script>

<style scoped>
</style>