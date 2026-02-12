<template>
  <FPage>
    <template #title>Квесты</template>
    <template #subtitle>Список квестов</template>
    <template #icon>
      <PhDoorOpen />
    </template>
    <template #buttons>
      <FRefreshButton @click="refetch" :loading="isFetching" />
      <FCreateButton @click="handleCreateQuest">Новый квест</FCreateButton>
    </template>

    <FTable :loading="isLoading" :columns="columns" :data="data" :bordered="false" rowKey="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'is_visible'">
          <FTag :color="record.is_visible ? 'success' : 'default'">
            {{ record.is_visible ? 'Виден' : 'Скрыт' }}
          </FTag>
        </template>
        <template v-else-if="column.key === 'is_bookable'">
          <FTag :color="record.is_bookable ? 'success' : 'default'">
            {{ record.is_bookable ? 'Да' : 'Нет' }}
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
            @edit="router.push({ name: 'quests.edit', params: { id: record.id } })"
            @view="router.push({ name: 'quests.edit', params: { id: record.id } })"
          />
        </template>
      </template>
    </FTable>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { FCreateButton, FRefreshButton } from '@finzor-ui/button'
import { PhDoorOpen } from '@phosphor-icons/vue'
import { useRouter } from 'vue-router'
import { useQuestListQuery } from '@/domains/quest'
import { FTable, type TableColumnType } from '@finzor-ui/table'
import FActionButtons from '@finzor-ui/action-buttons'
import FTag from '@finzor-ui/tag'

defineOptions({
  name: 'QuestsIndex',
})

const router = useRouter()

const { isLoading, isFetching, refetch, data } = useQuestListQuery()

const handleCreateQuest = () => {
  router.push({ name: 'quests.create' })
}

const columns: TableColumnType[] = [
  {
    key: 'id',
    dataKey: 'id',
    label: 'ID',
    narrow: true,
  },
  {
    key: 'title',
    dataKey: 'title',
    label: 'Название',
    ellipsis: true,
  },
  {
    key: 'location_id',
    dataKey: 'location_id',
    label: 'Локация ID',
    narrow: true,
  },
  {
    key: 'is_visible',
    dataKey: 'is_visible',
    label: 'Видимость',
    narrow: true,
  },
  {
    key: 'is_bookable',
    dataKey: 'is_bookable',
    label: 'Бронирование',
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
