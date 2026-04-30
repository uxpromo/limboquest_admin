<template>
  <div class="not-found-page">
    <FEmpty title="Страница не найдена" class="fh-pb-3">
      <template #description>
        <p>Проверьте адрес или вернитесь на главную страницу.</p>
      </template>

      <FButton type="solid" color="primary" rounded @click="goToDashboard">
        На главную
      </FButton>
    </FEmpty>
  </div>
</template>

<script setup lang="ts">
import FButton from '@finzor-ui/button'
import FEmpty from '@finzor-ui/empty'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToDashboard = async () => {
  await router.push({ name: 'dashboard.index' })
}
</script>

<style scoped lang="scss">
.not-found-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
