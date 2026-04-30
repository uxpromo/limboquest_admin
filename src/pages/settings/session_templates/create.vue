<template>
  <FPage>
    <template #title>Шаблоны сеансов</template>
    <template #subtitle>Создание шаблона</template>
    <template #icon>
      <PhCalendarDots />
    </template>
    <template #breadcrumbs>
      <FBreadcrumbs>
        <FBreadcrumbsItem href="/">Главная</FBreadcrumbsItem>
        <FBreadcrumbsItem :to="{ name: 'settings.index' }">Настройки</FBreadcrumbsItem>
        <FBreadcrumbsItem :to="{ name: 'settings.quest_session_templates.index' }">
          <template #icon>
            <PhCalendarDots />
          </template>
          Шаблоны сеансов
        </FBreadcrumbsItem>
        <FBreadcrumbsItem>Создание</FBreadcrumbsItem>
      </FBreadcrumbs>
    </template>

    <p class="settings-session-templates__hint">
      Шаг 1. Параметры предгенерации сеансов (время, перерыв, правило цен).
    </p>

    <QuestSessionTemplatePreGenerationForm
      ref="preGenerationFormRef"
      :loading="false"
      class="settings-session-templates__form"
    />

    <FCreateButton @click="handlePrepareDraft">Построить сетку конструктора</FCreateButton>

    <div v-if="preparedPreGenerationPayload" class="settings-session-templates__constructor-block">
      <p class="settings-session-templates__hint">
        Шаг 2. Конструктор шаблона (квесты, даты действия, активность и визуальная недельная сетка).
      </p>

      <QuestSessionTemplateForm
        ref="constructorFormRef"
        :loading="false"
        :pre-generation="preparedPreGenerationPayload"
        class="settings-session-templates__form"
      />

      <FCreateButton @click="handlePrepareTemplatePayload">
        Подготовить payload конструктора
      </FCreateButton>
    </div>

    <div v-if="preparedTemplatePayload" class="settings-session-templates__result">
      Итоговый payload конструктора:
      <pre>{{ JSON.stringify(preparedTemplatePayload, null, 2) }}</pre>
    </div>

    <div v-if="preparedTemplatePayload?.template" class="settings-session-templates__result">
      Template (pre):
      <pre>{{ JSON.stringify(preparedTemplatePayload.template, null, 2) }}</pre>
    </div>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhCalendarDots } from '@phosphor-icons/vue'
import { FBreadcrumbs, FBreadcrumbsItem } from '@finzor-ui/breadcrumbs'
import { ref, useTemplateRef } from 'vue'
import { FCreateButton } from '@finzor-ui/button'
import QuestSessionTemplatePreGenerationForm, {
  type QuestSessionTemplatePreGenerationPayload,
} from '@/components/quest_session_templates/QuestSessionTemplatePreGenerationForm.vue'
import QuestSessionTemplateForm from '@/components/quest_session_templates/QuestSessionTemplateForm.vue'

defineOptions({
  name: 'SettingsSessionTemplatesCreate',
})

const preGenerationFormRef = useTemplateRef<InstanceType<typeof QuestSessionTemplatePreGenerationForm>>(
  'preGenerationFormRef',
)
const constructorFormRef = useTemplateRef<InstanceType<typeof QuestSessionTemplateForm>>('constructorFormRef')
const preparedPreGenerationPayload = ref<QuestSessionTemplatePreGenerationPayload | null>(null)
const preparedTemplatePayload = ref<Record<string, unknown> | null>(null)

const handlePrepareDraft = async () => {
  const result = await preGenerationFormRef.value?.validate()
  if (result === false || result == null) return
  preparedPreGenerationPayload.value = result
  preparedTemplatePayload.value = null
}

const handlePrepareTemplatePayload = async () => {
  const result = await constructorFormRef.value?.validate()
  if (result === false || result == null) return
  preparedTemplatePayload.value = result as Record<string, unknown>
}
</script>

<style lang="scss">
.settings-session-templates__hint {
  color: var(--f-color-zinc-600);
  margin-bottom: var(--f-space-4);
}

.settings-session-templates__form {
  margin-bottom: var(--f-space-4);
}

.settings-session-templates__constructor-block {
  margin-top: var(--f-space-5);
}

.settings-session-templates__result {
  color: var(--f-color-zinc-500);

  pre {
    background-color: var(--f-color-zinc-100);
    border-radius: var(--f-radius-2);
    padding: var(--f-space-3);
    overflow: auto;
  }
}
</style>
