<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/Nav.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
    <RouterView />
  </header>
</template>

<style>

</style>
