<template>
  <FPage>
    <template #title>Шаблоны сеансов</template>
    <template #subtitle>Список шаблонов</template>
    <template #icon>
      <PhCalendarDots />
    </template>
    <template #buttons>
      <FCreateButton @click="handleCreate">Новый шаблон</FCreateButton>
    </template>

    <div class="settings-session-templates__placeholder">
      Раздел подготовлен. Интеграция с доменной сущностью будет добавлена позже.
    </div>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { FCreateButton } from '@finzor-ui/button'
import { PhCalendarDots } from '@phosphor-icons/vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'SettingsSessionTemplatesIndex',
})

const router = useRouter()

const handleCreate = () => {
  router.push({ name: 'settings.quest_session_templates.create' })
}
</script>

<style lang="scss">
.settings-session-templates__placeholder {
  color: var(--f-color-zinc-500);
}
</style>
