<template>
  <div>
    <main>
      <TheWelcome />
    </main>
    <router-view />
  </div>
</template>
<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>
