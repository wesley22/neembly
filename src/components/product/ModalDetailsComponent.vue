<script setup>
import { ref, onMounted, computed, watch, reactive } from 'vue'

const props = defineProps({
  productDetails: {
    type: Object,
    required: true,
  },
  productDetailDialog: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['closeDialog'])

const showDialogComputed = computed(() => props.productDetailDialog)

const closeDialog = () => {
  emit('closeDialog')
}
</script>
<template>
  <v-dialog v-model="showDialogComputed" align-center>
    <v-card class="pa-8 mx-auto" rounded="xl" max-width="800" v-click-outside="closeDialog">
      <v-card-text class="text-h5 text-gray font-weight-bold text-[#546E7A]">{{
        productDetails.title
      }}</v-card-text>
      <v-card-subtitle class="text-body-1 font-weight-medium text-[#546E7A]">
        Category:
        {{ productDetails.category.charAt(0).toUpperCase() + productDetails.category.slice(1) }}
      </v-card-subtitle>
      <v-col class="pt-10">
        <v-img
          :src="productDetails.image"
          :width="$vuetify.display.mobile ? '100%' : '450'"
          class="mx-auto"
        ></v-img>
      </v-col>
      <v-card-subtitle class="text-h6 font-weight-medium text-[#546E7A]"
        >Description</v-card-subtitle
      >
      <v-card-text class="text-body-1 font-weight-medium text-[#546E7A]">
        {{ productDetails.description }}
      </v-card-text>
      <v-card-subtitle class="text-h6 font-weight-medium text-[#546E7A] px-3"
        >Price</v-card-subtitle
      >
      <v-row class="px-2">
        <v-card-text class="text-h5 font-weight-bold font-weight-black text-[#546E7A]"
          >${{ productDetails.price }}</v-card-text
        >
        <v-card-actions>
          <v-rating
            :model-value="productDetails.rating.rate"
            size="28"
            half-increments
            active-color="orange"
            color="orange"
          ></v-rating>
        </v-card-actions>
      </v-row>
    </v-card>
  </v-dialog>
</template>
