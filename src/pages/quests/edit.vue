<template>
  <FPage>
    <template #title>Квесты</template>
    <template #subtitle>Редактирование квеста</template>
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
        <FBreadcrumbsItem>Редактирование квеста</FBreadcrumbsItem>
      </FBreadcrumbs>
    </template>

    <QuestForm :model="data" :loading="isPending" ref="questFormRef" class="fh-mb-4" />
    <FCreateButton @click="handleUpdateQuest" :loading="isPending" :disabled="isLoading">
      Сохранить
    </FCreateButton>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhDoorOpen } from '@phosphor-icons/vue'
import QuestForm from '@/components/quests/QuestForm.vue'
import { useTemplateRef, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuestViewQuery, useQuestUpdateMutation } from '@/domains/quest'
import { FCreateButton } from '@finzor-ui/button'
import { FBreadcrumbs, FBreadcrumbsItem } from '@finzor-ui/breadcrumbs'

defineOptions({
  name: 'QuestsEdit',
})

const route = useRoute()
const id = computed(() => Number(route.params.id))

const questFormRef = useTemplateRef<InstanceType<typeof QuestForm>>('questFormRef')

const { data, isLoading } = useQuestViewQuery(
  id,
  undefined,
  computed(() => !Number.isNaN(id.value)),
)

const { mutate: updateQuest, isPending } = useQuestUpdateMutation()

const handleUpdateQuest = async () => {
  const result = await questFormRef.value?.validate()
  if (result === false) return
  const draft = result
  updateQuest(
    { id: id.value, data: draft },
    {
      onError: (error) => {
        console.error('[QuestsEdit] Update failed:', { id: id.value, error })
      },
    },
  )
}
</script>

<style lang="scss"></style>
