<template>
    <FInputNumber v-model:value="computedValue" :placeholder="props.placeholder" :min="props.min" :max="props.max"
        :step="props.step" :disabled="props.disabled" :readonly="props.readonly" :bordered="props.bordered"
        :clearable="props.clearable" :copyable="props.copyable" :loading="props.loading" :required="props.required"
        :wide="props.wide" :size="props.size" :name="props.name" :floating-label="props.floatingLabel"
        :autofocus="props.autofocus" :autocomplete="props.autocomplete" :clear-btn-title="props.clearBtnTitle"
        :copy-btn-title="props.copyBtnTitle">
        <template #append>₽</template>
    </FInputNumber>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FInputNumber, type FInputNumberProps } from '@finzor-ui/input'

defineOptions({
    name: 'MoneyInput',
})

const props = withDefaults(defineProps<FInputNumberProps>(), {
    value: null,
    bordered: true,
    disabled: false,
    readonly: false,
    clearable: true,
    copyable: false,
    loading: false,
    required: false,
    wide: true,
    size: 'default',
})

const emit = defineEmits<{
    (e: 'update:value', value: number | null): void
}>()

const computedValue = computed<number | null>({
    get() {
        return props.value ?? null
    },
    set(value) {
        emit('update:value', value)
    },
})
</script>
