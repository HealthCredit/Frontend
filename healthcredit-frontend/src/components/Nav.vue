<script>
import { CFlex } from '@chakra-ui/vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <c-flex>
    <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
  </c-flex>
</template>

<style scoped>

</style>