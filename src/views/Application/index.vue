<template>
    <div id="application">
        <v-navigation-drawer v-model="drawer" app dark :color="colors.secondary">
            <div class="pa-5 d-flex flex-column align-center">
                <v-avatar class="mb-4" size="100">
                    <img
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                        alt="John"
                    />
                </v-avatar>

                <div class="white--text">William Martins Coelho</div>
            </div>

            <v-list dense nav>
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    :to="{ name: item.pathName }"
                    link
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app :color="colors.primary" dark>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>Controle Financeiro</v-toolbar-title>
        </v-app-bar>

        <v-main class="bg-primary">
            <v-container>
                <Transition name="fade" mode="out-in">
                    <router-view />
                </Transition>
            </v-container>
        </v-main>
    </div>
</template>

<script>
import UTILS from "@/utils";

export default {
    data: () => ({
        drawer: null,
        colors: UTILS.colors(),
        icons: UTILS.icons(),
    }),
    computed: {
        items() {
            return [
                { title: "Dashboard", icon: this.icons.dashboard, pathName: "Dashboard" },
                { title: "Produtos", icon: this.icons.products, pathName: "Products" },
                { title: "Lojas", icon: this.icons.stores, pathName: "Stores" },
                { title: "Notas Fiscal", icon: this.icons.notes, pathName: "Notes" },
            ]
        }
    }
};
</script>

<style scoped>
.v-main {
    min-height: 100vh;
    color: #fff;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>