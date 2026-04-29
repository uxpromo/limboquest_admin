<template>
  <FPage>
    <template #title>Задачи</template>
    <template #subtitle>Список задач</template>
    <template #icon>
      <PhCalendarDots />
    </template>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhCalendarDots } from '@phosphor-icons/vue'

defineOptions({
  name: 'TasksIndex',
})
</script>

<style lang="scss"></style>
