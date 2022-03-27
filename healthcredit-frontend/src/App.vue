<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/Nav.vue'
</script>

<template>
  <div>
    <Nav />
    <div class="container">
      <RouterView />
    </div>
  </div>

</template>

<style>

</style>
