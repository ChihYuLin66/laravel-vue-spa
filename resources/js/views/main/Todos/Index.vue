<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Todo List</h1>
    <div class="flex justify-end mb-4">
      <router-link to="/todos/create" class="btn btn-primary">Create New Todo</router-link>
    </div>
    <ul class="space-y-4">
      <li v-for="todo in todos" :key="todo.id" class="p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold">{{ todo.title }}</h2>
        <p>{{ todo.description }}</p>
        <div class="flex space-x-2 mt-2">
          <router-link :to="{ name: 'TodoEdit', params: { id: todo.id } }" class="text-blue-500">Edit</router-link>
          <button @click="deleteTodo(todo.id)" class="text-red-500">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchIndex, destroy } from '@/services/apis/todo'

const todos = ref([])

const loadTodos = async () => {
  todos.value = await fetchIndex()
}

const deleteTodo = async (id) => {
  await destroy(id)
  loadTodos() // Refresh list after deletion
}

onMounted(loadTodos)
</script>

<style scoped>
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-lg;
}
</style>
