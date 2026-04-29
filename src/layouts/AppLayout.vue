<template>
  <FLayout class="app-layout" ref="layoutRef" :mobileTopbar="false">
    <FLayoutHeader class="app-layout__header">
      <section class="app-layout__header-left"
        :class="{ 'app-layout__header-left--collapsed': isMobile || isLeftSidebarColumnCollapsed }">
        <Logo :show-text="!isLeftSidebarColumnCollapsed" />
        <FLayoutSidebarToggleButton v-if="isDesktop && !isLeftSidebarColumnCollapsed" side="left" :size="24" />
      </section>
      <div class="app-layout__header-right">
        <FLayoutSidebarToggleButton v-if="isMobile || (isDesktop && isLeftSidebarColumnCollapsed)" side="left"
          :size="24" />
        <div style="flex: 1"></div>
        <CurrentUserBlock v-if="isDesktop" />
      </div>
    </FLayoutHeader>

    <FLayoutSidebar side="left" class="app-layout__sidebar" :bordered="false">
      <template v-if="isDesktop">
        <FMenu class="fh-m-3" :items="menuItems" :collapsed="isDesktop && isLeftSidebarColumnCollapsed"
          activation-strategy="manual" :activation-callback="activationCallback" vertical @select="handleSelect" />
      </template>
      <template v-else>
        <FLayout style="height: 100dvh">
          <FLayoutContent class="fh-p-3">
            <FMenu :items="menuItems" :collapsed="false" activation-strategy="manual"
              :activation-callback="activationCallback" vertical @select="handleSelect" />
          </FLayoutContent>
          <FLayoutFooter>
            <CurrentUserBlock />
          </FLayoutFooter>
        </FLayout>
      </template>
    </FLayoutSidebar>

    <FLayoutContent class="app-layout__content">
      <slot />
    </FLayoutContent>
  </FLayout>
</template>

<script setup lang="ts">
import Logo from '@/components/identity/Logo.vue'
import CurrentUserBlock from '@/components/users/CurrentUserBlock.vue'
import {
  PhSpeedometer,
  PhDoorOpen,
  PhCalendarDots,
  PhTicket,
  PhWarningOctagon,
  PhCheckSquareOffset,
  PhGear,
  PhChartLineUp,
} from '@phosphor-icons/vue/compact'
import {
  FMenu,
  type MenuItemValueType,
  type MenuElementType,
  type MenuActivatableElementType,
} from '@finzor-ui/menu'
import { computed, useTemplateRef } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  FLayout,
  FLayoutHeader,
  FLayoutSidebar,
  FLayoutContent,
  FLayoutSidebarToggleButton,
  FLayoutFooter,
  type LayoutStateType,
} from '@finzor-ui/layout'

const router = useRouter()
const route = useRoute()
const layoutRef = useTemplateRef<InstanceType<typeof FLayout>>('layoutRef')
const layoutState = computed<LayoutStateType | undefined>(() => layoutRef.value?.getLayoutState())
const isDesktop = computed(() => layoutState.value?.isDesktop.value ?? true)
const isMobile = computed(() => !isDesktop.value)
const isLeftSidebarColumnCollapsed = computed(
  () => layoutState.value?.sidebar_left.isSidebarCollapsed.value ?? false,
)

const menuItems = computed<MenuElementType[]>(() => [
  {
    type: 'item',
    value: 'dashboard.index',
    label: 'Пульт',
    icon: PhSpeedometer,
    visible: true,
  },
  {
    type: 'item',
    value: 'quests.index',
    label: 'Квесты',
    icon: PhDoorOpen,
    visible: true,
  },
  {
    type: 'item',
    value: 'quest_sessions.index',
    label: 'Сеансы',
    icon: PhCalendarDots,
    visible: true,
  },
  {
    type: 'item',
    value: 'bookings.index',
    label: 'Заявки',
    icon: PhTicket,
    visible: true,
  },
  {
    type: 'item',
    value: 'analytics.index',
    label: 'Аналитика',
    icon: PhChartLineUp,
    visible: true,
  },
  {
    type: 'item',
    value: 'incidents.index',
    label: 'Инциденты',
    icon: PhWarningOctagon,
    visible: true,
  },
  {
    type: 'item',
    value: 'tasks.index',
    label: 'Задачи',
    icon: PhCheckSquareOffset,
    visible: true,
  },
  {
    type: 'item',
    value: 'settings.index',
    label: 'Настройки',
    icon: PhGear,
    visible: true,
  },

])

const currentFirstPathSegment = computed(() => route.path.split('/').filter(Boolean)[0] ?? '')

const activationCallback = (item: MenuActivatableElementType) => {
  const routeName = String(item.value)
  const resolvedPath = router.resolve({ name: routeName }).path
  const expectedSegment = resolvedPath.split('/').filter(Boolean)[0] ?? ''

  return expectedSegment === currentFirstPathSegment.value
}

const handleSelect = (value: MenuItemValueType) => {
  router.push({ name: value as string })
}
</script>

<style lang="scss">
.app-layout {
  --f-layout-header--height: 64px;
  --f-layout--height: 100dvh;
  --f-layout--sidebar-width-expanded: 260px;
  --f-layout--sidebar-width-collapsed: 64px;
  --app-layout--sidebar-bg-color: var(--f-color-zinc-800);
  --app-layout--header-left--bg-color: var(--f-color-zinc-900);

  &__header-right {
    display: flex;
    flex: 1;
    flex-direction: row;
    gap: var(--f-space-4);
    padding: 0 var(--f-space-4);
    align-items: center;
  }

  &__header-left {
    width: var(--f-layout--sidebar-width-expanded);
    background-color: var(--app-layout--header-left--bg-color);
    height: var(--f-layout-header--height);
    display: flex;
    justify-content: space-between;
    gap: var(--f-space-4);
    padding: 0 var(--f-space-4);
    align-items: center;
    transition: width var(--f-layout--sidebar-transition-duration) var(--f-layout--sidebar-transition-easing);

    &--collapsed {
      width: var(--f-layout--sidebar-width-collapsed);
    }
  }

  &__sidebar {
    --f-layout-sidebar--bg-color: var(--app-layout--sidebar-bg-color);
    --f-menu--item--label-color: var(--f-color-zinc-300);
    --f-menu--item--active--label-color: var(--f-color-primary);
    --f-menu--item--hover--bg-color: var(--f-color-zinc-50-alpha);
  }
}
</style>
