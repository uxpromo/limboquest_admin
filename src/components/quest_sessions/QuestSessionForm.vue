<template>
  <FForm :model="formState" ref="formRef" :rules="rules" :loading="props.loading">
    <FFormItem label="Квест" name="quest_id">
      <FSelect
        v-model:value="formState.quest_id"
        wide
        :options="questOptions"
        placeholder="Выберите квест"
        allow-clear
      />
    </FFormItem>
    <FFormItem label="Начало" name="starts_at">
      <FInput v-model:value="formState.starts_at" type="datetime-local" wide />
    </FFormItem>
    <FFormItem label="Длительность (мин)" name="duration">
      <FInput v-model:value="formState.duration" type="number" wide :min="0" />
    </FFormItem>
    <FFormItem label="Правило цен" name="pricing_rule_id">
      <PricingRuleSelector v-model:value="formState.pricing_rule_id" />
    </FFormItem>
    <FFormItem label="Только предоплата" name="prepayment_only">
      <FSwitch v-model:checked="formState.prepayment_only" />
    </FFormItem>
    <FFormItem label="Заметки" name="notes">
      <FTextarea v-model:value="formState.notes" wide />
    </FFormItem>
  </FForm>
</template>

<script setup lang="ts">
import { QuestSessionDraft } from '@/domains/quest_session'
import { ref, useTemplateRef, watch, computed } from 'vue'
import { FForm, FFormItem, Rule, type FFormInstanceType } from '@finzor-ui/form'
import FInput from '@finzor-ui/input'
import FTextarea from '@finzor-ui/textarea'
import FSwitch from '@finzor-ui/switch'
import FSelect from '@finzor-ui/select'
import type QuestSession from '@/domains/quest_session/QuestSession.model'
import { useQuestListQuery } from '@/domains/quest'
import PricingRuleSelector from '../pricing_rules/PricingRuleSelector.vue'

const formState = ref<QuestSessionDraft>(new QuestSessionDraft())
const formRef = useTemplateRef<FFormInstanceType>('formRef')

const { data: questsData } = useQuestListQuery()
const questOptions = computed(() => {
  const list = questsData.value ?? []
  return list.map((q) => ({ label: q.title || `#${q.id}`, value: q.id }))
})

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
