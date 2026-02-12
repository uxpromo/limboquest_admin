<template>
  <FPage>
    <template #title>Сеансы</template>
    <template #subtitle>Редактирование сеанса</template>
    <template #icon>
      <PhCalendarDots />
    </template>
    <template #breadcrumbs>
      <FBreadcrumbs>
        <FBreadcrumbsItem href="/">Главная</FBreadcrumbsItem>
        <FBreadcrumbsItem :to="{ name: 'quest_sessions.index' }">
          <template #icon>
            <PhCalendarDots />
          </template>
          Список сеансов
        </FBreadcrumbsItem>
        <FBreadcrumbsItem>Редактирование сеанса</FBreadcrumbsItem>
      </FBreadcrumbs>
    </template>

    <QuestSessionForm :model="data" :loading="isPending" ref="questSessionFormRef" class="fh-mb-4" />
    <FCreateButton @click="handleUpdateSession" :loading="isPending" :disabled="isLoading">
      Сохранить
    </FCreateButton>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhCalendarDots } from '@phosphor-icons/vue'
import QuestSessionForm from '@/components/quest_sessions/QuestSessionForm.vue'
import { useTemplateRef, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuestSessionViewQuery, useQuestSessionUpdateMutation } from '@/domains/quest_session'
import { FCreateButton } from '@finzor-ui/button'
import { FBreadcrumbs, FBreadcrumbsItem } from '@finzor-ui/breadcrumbs'

defineOptions({
  name: 'SessionsEdit',
})

const route = useRoute()
const id = computed(() => Number(route.params.id))

const questSessionFormRef = useTemplateRef<InstanceType<typeof QuestSessionForm>>('questSessionFormRef')

const { data, isLoading } = useQuestSessionViewQuery(
  id,
  undefined,
  computed(() => !Number.isNaN(id.value)),
)

const { mutate: updateSession, isPending } = useQuestSessionUpdateMutation()

const handleUpdateSession = async () => {
  const result = await questSessionFormRef.value?.validate()
  if (result === false) return
  updateSession(
    { id: id.value, data: result },
    {
      onError: (error) => {
        console.error('[SessionsEdit] Update failed:', { id: id.value, error })
      },
    },
  )
}
</script>

<style lang="scss"></style>
