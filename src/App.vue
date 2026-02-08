<template>
  <FApp with-modals with-messages>
    <AppPreloader>
      <RouterView></RouterView>
    </AppPreloader>
  </FApp>
</template>

<script setup lang="ts">
import AppPreloader from '@/components/utils/AppPreloader.vue'
import FApp from '@finzor-ui/app'
</script>

<style scoped></style>
