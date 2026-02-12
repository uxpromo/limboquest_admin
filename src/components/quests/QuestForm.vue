<template>
  <FForm :model="formState" ref="formRef" :rules="rules" :loading="props.loading">
    <FFormItem label="Название" name="title">
      <FInput v-model:value="formState.title" wide />
    </FFormItem>
    <FFormItem label="Подзаголовок" name="subtitle">
      <FInput v-model:value="formState.subtitle" wide />
    </FFormItem>
    <FFormItem label="Slug" name="slug">
      <FInput v-model:value="formState.slug" wide />
    </FFormItem>
    <FFormItem label="Локация" name="location_id">
      <FSelect
        v-model:value="formState.location_id"
        wide
        :options="locationOptions"
        placeholder="Выберите локацию"
        allow-clear
      />
    </FFormItem>
    <FFormItem label="Краткое описание" name="short_description">
      <FTextarea v-model:value="formState.short_description" wide />
    </FFormItem>
    <FFormItem label="Полное описание" name="full_description">
      <FTextarea v-model:value="formState.full_description" wide />
    </FFormItem>
    <FFormItem label="Доп. информация" name="additional_info">
      <FTextarea v-model:value="formState.additional_info" wide />
    </FFormItem>
    <FFormItem label="Возрастной рейтинг" name="age_rating">
      <FInput v-model:value="formState.age_rating" wide />
    </FFormItem>
    <FFormItem label="Базовая цена" name="base_price">
      <FInput v-model:value="formState.base_price" type="number" wide :min="0" />
    </FFormItem>
    <FFormItem label="Надбавка за игрока" name="surcharge_price">
      <FInput v-model:value="formState.surcharge_price" type="number" wide :min="0" />
    </FFormItem>
    <FFormItem label="Время прохождения (мин)" name="playtime">
      <FInput v-model:value="formState.playtime" type="number" wide :min="0" />
    </FFormItem>
    <FFormItem label="Игроков мин" name="players_min">
      <FInput v-model:value="formState.players_min" type="number" wide :min="0" />
    </FFormItem>
    <FFormItem label="Игроков макс" name="players_max">
      <FInput v-model:value="formState.players_max" type="number" wide :min="0" />
    </FFormItem>
    <FFormItem label="Лимит базовых игроков" name="players_base_limit">
      <FInput v-model:value="formState.players_base_limit" type="number" wide :min="0" />
    </FFormItem>
    <FFormItem label="Текст даты открытия" name="opening_date_text">
      <FInput v-model:value="formState.opening_date_text" wide />
    </FFormItem>
    <FFormItem label="Среднее время (мин)" name="average_time">
      <FInput v-model:value="formState.average_time" type="number" wide :min="0" />
    </FFormItem>
    <FFormItem label="Авто среднее время" name="is_auto_average_time">
      <FSwitch v-model:checked="formState.is_auto_average_time" />
    </FFormItem>
    <FFormItem label="Проходимость (%)" name="passability">
      <FInput v-model:value="formState.passability" type="number" wide :min="0" />
    </FFormItem>
    <FFormItem label="Авто проходимость" name="is_auto_passability">
      <FSwitch v-model:checked="formState.is_auto_passability" />
    </FFormItem>
    <FFormItem label="Лучшее время (мин)" name="best_time">
      <FInput v-model:value="formState.best_time" type="number" wide :min="0" />
    </FFormItem>
    <FFormItem label="Авто лучшее время" name="is_auto_best_time">
      <FSwitch v-model:checked="formState.is_auto_best_time" />
    </FFormItem>
    <FFormItem label="Уровень сложности" name="difficulty_level">
      <FInput v-model:value="formState.difficulty_level" type="number" wide :min="0" />
    </FFormItem>
    <FFormItem label="Уровень страха" name="scariness_level">
      <FInput v-model:value="formState.scariness_level" type="number" wide :min="0" />
    </FFormItem>
    <FFormItem label="Сортировка" name="sort">
      <FInput v-model:value="formState.sort" type="number" wide :min="0" />
    </FFormItem>
    <FFormItem label="Отображать" name="is_visible">
      <FSwitch v-model:checked="formState.is_visible" />
    </FFormItem>
    <FFormItem label="В разработке" name="is_in_dev">
      <FSwitch v-model:checked="formState.is_in_dev" />
    </FFormItem>
    <FFormItem label="Доступен для бронирования" name="is_bookable">
      <FSwitch v-model:checked="formState.is_bookable" />
    </FFormItem>
  </FForm>
