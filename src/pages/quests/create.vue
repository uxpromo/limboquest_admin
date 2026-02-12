<template>
  <FPage>
    <template #title>Квесты</template>
    <template #subtitle>Создание квеста</template>
    <template #icon>
      <PhDoorOpen />
    </template>
    <template #breadcrumbs>
      <FBreadcrumbs>
        <FBreadcrumbsItem href="/">Главная</FBreadcrumbsItem>
        <FBreadcrumbsItem :to="{ name: 'quests.index' }">
          <template #icon>
            <PhDoorOpen />
          </template>
          Список квестов
        </FBreadcrumbsItem>
        <FBreadcrumbsItem>Создание квеста</FBreadcrumbsItem>
      </FBreadcrumbs>
    </template>

    <QuestForm :loading="isPending" ref="questFormRef" class="fh-mb-4" />
    <FCreateButton @click="handleCreateQuest" :loading="isPending">Создать</FCreateButton>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhDoorOpen } from '@phosphor-icons/vue'
import QuestForm from '@/components/quests/QuestForm.vue'
import { useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestCreateMutation } from '@/domains/quest'
import { FCreateButton } from '@finzor-ui/button'
import { FBreadcrumbs, FBreadcrumbsItem } from '@finzor-ui/breadcrumbs'

defineOptions({
  name: 'QuestsCreate',
})

const router = useRouter()
const questFormRef = useTemplateRef<InstanceType<typeof QuestForm>>('questFormRef')

const { mutate: createQuest, isPending } = useQuestCreateMutation()

const handleCreateQuest = async () => {
  const result = await questFormRef.value?.validate()
  if (result === false) return
  const data = result
  createQuest(data, {
    onSuccess: (model) => {
      router.push({ name: 'quests.edit', params: { id: model.id } })
    },
    onError: (error) => {
      console.error('[QuestsCreate] Create failed:', { error })
    },
  })
}
</script>

<style lang="scss"></style>
