<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Create Todo</h1>
    <form @submit.prevent="createTodo" class="space-y-4">
      <div>
        <label class="block">Title:</label>
        <input v-model="title" type="text" class="input" required />
      </div>
      <div>
        <label class="block">Description:</label>
        <textarea v-model="description" class="input" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {store} from '@/services/apis/todo'

const title = ref('')
const description = ref('')
const router = useRouter()

const createTodo = async () => {
  await store({title: title.value, description: description.value})
  router.push({name: 'TodoList'}) // Redirect to list after creation
}
</script>

<style scoped>
.input {
  @apply w-full p-2 border border-gray-300 rounded-lg;
}

.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-lg;
}
</style>
