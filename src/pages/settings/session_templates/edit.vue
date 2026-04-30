<template>
  <FPage>
    <template #title>Шаблоны сеансов</template>
    <template #subtitle>Редактирование шаблона</template>
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
        <FBreadcrumbsItem>Редактирование</FBreadcrumbsItem>
      </FBreadcrumbs>
    </template>

    <div class="settings-session-templates__placeholder">
      Страница редактирования подключена. Форма будет добавлена после внедрения доменной сущности.
    </div>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhCalendarDots } from '@phosphor-icons/vue'
import { FBreadcrumbs, FBreadcrumbsItem } from '@finzor-ui/breadcrumbs'

defineOptions({
  name: 'SettingsSessionTemplatesEdit',
})
</script>

<style lang="scss">
.settings-session-templates__placeholder {
  color: var(--f-color-zinc-500);
}
</style>
