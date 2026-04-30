<template>
  <FForm :model="formState" ref="formRef" :rules="rules" :loading="props.loading">
    <FFormItem label="Адрес" name="address">
      <FInput v-model:value="formState.address" wide />
    </FFormItem>
    <FFormItem label="Адрес (краткий)" name="short_address">
      <FInput v-model:value="formState.short_address" wide />
    </FFormItem>
    <FFormItem label="Описание" name="description">
      <FTextarea v-model.value="formState.description" wide />
    </FFormItem>
    <FFormItem label="Часы работы" name="working_hours">
      <FTextarea v-model:value="formState.working_hours" wide />
    </FFormItem>
    <FFormItem label="Координаты" name="coordinates">
      <FYandexMapCoordsPicker
        :api-key="apiKey"
        v-model:value="coordinates"
        :center="mapOptions.center"
        :zoom="mapOptions.zoom"
        :disabled="false"
        :clearable="false"
        clear-btn-title="Очистить"
        :bordered="true"
        :enable-scroll-zoom="false"
        :loading="false"
      />
    </FFormItem>
    <FFormItem label="Активность" name="is_active">
      <FSwitch v-model:checked="formState.is_active" />
    </FFormItem>
  </FForm>
</template>

<script setup lang="ts">
import { LocationDraft } from '@/domains/location'
import { ref, reactive, computed, useTemplateRef, watch } from 'vue'
import { FForm, FFormItem, Rule, type FFormInstanceType } from '@finzor-ui/form'
import FInput from '@finzor-ui/input'
import FTextarea from '@finzor-ui/textarea'
import FSwitch from '@finzor-ui/switch'
import { FYandexMapCoordsPicker } from '@finzor-ui/yandex-map'
import Location from '@/domains/location/Location.model'

const formState = ref<LocationDraft>(new LocationDraft())
const formRef = useTemplateRef<FFormInstanceType>('formRef')
const apiKey = import.meta.env.VITE_YANDEX_MAPS_API_KEY
const mapOptions = reactive({
  center: [31.35, 58.6] as any,
  zoom: 12,
})
const coordinates = computed({
  get: () =>
    formState.value.latitude && formState.value.longitude
      ? [formState.value.latitude, formState.value.longitude]
      : mapOptions.center,
  set: (value) => {
    formState.value.latitude = value[0]
    formState.value.longitude = value[1]
  },
})

defineOptions({
  name: 'LocationForm',
})

const props = withDefaults(
  defineProps<{
    loading: boolean
    model?: Location | null
  }>(),
  {
    loading: false,
    model: undefined,
  },
)

watch(
  () => props.model,
  (model) => {
    if (model) {
      formState.value = LocationDraft.fromModel(model)
    }
  },
  { immediate: true },
)

const rules = {
  short_address: Rule.string('Введите краткий адрес').required('Краткий адрес обязателен'),
  address: Rule.string('Введите адрес').required('Адрес обязателен'),
  coordinates: Rule.custom({
    fn: () => {
      const { latitude, longitude } = formState.value
      if (latitude === null || latitude === undefined) return false
      if (longitude === null || longitude === undefined) return false
      if (Number.isNaN(Number(latitude)) || Number.isNaN(Number(longitude))) return false
      if (Number(latitude) < -90 || Number(latitude) > 90) return false
      if (Number(longitude) < -180 || Number(longitude) > 180) return false
      return true
    },
    message: 'Укажите корректные координаты на карте',
  }),
  working_hours: Rule.string('Введите часы работы').required('Часы работы обязательны'),
  is_active: Rule.boolean().required('Укажите активность'),
}

const validate = async () => {
  const result = await formRef.value?.validate()
  if (!result?.valid) return false
  return formState.value
}

const setModel = (model: Location) => {
  formState.value = LocationDraft.fromModel(model)
}

defineExpose({
  validate,
  setModel,
})
</script>

<style lang="scss"></style>
