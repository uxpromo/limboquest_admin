<template>
  <FPage>
    <template #title>Шаблоны сеансов</template>
    <template #subtitle>Просмотр шаблона</template>
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
        <FBreadcrumbsItem>Просмотр</FBreadcrumbsItem>
      </FBreadcrumbs>
    </template>

    <div class="settings-session-templates__placeholder">
      Страница просмотра подключена. Данные появятся после добавления доменной сущности.
    </div>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhCalendarDots } from '@phosphor-icons/vue'
import { FBreadcrumbs, FBreadcrumbsItem } from '@finzor-ui/breadcrumbs'

defineOptions({
  name: 'SettingsSessionTemplatesView',
})
</script>

<style lang="scss">
.settings-session-templates__placeholder {
  color: var(--f-color-zinc-500);
}
</style>
