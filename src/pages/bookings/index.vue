<template>
  <FPage>
    <template #title>Заявки</template>
    <template #subtitle>Список заявок на сеансы</template>
    <template #icon>
      <PhTicket />
    </template>
    <template #buttons>
      <FRefreshButton @click="refetch" :loading="isFetching" />
      <FCreateButton @click="handleCreate">Новая заявка</FCreateButton>
    </template>

    <FTable :loading="isLoading" :columns="columns" :data="data" :bordered="false" rowKey="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <FTag :color="statusColor(record.status)">
            {{ statusLabel(record.status) }}
          </FTag>
        </template>
        <template v-else-if="column.key === 'actions'">
          <FActionButtons
            :asDropdown="false"
            :delConfirm="false"
            :showDelBtn="false"
            showEditBtn
            showViewBtn
            size="default"
            type="plain"
            @edit="router.push({ name: 'bookings.edit', params: { id: record.id } })"
            @view="router.push({ name: 'bookings.edit', params: { id: record.id } })"
          />
        </template>
      </template>
    </FTable>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { FCreateButton, FRefreshButton } from '@finzor-ui/button'
import { PhTicket } from '@phosphor-icons/vue'
import { useRouter } from 'vue-router'
import { useBookingListQuery } from '@/domains/booking'
import { FTable, type TableColumnType } from '@finzor-ui/table'
import FActionButtons from '@finzor-ui/action-buttons'
import FTag from '@finzor-ui/tag'

defineOptions({
  name: 'BookingsIndex',
})

const router = useRouter()
const { isLoading, isFetching, refetch, data } = useBookingListQuery()

const handleCreate = () => {
  router.push({ name: 'bookings.create' })
}

function statusLabel(status: string): string {
  const map: Record<string, string> = {
    pending: 'Ожидание',
    confirmed: 'Подтверждено',
    cancelled: 'Отменено',
    completed: 'Завершено',
    absent: 'Неявка',
  }
  return map[status] ?? status
}

function statusColor(status: string): string {
  const map: Record<string, string> = {
    pending: 'default',
    confirmed: 'success',
    cancelled: 'danger',
    completed: 'success',
    absent: 'default',
  }
  return map[status] ?? 'default'
}

const columns: TableColumnType[] = [
  { key: 'id', dataKey: 'id', label: 'ID', narrow: true },
  { key: 'booking_code', dataKey: 'booking_code', label: 'Код', narrow: true },
  { key: 'name', dataKey: 'name', label: 'Имя', ellipsis: true },
  { key: 'phone', dataKey: 'phone', label: 'Телефон', narrow: true },
  { key: 'quest_session_id', dataKey: 'quest_session_id', label: 'Сеанс', narrow: true },
  { key: 'status', dataKey: 'status', label: 'Статус', narrow: true },
  { key: 'total_price', dataKey: 'total_price', label: 'Сумма', narrow: true },
  {
    key: 'actions',
    dataKey: 'actions',
    label: 'Действия',
    narrow: true,
    styles: { textAlign: 'right' },
  },
]
</script>

<style lang="scss"></style>
