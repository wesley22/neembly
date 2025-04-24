<script setup>
import { useProductStore } from '@/stores/product.js'

const emit = defineEmits(['openEditProductDialog', 'openDeleteConfirmDialog', 'showProductDetails'])
const productStore = useProductStore()
</script>
<template>
  <v-col class="px-0">
    <v-alert
      v-if="productStore.alertMessage"
      :text="productStore.alertMessage"
      :type="productStore.alertType"
      class="mb-4"
      dismissible
      @input="productStore.alertMessage = ''"
      variant="outlined"
      density="compact"
    >
    </v-alert>
  </v-col>

  <v-table :height="productStore.debouncedSearch ? 'auto' : '500px'" class="mt-8">
    <thead>
      <tr>
        <th class="text-left">ID</th>
        <th class="text-left">Image</th>
        <th class="text-left">Title</th>
        <th class="text-left">Category</th>
        <th class="text-left">Price</th>
        <th class="text-left">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in productStore.filteredProducts" :key="item.name">
        <td>{{ item.id }}</td>
        <td>
          <v-img
            :src="item.image"
            :aspect-ratio="1"
            width="100"
            height="100"
            class="mx-auto ma-4"
          ></v-img>
        </td>

        <td>{{ item.title }}</td>
        <td>{{ item.category }}</td>
        <td>${{ item.price }}</td>
        <td>
          <v-row class="py-4">
            <v-col>
              <v-btn block color="primary" @click="emit('openEditProductDialog', item)">
                Edit
              </v-btn>
            </v-col>
            <v-col>
              <v-btn block color="error" @click="emit('openDeleteConfirmDialog', item)">
                Delete
              </v-btn>
            </v-col>
            <v-col>
              <v-btn block color="success" @click="emit('showProductDetails', item)"> View </v-btn>
            </v-col>
          </v-row>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
