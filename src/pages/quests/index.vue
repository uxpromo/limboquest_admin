<template>
  <FPage>
    <template #title>Квесты</template>
    <template #subtitle>Список квестов</template>
    <template #icon>
      <PhDoorOpen />
    </template>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhDoorOpen } from '@phosphor-icons/vue'

defineOptions({
  name: 'QuestsIndex',
})
</script>

<style lang="scss"></style>
