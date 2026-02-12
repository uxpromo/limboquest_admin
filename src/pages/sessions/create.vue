<template>
  <FPage>
    <template #title>Сеансы</template>
    <template #subtitle>Создание сеанса</template>
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
        <FBreadcrumbsItem>Создание сеанса</FBreadcrumbsItem>
      </FBreadcrumbs>
    </template>

    <QuestSessionForm :loading="isPending" ref="questSessionFormRef" class="fh-mb-4" />
    <FCreateButton @click="handleCreateSession" :loading="isPending">Создать</FCreateButton>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhCalendarDots } from '@phosphor-icons/vue'
import QuestSessionForm from '@/components/quest_sessions/QuestSessionForm.vue'
import { useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestSessionCreateMutation } from '@/domains/quest_session'
import { FCreateButton } from '@finzor-ui/button'
import { FBreadcrumbs, FBreadcrumbsItem } from '@finzor-ui/breadcrumbs'

defineOptions({
  name: 'SessionsCreate',
})

const router = useRouter()
const questSessionFormRef = useTemplateRef<InstanceType<typeof QuestSessionForm>>('questSessionFormRef')

const { mutate: createSession, isPending } = useQuestSessionCreateMutation()

const handleCreateSession = async () => {
  const result = await questSessionFormRef.value?.validate()
  if (result === false) return
  createSession(result, {
    onSuccess: (model) => {
      router.push({ name: 'quest_sessions.edit', params: { id: model.id } })
    },
    onError: (error) => {
      console.error('[SessionsCreate] Create failed:', { error })
    },
  })
}
</script>

<style lang="scss"></style>
