<template>
  <FForm :model="formState" ref="formRef" :rules="rules" :loading="props.loading">
    <FFormItem label="Название" name="name">
      <FInput v-model:value="formState.name" wide />
    </FFormItem>
    <FFormItem label="Описание" name="description">
      <FTextarea v-model:value="formState.description" wide />
    </FFormItem>
    <FFormItem label="Базовая цена" name="base_price">
      <FInput v-model:value="formState.base_price" type="number" wide :min="0" />
    </FFormItem>
    <FFormItem label="Базовое кол-во игроков" name="base_players_count">
      <FInput v-model:value="formState.base_players_count" type="number" wide :min="0" />
    </FFormItem>
    <FFormItem label="Надбавка за игрока" name="surcharge_per_player">
      <FInput v-model:value="formState.surcharge_per_player" type="number" wide :min="0" />
    </FFormItem>
    <FFormItem label="Для квестов" name="is_for_quests">
      <FSwitch v-model:checked="formState.is_for_quests" />
    </FFormItem>
    <FFormItem label="Для сертификатов" name="is_for_gift_cards">
      <FSwitch v-model:checked="formState.is_for_gift_cards" />
    </FFormItem>
    <FFormItem label="Активно" name="is_active">
      <FSwitch v-model:checked="formState.is_active" />
    </FFormItem>
  </FForm>
</template>

<script setup lang="ts">
import { PricingRuleDraft } from '@/domains/pricing_rule'
import { ref, useTemplateRef, watch } from 'vue'
import { FForm, FFormItem, Rule, type FFormInstanceType } from '@finzor-ui/form'
import FInput from '@finzor-ui/input'
import FTextarea from '@finzor-ui/textarea'
import FSwitch from '@finzor-ui/switch'
import type PricingRule from '@/domains/pricing_rule/PricingRule.model'

const formState = ref<PricingRuleDraft>(new PricingRuleDraft())
const formRef = useTemplateRef<FFormInstanceType>('formRef')

defineOptions({
  name: 'PricingRuleForm',
})

const props = withDefaults(
  defineProps<{
    loading: boolean
    model?: PricingRule | null
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
      formState.value = PricingRuleDraft.fromModel(model)
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
  name: Rule.string('Введите название').required('Название обязательно'),
  base_price: optionalNumberMin0,
  base_players_count: optionalNumberMin0,
  surcharge_per_player: optionalNumberMin0,
  is_for_quests: Rule.boolean().required(),
  is_for_gift_cards: Rule.boolean().required(),
  is_active: Rule.boolean().required(),
}

const validate = async () => {
  const result = await formRef.value?.validate()
  if (!result?.valid) return false
  const draft = formState.value
  const payload: Record<string, unknown> = {
    name: draft.name ?? '',
    description: draft.description,
    base_price: draft.base_price ?? 0,
    base_players_count: draft.base_players_count ?? null,
    surcharge_per_player: draft.surcharge_per_player ?? null,
    is_for_quests: draft.is_for_quests,
    is_for_gift_cards: draft.is_for_gift_cards,
    is_active: draft.is_active,
  }
  return payload
}

const setModel = (model: PricingRule) => {
  formState.value = PricingRuleDraft.fromModel(model)
}

defineExpose({
  validate,
  setModel,
})
</script>

<style lang="scss"></style>