</template>

<script setup lang="ts">
import { QuestDraft } from '@/domains/quest'
import { ref, useTemplateRef, watch, computed } from 'vue'
import { FForm, FFormItem, Rule, type FFormInstanceType } from '@finzor-ui/form'
import FInput from '@finzor-ui/input'
import FTextarea from '@finzor-ui/textarea'
import FSwitch from '@finzor-ui/switch'
import FSelect from '@finzor-ui/select'
import type Quest from '@/domains/quest/Quest.model'
import { useLocationListQuery } from '@/domains/location'

const formState = ref<QuestDraft>(new QuestDraft())
const formRef = useTemplateRef<FFormInstanceType>('formRef')

const { data: locationsData } = useLocationListQuery()
const locationOptions = computed(() => {
  const list = locationsData.value ?? []
  return list.map((loc) => ({ label: loc.short_address || loc.address || `#${loc.id}`, value: loc.id }))
})

defineOptions({
  name: 'QuestForm',
})

const props = withDefaults(
  defineProps<{
    loading: boolean
    model?: Quest | null
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
      formState.value = QuestDraft.fromModel(model)
    }
  },
  { immediate: true },
)

const optionalNumberMin0 = Rule.custom({
  fn: (value: unknown) => {
    if (value === null || value === undefined || value === '') return true
    const num = Number(value)
    return !Number.isNaN(num) && num >= 0
  },
  message: 'Введите неотрицательное число',
})

const rules = {
  title: Rule.string('Введите название').required('Название обязательно'),
  slug: Rule.string('Введите slug').required('Slug обязателен'),
  location_id: Rule.custom({
    fn: (value) => {
      if (value === null || value === undefined || value === '') return false
      const num = Number(value)
      return !Number.isNaN(num) && num > 0
    },
    message: 'Выберите локацию',
  }),
  base_price: optionalNumberMin0,
  playtime: optionalNumberMin0,
  players_min: optionalNumberMin0,
  players_max: optionalNumberMin0,
  sort: optionalNumberMin0,
  surcharge_price: optionalNumberMin0,
  players_base_limit: optionalNumberMin0,
  average_time: optionalNumberMin0,
  passability: optionalNumberMin0,
  best_time: optionalNumberMin0,
  difficulty_level: optionalNumberMin0,
  scariness_level: optionalNumberMin0,
  is_visible: Rule.boolean().required('Укажите видимость'),
  is_in_dev: Rule.boolean().required('Укажите статус разработки'),
  is_auto_average_time: Rule.boolean().required(),
  is_auto_passability: Rule.boolean().required(),
  is_auto_best_time: Rule.boolean().required(),
  is_bookable: Rule.boolean().required('Укажите доступность для бронирования'),
}

const validate = async () => {
  const result = await formRef.value?.validate()
  if (!result?.valid) return false
  const draft = formState.value
  // NOT NULL в БД: surcharge_price, base_price, sort (default 0,0,999) — не отправляем null
  const payload: Record<string, unknown> = {
    slug: draft.slug ?? '',
    title: draft.title ?? '',
    subtitle: draft.subtitle,
    playtime: draft.playtime ?? null,
    players_min: draft.players_min ?? null,
    players_max: draft.players_max ?? null,
    players_base_limit: draft.players_base_limit ?? null,
    surcharge_price: draft.surcharge_price ?? 0,
    base_price: draft.base_price ?? 0,
    location_id: draft.location_id ?? 0,
    short_description: draft.short_description,
    full_description: draft.full_description,
    additional_info: draft.additional_info,
    age_rating: draft.age_rating,
    is_visible: draft.is_visible,
    is_in_dev: draft.is_in_dev,
    opening_date_text: draft.opening_date_text,
    average_time: draft.average_time ?? null,
    is_auto_average_time: draft.is_auto_average_time,
    passability: draft.passability ?? null,
    is_auto_passability: draft.is_auto_passability,
    best_time: draft.best_time ?? null,
    is_auto_best_time: draft.is_auto_best_time,
    difficulty_level: draft.difficulty_level ?? null,
    scariness_level: draft.scariness_level ?? null,
    is_bookable: draft.is_bookable,
    sort: draft.sort ?? 999,
  }
  return payload
}

const setModel = (model: Quest) => {
  formState.value = QuestDraft.fromModel(model)
}

defineExpose({
  validate,
  setModel,
})
</script>

<style lang="scss"></style>
