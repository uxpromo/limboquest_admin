<template>
  <FPage>
    <template #title>Заявки</template>
    <template #subtitle>Список заявок на сеансы</template>
    <template #icon>
      <PhTicket />
    </template>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhTicket } from '@phosphor-icons/vue'

defineOptions({
  name: 'LocationsIndex',
})
</script>

<style lang="scss"></style>
