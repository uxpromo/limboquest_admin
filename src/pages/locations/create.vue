<template>
  <FPage>
    <template #title>Локации</template>
    <template #subtitle>Список адресов</template>
    <template #icon>
      <PhMapPinSimpleArea />
    </template>
    <template #buttons> </template>

    <LocationForm :loading="false" />
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhMapPinSimpleArea } from '@phosphor-icons/vue'
import LocationForm from '@/components/locations/LocationForm.vue'
import { useLocationListQuery } from '@/domains/location/Location.query'

defineOptions({
  name: 'LocationsIndex',
})
</script>

<style lang="scss"></style>
