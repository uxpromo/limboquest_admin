<template>
  <FPage>
    <template #title>Локации</template>
    <template #subtitle>Список адресов</template>
    <template #icon>
      <PhMapPinSimpleArea />
    </template>
    <template #breadcrumbs>
      <FBreadcrumbs>
        <FBreadcrumbsItem href="/">Главная</FBreadcrumbsItem>
        <FBreadcrumbsItem :to="{ name: 'locations.index' }">
          <template #icon>
            <PhMapPinSimpleArea />
          </template>
          Список локаций
        </FBreadcrumbsItem>
        <FBreadcrumbsItem> Создание локации </FBreadcrumbsItem>
      </FBreadcrumbs>
    </template>

    <LocationForm :loading="isPending" ref="locationFormRef" class="fh-mb-4" />
    <FCreateButton @click="handleCreateLocation" :loading="isPending">Создать</FCreateButton>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhMapPinSimpleArea } from '@phosphor-icons/vue'
import LocationForm from '@/components/locations/LocationForm.vue'
import { useTemplateRef } from 'vue'
import { useLocationCreateMutation } from '@/domains/location'
import { FCreateButton } from '@finzor-ui/button'
import { FBreadcrumbs, FBreadcrumbsItem } from '@finzor-ui/breadcrumbs'

defineOptions({
  name: 'LocationsIndex',
})

const locationFormRef = useTemplateRef<InstanceType<typeof LocationForm>>('locationFormRef')

const { mutate: createLocation, isPending } = useLocationCreateMutation()

const handleCreateLocation = async () => {
  const result = await locationFormRef.value?.validate()
  if (result == false) return
  const data = result
  createLocation(data)
}
</script>

<style lang="scss"></style>
