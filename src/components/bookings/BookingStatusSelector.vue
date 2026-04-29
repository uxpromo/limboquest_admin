<template>
  <FSelect v-model:value="computedValue" wide :options="statusOptions" :placeholder="props.placeholder"
    :clearable="false">
    <template #prepend>
      <span class="booking-status-selector__dot" :style="{ borderColor: statusInfo?.color }" />
    </template>
    <template #option="{ option }">
      <FSpace align="center" gap="12px">
        <span class="booking-status-selector__dot"
          :style="{ borderColor: BOOKING_STATUS_INFO_MAP[option.value as BookingStatus]?.color }" />
        {{ option.label }}
      </FSpace>
    </template>
  </FSelect>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FSelect from '@finzor-ui/select'
import { BOOKING_STATUS_OPTIONS, BOOKING_STATUS_INFO_MAP, type BookingStatus } from '@/domains/booking'
import FSpace from '@finzor-ui/space'

defineOptions({
  name: 'BookingStatusSelector',
})

const props = withDefaults(
  defineProps<{
    value?: BookingStatus | null
    placeholder?: string
  }>(),
  {
    value: null,
    placeholder: 'Выберите статус',
  },
)

const emit = defineEmits<{
  (e: 'update:value', value: BookingStatus | null): void
}>()

const computedValue = computed<BookingStatus | null>({
  get() {
    return props.value ?? null
  },
  set(value) {
    emit('update:value', value)
  },
})

const statusOptions = BOOKING_STATUS_OPTIONS

const statusInfo = computed(() => {
  return computedValue.value ? BOOKING_STATUS_INFO_MAP[computedValue.value] : null
})
</script>

<style lang="scss">
.booking-status-selector__dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 4px solid transparent;
  border-radius: 50%;
  background-color: transparent;
  box-sizing: border-box;
  transition: border-color 0.2s ease-in-out;
}
</style>
