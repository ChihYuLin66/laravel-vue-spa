<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Edit Todo</h1>
    <form @submit.prevent="editTodo" class="space-y-4">
      <div>
        <label class="block">Title:</label>
        <input v-model="title" type="text" class="input" required />
      </div>
      <div>
        <label class="block">Description:</label>
        <textarea v-model="description" class="input" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Update</button>
    </form>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {update, fetchIndex} from '@/services/apis/todo'

const title = ref('')
const description = ref('')
const router = useRouter()
const route = useRoute()
const todoId = route.params.id

const loadTodo = async () => {
  const todo = await fetchIndex(todoId)
  title.value = todo.title
  description.value = todo.description
}

const editTodo = async () => {
  await update(todoId, {title: title.value, description: description.value})
  router.push({name: 'TodoList'}) // Redirect to list after update
}

onMounted(loadTodo)
</script>

<style scoped>
.input {
  @apply w-full p-2 border border-gray-300 rounded-lg;
}

.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-lg;
}
</style>
