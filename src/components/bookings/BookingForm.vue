<template>
  <FForm :model="formState" ref="formRef" :rules="rules" :loading="props.loading">
    <FFormItem label="Сеанс" name="quest_session_id">
      <FSelect
        v-model:value="formState.quest_session_id"
        wide
        :options="questSessionOptions"
        placeholder="Выберите сеанс"
      />
    </FFormItem>
    <FFormItem label="Имя" name="name">
      <FInput v-model:value="formState.name" wide />
    </FFormItem>
    <FFormItem label="Телефон" name="phone">
      <FInput v-model:value="formState.phone" wide />
    </FFormItem>
    <FFormItem label="Email" name="email">
      <FInput v-model:value="formState.email" type="email" wide />
    </FFormItem>
    <FFormItem label="Кол-во игроков" name="players_count">
      <FInput v-model:value="formState.players_count" type="number" wide :min="1" />
    </FFormItem>
    <FFormItem label="Статус" name="status">
      <FSelect
        v-model:value="formState.status"
        wide
        :options="statusOptions"
        placeholder="Выберите статус"
      />
    </FFormItem>
    <FFormItem label="Код брони" name="booking_code">
      <FInput v-model:value="formState.booking_code" wide />
    </FFormItem>
    <FFormItem label="Итого (₽)" name="total_price">
      <FInput v-model:value="formState.total_price" type="number" wide :min="0" />
    </FFormItem>
    <FFormItem label="Оплачено (₽)" name="paid_amount">
      <FInput v-model:value="formState.paid_amount" type="number" wide :min="0" />
    </FFormItem>
    <FFormItem label="Скидка (₽)" name="manual_discount">
      <FInput v-model:value="formState.manual_discount" type="number" wide :min="0" />
    </FFormItem>
    <FFormItem label="Причина скидки" name="manual_discount_reason">
      <FInput v-model:value="formState.manual_discount_reason" wide />
    </FFormItem>
    <FFormItem label="Заметки" name="notes">
      <FTextarea v-model:value="formState.notes" wide />
    </FFormItem>
  </FForm>
</template>

<script setup lang="ts">
import { BookingDraft } from '@/domains/booking'
import { ref, useTemplateRef, watch, computed, onMounted } from 'vue'
import { FForm, FFormItem, Rule, type FFormInstanceType } from '@finzor-ui/form'
import FInput from '@finzor-ui/input'
import FTextarea from '@finzor-ui/textarea'
import FSelect from '@finzor-ui/select'
import type Booking from '@/domains/booking/Booking.model'
import { useQuestSessionListQuery } from '@/domains/quest_session'

function generateBookingCode(): string {
  return `BK${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

const formState = ref<BookingDraft>(new BookingDraft())
const formRef = useTemplateRef<FFormInstanceType>('formRef')

const { data: sessionsData } = useQuestSessionListQuery()
const questSessionOptions = computed(() => {
  const list = sessionsData.value ?? []
  return list.map((s) => ({
    label: `Сеанс #${s.id} (квест ${s.quest_id})`,
    value: s.id,
  }))
})

const statusOptions = [
  { label: 'Ожидание', value: 'pending' },
  { label: 'Подтверждено', value: 'confirmed' },
  { label: 'Отменено', value: 'cancelled' },
  { label: 'Завершено', value: 'completed' },
  { label: 'Неявка', value: 'absent' },
]

defineOptions({
  name: 'BookingForm',
})

const props = withDefaults(
  defineProps<{
    loading: boolean
    model?: Booking | null
  }>(),
  {
    loading: false,
    model: undefined,
  },
)

onMounted(() => {
  if (!props.model && !formState.value.booking_code) {
    formState.value.booking_code = generateBookingCode()
  }
})

watch(
  () => props.model,
  (model) => {
    if (model) {
      formState.value = BookingDraft.fromModel(model)
    }
  },
  { immediate: true },
)

const optionalIntMin0 = Rule.custom({
  fn: (value: unknown) => {
    if (value === null || value === undefined || value === '') return true
    const num = Number(value)
    return !Number.isNaN(num) && num >= 0
  },
  message: 'Введите неотрицательное число',
})

const rules = {
  quest_session_id: Rule.custom({
    fn: (value) => {
      if (value === null || value === undefined || value === '') return false
      const num = Number(value)
      return !Number.isNaN(num) && num > 0
    },
    message: 'Выберите сеанс',
  }),
  name: Rule.string('Введите имя').required('Имя обязательно'),
  phone: Rule.string('Введите телефон').required('Телефон обязателен'),
  players_count: Rule.custom({
    fn: (value) => {
      if (value === null || value === undefined || value === '') return false
      const num = Number(value)
      return !Number.isNaN(num) && num >= 1
    },
    message: 'Введите число игроков (от 1)',
  }),
  status: Rule.string('Выберите статус').required('Статус обязателен'),
  booking_code: Rule.string('Введите код брони').required('Код брони обязателен'),
  total_price: Rule.custom({
    fn: (value) => {
      if (value === null || value === undefined || value === '') return false
      const num = Number(value)
      return !Number.isNaN(num) && num >= 0
    },
    message: 'Введите сумму',
  }),
  paid_amount: optionalIntMin0,
  manual_discount: optionalIntMin0,
}

const validate = async () => {
  const result = await formRef.value?.validate()
  if (!result?.valid) return false
  const d = formState.value
  return {
    quest_session_id: d.quest_session_id ?? 0,
    user_id: d.user_id,
    name: d.name ?? '',
    phone: d.phone ?? '',
    email: d.email || null,
    players_count: d.players_count ?? 1,
    status: d.status ?? 'pending',
    source_id: d.source_id || null,
    pricing_snapshot: d.pricing_snapshot ?? null,
    total_price: d.total_price ?? 0,
    paid_amount: d.paid_amount ?? 0,
    manual_discount: d.manual_discount ?? 0,
    manual_discount_reason: d.manual_discount_reason || null,
    notes: d.notes || null,
    booking_code: d.booking_code ?? '',
    play_time: d.play_time ?? null,
    winners: d.winners ?? null,
    hints: d.hints ?? null,
    confirmed_at: d.confirmed_at || null,
    cancelled_at: d.cancelled_at || null,
  }
}

const setModel = (model: Booking) => {
  formState.value = BookingDraft.fromModel(model)
}

defineExpose({
  validate,
  setModel,
})
</script>

<style lang="scss"></style>
