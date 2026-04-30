<template>
  <FSelect
    :multiple="props.multiple"
    :loading="composedLoading"
    :placeholder="props.placeholder"
    v-model:value="computedValue"
    :options="questOptions"
    :wide="props.wide"
    :clearable="props.clearable"
  >
    <template #option-label="{ label }">
      <div class="quest-select__option-label">
        {{ label }}
      </div>
    </template>
  </FSelect>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FSelect from '@finzor-ui/select'
import { useQuestListQuery } from '@/domains/quest'

defineOptions({
  name: 'QuestSelect',
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
    placeholder: 'Выберите квест',
    wide: true,
    clearable: false,
  },
)

const emit = defineEmits<{
  (e: 'update:value', value: number | number[] | null): void
}>()

const { isLoading, data } = useQuestListQuery()

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

const questOptions = computed(() => {
  const list = data.value ?? []
  return list.map((q) => ({
    label: q.title || `#${q.id}`,
    value: q.id,
  }))
})
</script>
