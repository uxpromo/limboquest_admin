<template>
  <FPage>
    <template #title>Пульт управления</template>
    <template #icon>
      <PhSpeedometer />
    </template>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhSpeedometer } from '@phosphor-icons/vue'

defineOptions({
  name: 'DashboardIndex',
})
</script>

<style lang="scss"></style>
