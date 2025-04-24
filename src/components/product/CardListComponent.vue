<script setup>
import { computed, ref } from 'vue'
import { useProductStore } from '@/stores/product.js'

const productStore = useProductStore()

const emit = defineEmits(['showProductDetails'])
const showProductDetails = (item) => {
  emit('showProductDetails', item)
}
</script>
<template>
  <v-row>
    <v-col v-for="item in productStore.filteredProducts" :key="item.id" cols="12" sm="6" md="4">
      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 5 : 0"
            class="mb-5 pa-4"
            rounded="lg"
            @click="showProductDetails(item)"
          >
            <v-img
              :src="item.image"
              :aspect-ratio="1"
              width="300"
              height="300"
              class="mx-auto"
            ></v-img>
            <v-card-title class="text-h6 text-gray font-weight-bold text-[#546E7A]">{{
              item.title
            }}</v-card-title>
            <v-card-text class="text-body-1 font-weight-medium text-[#546E7A]"
              >({{ item.rating.count }})</v-card-text
            >
            <v-row class="px-2">
              <v-card-text class="text-h5 font-weight-bold font-weight-black text-[#546E7A]"
                >${{ item.price }}</v-card-text
              >
              <v-card-actions>
                <v-rating
                  :model-value="item.rating.rate"
                  size="28"
                  half-increments
                  active-color="orange"
                  color="orange"
                ></v-rating>
              </v-card-actions>
            </v-row>
          </v-card>
        </template>
      </v-hover>
    </v-col>
  </v-row>
</template>
