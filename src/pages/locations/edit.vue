<template>
  <FPage>
    <template #title>Локации</template>
    <template #subtitle>Редактирование адреса</template>
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
        <FBreadcrumbsItem>Редактирование локации</FBreadcrumbsItem>
      </FBreadcrumbs>
    </template>

    <LocationForm :model="data" :loading="isPending" ref="locationFormRef" class="fh-mb-4" />
    <FCreateButton @click="handleUpdateLocation" :loading="isPending" :disabled="isLoading">
      Сохранить
    </FCreateButton>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhMapPinSimpleArea } from '@phosphor-icons/vue'
import LocationForm from '@/components/locations/LocationForm.vue'
import { useTemplateRef, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLocationViewQuery, useLocationUpdateMutation } from '@/domains/location'
import { FCreateButton } from '@finzor-ui/button'
import { FBreadcrumbs, FBreadcrumbsItem } from '@finzor-ui/breadcrumbs'

defineOptions({
  name: 'LocationsEdit',
})

const route = useRoute()
const id = computed(() => Number(route.params.id))

const locationFormRef = useTemplateRef<InstanceType<typeof LocationForm>>('locationFormRef')

const { data, isLoading } = useLocationViewQuery(
  id,
  undefined,
  computed(() => !Number.isNaN(id.value)),
)

const { mutate: updateLocation, isPending } = useLocationUpdateMutation()

const handleUpdateLocation = async () => {
  const result = await locationFormRef.value?.validate()
  if (result == false) return
  const draft = result
  updateLocation(
    { id: id.value, data: draft },
    {
      onSuccess: () => {
        // Mutation success handled by cache invalidation
      },
      onError: (error) => {
        console.error('[LocationsEdit] Update failed:', { id: id.value, error })
      },
    },
  )
}
</script>

<style lang="scss"></style>
