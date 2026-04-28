<template>
  <FPage>
    <template #title>Настройки</template>
    <template #subtitle>Пользователи</template>
    <template #icon>
      <PhGear />
    </template>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhGear } from '@phosphor-icons/vue'

defineOptions({
  name: 'SettingsUsers',
})
</script>

<style lang="scss"></style>
