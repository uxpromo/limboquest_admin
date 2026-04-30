<template>
  <FForm :model="formState" ref="formRef" :rules="rules" :loading="props.loading">
    <FFormItem label="Время начала первого сеанса" name="first_session_start_time">
      <FInput v-model:value="formState.first_session_start_time" type="time" wide />
    </FFormItem>

    <FFormItem label="Время начала последнего сеанса" name="last_session_start_time">
      <FInput v-model:value="formState.last_session_start_time" type="time" wide />
    </FFormItem>

    <FFormItem label="Перерыв между сеансами (мин)" name="break_between_sessions_minutes">
      <FInput v-model:value="formState.break_between_sessions_minutes" type="number" :min="0" wide />
    </FFormItem>

    <FFormItem label="Правило цен" name="pricing_rule_id">
      <PricingRuleSelect v-model:value="formState.pricing_rule_id" />
    </FFormItem>
  </FForm>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { FForm, FFormItem, Rule, type FFormInstanceType } from '@finzor-ui/form'
import FInput from '@finzor-ui/input'
import PricingRuleSelect from '@/components/pricing_rules/PricingRuleSelect.vue'

type QuestSessionTemplatePreGenerationFormState = {
  first_session_start_time: string
  last_session_start_time: string
  break_between_sessions_minutes: number | null
  pricing_rule_id: number | null
}

export type QuestSessionTemplatePreGenerationPayload = {
  first_session_start_time: string
  last_session_start_time: string
  break_between_sessions_minutes: number
  pricing_rule_id: number
}

defineOptions({
  name: 'QuestSessionTemplatePreGenerationForm',
})

const props = withDefaults(
  defineProps<{
    loading: boolean
  }>(),
  {
    loading: false,
  },
)

const formState = ref<QuestSessionTemplatePreGenerationFormState>({
  first_session_start_time: '11:30',
  last_session_start_time: '22:00',
  break_between_sessions_minutes: 30,
  pricing_rule_id: null,
})

const formRef = useTemplateRef<FFormInstanceType>('formRef')

const parseTimeToMinutes = (value: string): number | null => {
  if (!value || !/^\d{2}:\d{2}$/.test(value)) return null
  const [hoursRaw, minutesRaw] = value.split(':')
  const hours = Number(hoursRaw)
  const minutes = Number(minutesRaw)
  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null
  }
  return hours * 60 + minutes
}

const requiredPositiveIdRule = Rule.custom({
  fn: (value: unknown) => {
    if (value === null || value === undefined || value === '') return false
    const num = Number(value)
    return !Number.isNaN(num) && num > 0
  },
  message: 'Выберите правило цен',
})

const rules = {
  first_session_start_time: Rule.custom({
    fn: (value: unknown) => typeof value === 'string' && parseTimeToMinutes(value) !== null,
    message: 'Укажите корректное время начала первого сеанса',
  }),
  last_session_start_time: Rule.custom({
    fn: (value: unknown) => {
      if (typeof value !== 'string') return false
      const lastStart = parseTimeToMinutes(value)
      if (lastStart === null) return false

      const firstStart = parseTimeToMinutes(formState.value.first_session_start_time)
      if (firstStart === null) return true

      return lastStart >= firstStart
    },
    message: 'Время последнего сеанса должно быть не раньше первого',
  }),
  break_between_sessions_minutes: Rule.custom({
    fn: (value: unknown) => {
      if (value === null || value === undefined || value === '') return false
      const num = Number(value)
      return !Number.isNaN(num) && num >= 0
    },
    message: 'Введите неотрицательное число',
  }),
  pricing_rule_id: requiredPositiveIdRule,
}

const validate = async (): Promise<QuestSessionTemplatePreGenerationPayload | false> => {
  const result = await formRef.value?.validate()
  if (!result?.valid) return false

  return {
    first_session_start_time: formState.value.first_session_start_time,
    last_session_start_time: formState.value.last_session_start_time,
    break_between_sessions_minutes: Number(formState.value.break_between_sessions_minutes ?? 0),
    pricing_rule_id: Number(formState.value.pricing_rule_id ?? 0),
  }
}

defineExpose({
  validate,
})
</script>

<style lang="scss"></style>
