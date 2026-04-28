<template>
  <FApp with-modals with-messages>
    <FLayoutSwitcher :loading="loading.state" :default-layout="defaultLayout" :layouts="layoutOverrides">
      <RouterView />
    </FLayoutSwitcher>
  </FApp>
</template>

<script setup lang="ts">
import { getBootPromise } from '@finzor-ui/feature-auth'
import useLoading from '@finzor-ui/use-loading'
import { onMounted, type Component } from 'vue'
import FApp from '@finzor-ui/app'
import AppLayout from '@/layouts/AppLayout.vue'
import { FLayoutSwitcher, type LayoutKeyType } from '@finzor-ui/layout'

const loading = useLoading(true)
const defaultLayout: LayoutKeyType = 'app'
const layoutOverrides: Partial<Record<LayoutKeyType, Component>> = {
  app: AppLayout,
}

onMounted(async () => {
  await getBootPromise()
  loading.stop()
})
</script>

<style scoped></style>
