<script setup>
// import { ref, onMounted, computed, watch, reactive } from 'vue'

import { useProductStore } from '@/stores/product.js'

const productStore = useProductStore()
const emit = defineEmits(['closeDialog', 'confirmDelete'])
const props = defineProps({
  selectedProduct: {
    type: Object,
    required: true,
  },
})
function closeDialog() {
  emit('closeDialog')
}
function confirmDelete() {
  productStore.deleteProduct(props.selectedProduct)
  closeDialog()
}
</script>
<template>
  <v-card>
    <v-card-text class="text-h5"> Are you sure you want to delete this product? </v-card-text>
    <v-col class="pt-10">
      <v-img :src="selectedProduct.image" width="450" class="mx-auto"></v-img>
    </v-col>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" text @click="closeDialog"> Cancel </v-btn>
      <v-btn color="green darken-1" text @click="confirmDelete"> Delete </v-btn>
    </v-card-actions>
  </v-card>
</template>
