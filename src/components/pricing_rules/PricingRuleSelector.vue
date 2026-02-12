<template>
  <FSelect
    :multiple="props.multiple"
    :loading="composedLoading"
    :placeholder="props.placeholder"
    v-model:value="computedValue"
    :options="pricingRuleOptions"
    :wide="props.wide"
    :clearable="props.clearable"
  >
    <template #option-label="{ label }">
      <div class="pricing-rule-selector__option-label">
        {{ label }}
      </div>
    </template>
  </FSelect>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FSelect from '@finzor-ui/select'
import { usePricingRuleListQuery } from '@/domains/pricing_rule'

defineOptions({
  name: 'PricingRuleSelector',
})

const props = withDefaults(
  defineProps<{
    value?: number | number[] | null
    multiple?: boolean
    loading?: boolean
    placeholder?: string
    wide?: boolean
    clearable?: boolean
  }>(),
  {
    value: null,
    multiple: false,
    loading: undefined,
    placeholder: 'Выберите правило цен',
    wide: true,
    clearable: false,
  },
)

const emit = defineEmits<{
  (e: 'update:value', value: number | number[] | null): void
}>()

const { isLoading, data } = usePricingRuleListQuery()

const composedLoading = computed(() => {
  return isLoading.value || props.loading
})

const computedValue = computed<number | number[] | null>({
  get(): number | number[] | null {
    return props.value ?? null
  },
  set(value: number | number[] | null) {
    emit('update:value', value)
  },
})

const pricingRuleOptions = computed(() => {
  const list = data.value ?? []
  return list.map((r) => ({
    label: r.name || `#${r.id}`,
    value: r.id,
  }))
})
</script>

