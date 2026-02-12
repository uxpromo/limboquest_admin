<template>
  <FPage>
    <template #title>Правила цен</template>
    <template #subtitle>Список правил</template>
    <template #icon>
      <PhCurrencyCircleDollar />
    </template>
    <template #buttons>
      <FRefreshButton @click="refetch" :loading="isFetching" />
      <FCreateButton @click="handleCreate">Новое правило</FCreateButton>
    </template>

    <FTable :loading="isLoading" :columns="columns" :data="data" :bordered="false" rowKey="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'is_active'">
          <FTag :color="record.is_active ? 'success' : 'default'">
            {{ record.is_active ? 'Да' : 'Нет' }}
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
            @edit="router.push({ name: 'pricing_rules.edit', params: { id: record.id } })"
            @view="router.push({ name: 'pricing_rules.edit', params: { id: record.id } })"
          />
        </template>
      </template>
    </FTable>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { FCreateButton, FRefreshButton } from '@finzor-ui/button'
import { PhCurrencyCircleDollar } from '@phosphor-icons/vue'
import { useRouter } from 'vue-router'
import { usePricingRuleListQuery } from '@/domains/pricing_rule'
import { FTable, type TableColumnType } from '@finzor-ui/table'
import FActionButtons from '@finzor-ui/action-buttons'
import FTag from '@finzor-ui/tag'

defineOptions({
  name: 'PricingRulesIndex',
})

const router = useRouter()
const { isLoading, isFetching, refetch, data } = usePricingRuleListQuery()

const handleCreate = () => {
  router.push({ name: 'pricing_rules.create' })
}

const columns: TableColumnType[] = [
  { key: 'id', dataKey: 'id', label: 'ID', narrow: true },
  { key: 'name', dataKey: 'name', label: 'Название', ellipsis: true },
  { key: 'base_price', dataKey: 'base_price', label: 'Базовая цена', narrow: true },
  { key: 'is_active', dataKey: 'is_active', label: 'Активно', narrow: true },
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
