<template>
  <FPage>
    <template #title>Инциденты</template>
    <template #subtitle>Список инцидентов</template>
    <template #icon>
      <PhTicket />
    </template>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhTicket } from '@phosphor-icons/vue'

defineOptions({
  name: 'IncidentsIndex',
})
</script>

<style lang="scss"></style>
