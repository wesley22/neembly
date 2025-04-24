<script setup>
import { ref, onMounted, computed, watch, reactive } from 'vue'

import { useProductStore } from '@/stores/product.js'

const productStore = useProductStore()
const emit = defineEmits(['closeDialog', 'submit'])
const props = defineProps({
  mode: { type: String, default: 'create' },
  initialData: { type: Object, default: () => ({}) },
})
const form = ref({ ...props.initialData })

function closeDialog() {
  emit('closeDialog')
}
function submit() {
  emit('submit', form.value)
}
</script>
<template>
  <v-card>
    <v-card-title>{{ mode === 'create' ? 'Add Product' : 'Edit Product' }}</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submit">
        <v-text-field v-model="form.title" variant="outlined" label="Title"></v-text-field>
        <v-text-field v-model="form.price" variant="outlined" label="Price"></v-text-field>

        <v-textarea v-model="form.description" variant="outlined" label="Description"></v-textarea>
        <v-select
          :items="productStore.categories"
          clearable
          variant="outlined"
          :menu-props="{ offsetY: true }"
          :value="productStore.categories[0]"
          v-model="form.category"
        ></v-select>
        <v-text-field v-model="form.image" variant="outlined" label="Image"></v-text-field>
        <v-img
          v-if="form.image"
          :src="form.image"
          :aspect-ratio="1"
          width="300"
          height="300"
          class="mx-auto ma-4"
        ></v-img>
        <v-row>
          <v-col>
            <v-btn
              class="mt-2"
              type="submit"
              :color="mode === 'create' ? 'success' : 'primary'"
              block
              >{{ mode === 'create' ? 'Create' : 'Update' }}</v-btn
            >
          </v-col>
          <v-col>
            <v-btn class="mt-2" color="error" @click="closeDialog" block>Close</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
