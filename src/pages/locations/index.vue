<template>
  <FPage>
    <template #title>Локации</template>
    <template #subtitle>Список адресов</template>
    <template #icon>
      <PhMapPinSimpleArea />
    </template>
    <template #buttons>
      <FRefreshButton @click="refetch" :loading="isFetching" />
      <FCreateButton @click="handleCreateLocation">Новая локация</FCreateButton>
    </template>

    <FTable :loading="isLoading" :columns="columns" :data="data" :bordered="false" rowKey="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'is_active'">
          <FTag :color="record.is_active ? 'success' : 'danger'">
            {{ record.is_active ? 'Активна' : 'Неактивна' }}
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
            @edit="router.push({ name: 'locations.edit', params: { id: record.id } })"
            @view="router.push({ name: 'locations.edit', params: { id: record.id } })"
          />
        </template>
      </template>
    </FTable>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { FCreateButton } from '@finzor-ui/button'
import { PhMapPinSimpleArea } from '@phosphor-icons/vue'
import { useRouter } from 'vue-router'
import { useLocationListQuery } from '@/domains/location/Location.query'
import { FTable, type TableColumnType } from '@finzor-ui/table'
import { FRefreshButton } from '@finzor-ui/button'
import FActionButtons from '@finzor-ui/action-buttons'
import FTag from '@finzor-ui/tag'

defineOptions({
  name: 'LocationsIndex',
})

const router = useRouter()

const { isLoading, isFetching, refetch, data } = useLocationListQuery()

const handleCreateLocation = () => {
  router.push({ name: 'locations.create' })
}

const columns: TableColumnType[] = [
  {
    key: 'id',
    dataKey: 'id',
    label: 'ID',
    narrow: true,
  },
  {
    key: 'address',
    dataKey: 'address',
    label: 'Адрес',
    ellipsis: true,
  },
  {
    key: 'is_active',
    dataKey: 'is_active',
    label: 'Статус',
    narrow: true,
  },
  {
    key: 'actions',
    dataKey: 'actions',
    label: 'Действия',
    narrow: true,
    styles: {
      textAlign: 'right',
    },
  },
]
</script>

<style lang="scss"></style>
