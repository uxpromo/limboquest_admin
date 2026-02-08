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

    <FTable
      :loading="isLoading"
      :columns="columns"
      :data="data"
      :bordered="false"
      rowKey="id"
    ></FTable>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { FCreateButton } from '@finzor-ui/button'
import { PhMapPinSimpleArea } from '@phosphor-icons/vue'
import { useRouter } from 'vue-router'
import { useLocationListQuery } from '@/domains/location/Location.query'
import { FTable, type TableColumnType, type TableRecordType } from '@finzor-ui/table'
import { FRefreshButton } from '@finzor-ui/button'

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
    key: 'is_active',
    dataKey: 'is_active',
    label: 'Активность',
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
