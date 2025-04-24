<script setup>
import { ref, onMounted, computed, watch, reactive } from 'vue'
import axios from 'axios'
import { useDebounce } from '@vueuse/core'
import ModalDetailsComponent from '@/components/product/ModalDetailsComponent.vue'
import CardListComponent from '@/components/product/CardListComponent.vue'
import { useProductStore } from '@/stores/product.js'

const productStore = useProductStore()
const productDetails = reactive({
  id: null,
  title: null,
  image: null,
  price: null,
  category: null,
  description: null,
  rating: {
    rate: null,
    count: null,
  },
})
const productDetailDialog = ref(false)

function showProductDetails(item) {
  productDetails.id = item.id
  productDetails.title = item.title
  productDetails.image = item.image
  productDetails.price = item.price
  productDetails.category = item.category
  productDetails.rating = item.rating
  productDetails.description = item.description
  productDetailDialog.value = !productDetailDialog.value
}

function closeDialog() {
  productDetailDialog.value = !productDetailDialog.value
}
</script>
<template>
  <v-container max-width="1200" class="px-xl-10">
    <!-- product filter and search -->
    <v-row align="center" justify="space-between" class="pa-4">
      <v-col cols="12" sm="3" class="text-h4">Products</v-col>
      <v-col cols="12" sm="3">
        <v-select
          v-model="productStore.selectedCategory"
          :items="productStore.categories"
          clearable
          variant="outlined"
          hide-details
          :menu-props="{ offsetY: true }"
          :value="productStore.categories[0]"
          class=""
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          label="Search"
          variant="outlined"
          v-model="productStore.searchProduct"
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- product list -->
    <CardListComponent @showProductDetails="showProductDetails" />
    <!-- product details -->
    <ModalDetailsComponent
      :productDetails="productDetails"
      :productDetailDialog="productDetailDialog"
      @closeDialog="closeDialog"
    />
  </v-container>
</template>
