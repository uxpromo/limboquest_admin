<template>
  <FPage>
    <template #title>Сеансы</template>
    <template #subtitle>Список сеансов</template>
    <template #icon>
      <PhCalendarDots />
    </template>
    <template #buttons>
      <FRefreshButton @click="refetch" :loading="isFetching" />
      <FCreateButton @click="handleCreateSession">Новый сеанс</FCreateButton>
    </template>

    <FTable :loading="isLoading" :columns="columns" :data="data" :bordered="false" rowKey="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'starts_at'">
          {{ formatStartsAt(record.starts_at) }}
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
            @edit="router.push({ name: 'quest_sessions.edit', params: { id: record.id } })"
            @view="router.push({ name: 'quest_sessions.edit', params: { id: record.id } })"
          />
        </template>
      </template>
    </FTable>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { FCreateButton, FRefreshButton } from '@finzor-ui/button'
import { PhCalendarDots } from '@phosphor-icons/vue'
import { useRouter } from 'vue-router'
import { useQuestSessionListQuery } from '@/domains/quest_session'
import { FTable, type TableColumnType } from '@finzor-ui/table'
import FActionButtons from '@finzor-ui/action-buttons'

defineOptions({
  name: 'SessionsIndex',
})

const router = useRouter()

const { isLoading, isFetching, refetch, data } = useQuestSessionListQuery()

const handleCreateSession = () => {
  router.push({ name: 'quest_sessions.create' })
}

function formatStartsAt(startsAt: unknown): string {
  if (startsAt == null) return '—'
  if (typeof startsAt === 'string') return startsAt
  const d = startsAt as { format?: (f: string) => string }
  return typeof d.format === 'function' ? d.format('DD.MM.YYYY HH:mm') : String(startsAt)
}

const columns: TableColumnType[] = [
  { key: 'id', dataKey: 'id', label: 'ID', narrow: true },
  { key: 'quest_id', dataKey: 'quest_id', label: 'Квест ID', narrow: true },
  { key: 'starts_at', dataKey: 'starts_at', label: 'Начало' },
  { key: 'duration', dataKey: 'duration', label: 'Длительность', narrow: true },
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
