<template>
  <FPage>
    <template #title>Аналитика</template>
    <template #subtitle>Обзор</template>
    <template #icon>
      <PhChartLineUp />
    </template>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhChartLineUp } from '@phosphor-icons/vue'

defineOptions({
  name: 'AnalyticsOverview',
})
</script>

<style lang="scss"></style>
