<script setup>
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <v-layout>
    <v-app-bar>
      <v-app-bar-title>Neembly</v-app-bar-title>
      <v-spacer />
      <v-btn
        to="/"
        variant="text"
        :color="route.name === 'product' || route.name === 'product' ? 'success' : undefined"
        >Product List</v-btn
      >
      <v-btn
        to="/product/crud"
        variant="text"
        :color="
          route.name === 'product-crud' || route.name === 'product-crud-create'
            ? 'success'
            : undefined
        "
        >Product CRUD</v-btn
      >
    </v-app-bar>
    <v-main>
      <RouterView class="" />
    </v-main>
  </v-layout>
</template>
