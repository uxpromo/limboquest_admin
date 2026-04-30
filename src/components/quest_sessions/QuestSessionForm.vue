<template>
  <FForm :model="formState" ref="formRef" :rules="rules" :loading="props.loading">
    <FFormItem label="Квест" name="quest_id">
      <QuestSelect v-model:value="formState.quest_id" clearable />
    </FFormItem>
    <FFormItem label="Начало" name="starts_at">
      <FSpace compact :wide="false">
        <FDatepicker v-model:value="startsAtDateValue" />
        <FTimepicker v-model:value="startsAtTimeValue" />
      </FSpace>
    </FFormItem>
    <FFormItem label="Длительность (мин)" name="duration">
      <FInputNumber v-model:value="formState.duration" :min="0" />
    </FFormItem>
    <FFormItem label="Правило цен" name="pricing_rule_id">
      <PricingRuleSelect v-model:value="formState.pricing_rule_id" />
    </FFormItem>
    <FFormItem label="Сеанс активен" name="is_active">
      <FSwitch v-model:checked="formState.is_active" />
    </FFormItem>
    <FFormItem label="Только предоплата" name="prepayment_only">
      <FSwitch v-model:checked="formState.prepayment_only" />
    </FFormItem>
    <FFormItem label="Заметки" name="notes">
      <FRichEditor v-model:value="formState.notes" placeholder="Введите текст..." toolbar-commands="standard" />
    </FFormItem>
  </FForm>
</template>

<script setup lang="ts">
import { QuestSessionDraft } from '@/domains/quest_session'
import { computed, ref, useTemplateRef, watch } from 'vue'
import { FForm, FFormItem, Rule, type FFormInstanceType } from '@finzor-ui/form'
import { FInputNumber } from '@finzor-ui/input'
import FSwitch from '@finzor-ui/switch'
import { FDatepicker } from '@finzor-ui/datepicker'
import { FTimepicker } from '@finzor-ui/timepicker'
import { useDayJs, type DayjsType } from '@finzor-ui/use-day-js'
import FRichEditor from '@finzor-ui/rich-editor'
import type QuestSession from '@/domains/quest_session/QuestSession.model'
import QuestSelect from '../quests/QuestSelect.vue'
import PricingRuleSelect from '../pricing_rules/PricingRuleSelect.vue'
import FSpace from '@finzor-ui/space'

const formState = ref<QuestSessionDraft>(new QuestSessionDraft())
const formRef = useTemplateRef<FFormInstanceType>('formRef')
const dayjs = useDayJs()

defineOptions({
  name: 'QuestSessionForm',
})

const props = withDefaults(
  defineProps<{
    loading: boolean
    model?: QuestSession | null
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
      formState.value = QuestSessionDraft.fromModel(model)
    }
  },
  { immediate: true },
)

const getStartsAtParts = () => {
  if (!formState.value.starts_at) {
    return {
      date: null as string | null,
      time: null as string | null,
    }
  }

  const [datePart, timePartRaw] = formState.value.starts_at.split('T')
  const timePart = timePartRaw?.slice(0, 5) ?? null

  if (!datePart || !timePart) {
    return {
      date: null as string | null,
      time: null as string | null,
    }
  }

  return {
    date: datePart,
    time: timePart,
  }
}

const startsAtDateValue = computed<DayjsType | null>({
  get: () => {
    const { date } = getStartsAtParts()
    if (!date) return null
    return dayjs(date, 'YYYY-MM-DD')
  },
  set: (value) => {
    if (!value) {
      formState.value.starts_at = null
      return
    }

    const { time } = getStartsAtParts()
    formState.value.starts_at = `${value.format('YYYY-MM-DD')}T${time ?? '00:00'}`
  },
})

const startsAtTimeValue = computed<DayjsType | null>({
  get: () => {
    const { time } = getStartsAtParts()
    if (!time) return null
    return dayjs(`2000-01-01T${time}`)
  },
  set: (value) => {
    if (!value) {
      formState.value.starts_at = null
      return
    }

    const { date } = getStartsAtParts()
    formState.value.starts_at = `${date ?? dayjs().format('YYYY-MM-DD')}T${value.format('HH:mm')}`
  },
})

const rules = {
  quest_id: Rule.custom({
    fn: (value) => {
      if (value === null || value === undefined || value === '') return false
      const num = Number(value)
      return !Number.isNaN(num) && num > 0
    },
    message: 'Выберите квест',
  }),
  starts_at: Rule.string('Укажите дату и время').required('Начало обязательно'),
  pricing_rule_id: Rule.custom({
    fn: (value) => {
      if (value === null || value === undefined || value === '') return false
      const num = Number(value)
      return !Number.isNaN(num) && num > 0
    },
    message: 'Выберите правило цен',
  }),
  duration: Rule.custom({
    fn: (value: unknown) => {
      if (value === null || value === undefined || value === '') return true
      const num = Number(value)
      return !Number.isNaN(num) && num >= 0
    },
    message: 'Введите неотрицательное число',
  }),
  is_active: Rule.boolean().required('Укажите активность'),
  prepayment_only: Rule.boolean().required(),
}

const validate = async () => {
  const result = await formRef.value?.validate()
  if (!result?.valid) return false
  const draft = formState.value
  const payload: Record<string, unknown> = {
    quest_id: draft.quest_id ?? 0,
    starts_at: draft.starts_at ?? '',
    duration: draft.duration ?? null,
    pricing_rule_id: draft.pricing_rule_id ?? 0,
    is_active: draft.is_active,
    prepayment_only: draft.prepayment_only,
    notes: draft.notes,
  }
  return payload
}

const setModel = (model: QuestSession) => {
  formState.value = QuestSessionDraft.fromModel(model)
}

defineExpose({
  validate,
  setModel,
})
</script>

<style lang="scss"></style>
