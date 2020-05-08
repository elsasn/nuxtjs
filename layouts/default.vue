<template>
  <div>
    <app-header class="mb-2" />
    <div class="container-fluid">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/Header'
export default {
    components: {
      'app-header' : Header
    }
}
</script>
