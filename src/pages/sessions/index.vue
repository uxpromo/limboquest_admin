<template>
  <FPage>
    <template #title>Сеансы</template>
    <template #subtitle>Список сеансов</template>
    <template #icon>
      <PhCalendarDots />
    </template>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhCalendarDots } from '@phosphor-icons/vue'

defineOptions({
  name: 'LocationsIndex',
})
</script>

<style lang="scss"></style>
