<template>
  <div id="app" class="flex h-screen justify-center bg-gray-100">
    <div class="w-full">
      <router-view />
    </div>
  </div>
</template>

<script>
import '@/assets/tailwind.css'

export default {
  name: 'App'
}
</script>
