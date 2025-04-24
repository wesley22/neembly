import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useDebounce } from '@vueuse/core'
import axios from 'axios'

export const useProductStore = defineStore('product', () => {
  const allProducts = ref([])
  const alertMessage = ref('')
  const alertType = ref('success') // or 'error'

  const selectedCategory = ref('All')
  const searchProduct = ref('')
  const debouncedSearch = useDebounce(searchProduct, 500)

  const categories = computed(() => {
    const unique = new Set()
    allProducts.value.forEach((product) => unique.add(product.category))
    return ['All', ...unique]
  })

  const filteredProducts = computed(() => {
    let filtered = [...allProducts.value]

    // Category filter
    if (selectedCategory.value && selectedCategory.value !== 'All') {
      filtered = filtered.filter((item) => item.category === selectedCategory.value)
    }

    // Debounced search filter
    if (debouncedSearch.value) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(debouncedSearch.value.toLowerCase()),
      )
    }

    // Sort by rating
    return filtered.sort((a, b) => b.rating.rate - a.rating.rate)
  })

  async function createProduct(product) {
    try {
      console.log('product', product)

      const response = await axios.post('https://fakestoreapi.com/products', product)

      response.data.rating = {
        rate: 0,
        count: 0,
      }
      allProducts.value.push(response.data)
      localStorage.setItem('products', JSON.stringify([...allProducts.value, response.data]))
      setAlert('success', 'Product created successfully!')
      return true
    } catch (error) {
      console.log(error)
      setAlert('error', 'Failed to create product.')
      return false
    }
  }

  async function updateProduct(product) {
    try {
      await axios.put(`https://fakestoreapi.com/products/${product.id}`, product)
      console.log('allProducts.value', allProducts.value)

      const index = allProducts.value.findIndex((item) => item.id === product.id)
      console.log('index', allProducts.value[index])
      if (index !== -1) {
        allProducts.value[index] = product
        localStorage.setItem('products', JSON.stringify(allProducts.value))
      }
      setAlert('success', 'Product updated successfully!')
      return true
    } catch (error) {
      console.log(error)
      setAlert('error', 'Failed to update product')
      return false
    }
  }

  async function deleteProduct(product) {
    try {
      const response = await axios.put(`https://fakestoreapi.com/products/${product.id}`)
      console.log('response', response)
      const index = allProducts.value.findIndex((item) => item.id === product.id)
      if (index !== -1) {
        allProducts.value.splice(index, 1)
        localStorage.setItem('products', JSON.stringify(allProducts.value))
      }
      setAlert('success', 'Product deleted successfully!')
      return true
    } catch (error) {
      console.log(error)
      setAlert('error', 'Failed to delete product')
      return false
    }
  }

  function setAlert(type, message) {
    alertType.value = type
    alertMessage.value = message

    // Auto-hide after 3 seconds
    setTimeout(() => {
      alertMessage.value = ''
    }, 3000)
  }

  onMounted(async () => {
    const localProducts = localStorage.getItem('products')
    if (localProducts) {
      allProducts.value = JSON.parse(localProducts)
    } else {
      const res = await axios.get('https://fakestoreapi.com/products')
      localStorage.setItem('products', JSON.stringify(res.data))
      allProducts.value = res.data
    }
  })
  return {
    allProducts,
    selectedCategory,
    searchProduct,
    categories,
    filteredProducts,
    debouncedSearch,
    createProduct,
    updateProduct,
    deleteProduct,
    alertMessage,
    alertType,
  }
})
