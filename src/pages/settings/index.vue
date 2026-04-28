<template>
  <FLayout ref="layoutRef" :mobileTopbar="false">
    <FLayoutSidebar side="left" class="settings__sidebar" bordered>
      <template v-if="isDesktop">
        <FMenu class="fh-m-3" :items="menuItems" :collapsed="false" activation-strategy="manual"
          :activation-callback="activationCallback" vertical @select="handleSelect" />
      </template>
      <template v-else>
        <FLayout style="height: 100dvh">
          <FLayoutContent class="fh-p-3">
            <FMenu :items="menuItems" :collapsed="false" activation-strategy="manual"
              :activation-callback="activationCallback" vertical @select="handleSelect" />
          </FLayoutContent>
        </FLayout>
      </template>
    </FLayoutSidebar>

    <FLayoutContent>
      <RouterView />
    </FLayoutContent>
  </FLayout>


</template>

<script setup lang="ts">
import {
  FLayout,
  FLayoutSidebar,
  FLayoutContent,
  type LayoutStateType,
} from '@finzor-ui/layout'
import {
  FMenu,
  type MenuItemValueType,
  type MenuElementType,
  type MenuActivatableElementType,
} from '@finzor-ui/menu'
import { computed, useTemplateRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PhUsers, PhCurrencyCircleDollar, PhMapPinSimpleArea } from '@phosphor-icons/vue/compact'

defineOptions({
  name: 'SettingsIndex',
})

const router = useRouter()
const route = useRoute()
const layoutRef = useTemplateRef<InstanceType<typeof FLayout>>('layoutRef')
const layoutState = computed<LayoutStateType | undefined>(() => layoutRef.value?.getLayoutState())
const isDesktop = computed(() => layoutState.value?.isDesktop.value ?? true)

const menuItems = computed<MenuElementType[]>(() => [
  {
    type: 'item',
    value: 'settings.users',
    label: 'Пользователи',
    icon: PhUsers,
    visible: true,
  },
  {
    type: 'item',
    value: 'settings.pricing_rules.index',
    label: 'Правила цен',
    icon: PhCurrencyCircleDollar,
    visible: true,
  },
  {
    type: 'item',
    value: 'settings.locations.index',
    label: 'Локации',
    icon: PhMapPinSimpleArea,
    visible: true,
  },
])

const currentSecondPathSegment = computed(() => route.path.split('/').filter(Boolean)[1] ?? '')

const activationCallback = (item: MenuActivatableElementType) => {
  const routeName = String(item.value)
  const resolvedPath = router.resolve({ name: routeName }).path
  const expectedSegment = resolvedPath.split('/').filter(Boolean)[1] ?? ''

  return expectedSegment === currentSecondPathSegment.value
}

const handleSelect = (value: MenuItemValueType) => {
  router.push({ name: value as string })
}
</script>

<style lang="scss">
.settings__sidebar {}
</style>
