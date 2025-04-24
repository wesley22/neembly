<script setup>
import { ref, onMounted, computed, watch, reactive } from 'vue'
import axios from 'axios'
import { useDebounce } from '@vueuse/core'
import ModalDetailsComponent from '@/components/product/ModalDetailsComponent.vue'
import FormComponent from '@/components/product/FormComponent.vue'
import DeleteConfirmComponent from '@/components/product/DeleteConfirmComponent.vue'
import TableComponent from '@/components/product/TableComponent.vue'
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
const productFormDialog = ref(false)
const formMode = ref('create') // or 'edit'
const selectedProduct = ref({})
const productDeleteDialog = ref(false)

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

function openCreateProductDialog() {
  selectedProduct.value = {}
  formMode.value = 'create'
  productFormDialog.value = true
}

function openEditProductDialog(product) {
  selectedProduct.value = product
  formMode.value = 'edit'
  productFormDialog.value = true
}
function openDeleteConfirmDialog(product) {
  selectedProduct.value = product
  productDeleteDialog.value = true
}
function handleFormSubmit(productData) {
  if (formMode.value === 'create') {
    productStore.createProduct(productData)
  } else {
    productStore.updateProduct(productData)
  }
  productFormDialog.value = false
}
</script>

<template>
  <v-container>
    <v-row align="center" justify="space-between" class="pa-4">
      <v-col cols="12" sm="4" class="text-h4">Products Management</v-col>

      <v-col cols="12" sm="2" class="d-flex justify-end px-0">
        <v-btn color="success" @click="openCreateProductDialog" block> Create Product </v-btn>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-end">
      <v-col cols="12" sm="3" class="d-flex justify-center">
        <v-select
          v-model="productStore.selectedCategory"
          :items="productStore.categories"
          clearable
          variant="outlined"
          hide-details
          :menu-props="{ offsetY: true }"
          :value="productStore.categories[0]"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          label="Search"
          variant="outlined"
          v-model="productStore.searchProduct"
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>

    <TableComponent
      @showProductDetails="showProductDetails"
      @openDeleteConfirmDialog="openDeleteConfirmDialog"
      @openEditProductDialog="openEditProductDialog"
    />

    <ModalDetailsComponent
      :productDetails="productDetails"
      :productDetailDialog="productDetailDialog"
      @closeDialog="closeDialog"
    />

    <!-- create/edit product -->
    <v-dialog v-model="productFormDialog" align-center max-width="500">
      <FormComponent
        :mode="formMode"
        :initialData="selectedProduct"
        @closeDialog="productFormDialog = false"
        @submit="handleFormSubmit"
      />
    </v-dialog>
    <!-- delete product -->
    <v-dialog v-model="productDeleteDialog" align-center max-width="500">
      <DeleteConfirmComponent
        @closeDialog="productDeleteDialog = false"
        :selectedProduct="selectedProduct"
      />
    </v-dialog>
  </v-container>
</template>
