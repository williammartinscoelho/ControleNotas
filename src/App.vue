<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
:root {
  /* UMA COPIA DAS VARIAVEIS DE CORES ENCONTRAM-SE EM UTILS */
  --primary: #1b1c30;
  --secondary: #222339;
  --success: #2ecc71;
  --info: #0890fd;
  --danger: #ff4757;
  --warning: #ffba00;
  --dark: #1e1e1e;
}

.bg-primary {
  background-color: var(--primary) !important;
}

.bg-secondary {
  background-color: var(--secondary) !important;
}

.bg-success {
  background-color: var(--success) !important;
}

.bg-info {
  background-color: var(--info) !important;
}

.bg-danger {
  background-color: var(--danger) !important;
}

.bg-warning {
  background-color: var(--warning) !important;
}

.bg-dark {
  background-color: var(--dark) !important;
}

.bg-white {
  background-color: #fff !important;
}

.text-primary {
  color: var(--primary) !important;
}

.text-secondary {
  color: var(--secondary) !important;
}

.text-success {
  color: var(--success) !important;
}

.text-info {
  color: var(--info) !important;
}

.text-danger {
  color: var(--danger) !important;
}

.text-warning {
  color: var(--warning) !important;
}

.text-dark {
  color: var(--dark) !important;
}

.text-white {
  color: #fff !important;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

a {
  text-decoration: none;
}
</style>
