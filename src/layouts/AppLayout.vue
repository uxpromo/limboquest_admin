<template>
  <FAppLayout class="app-layout" loading>
    <template #header-logo="layoutContext">
      <Logo :show-text="!layoutContext.layoutState.sidebarCollapsed" />
    </template>
    <template #header-content>
      <FSpace wide>
        <div style="flex-grow: 1"></div>
        <FSpace gap="8px" align="center">
          <CurrentUserBlock />
        </FSpace>
      </FSpace>
    </template>
    <template #sidebar="layoutContext">
      <FMenu
        :items="menuItems"
        :collapsed="layoutContext.isDesktop && layoutContext.layoutState.sidebarCollapsed"
        vertical
        v-model:activeValues="activeMenuValues"
        @select="handleSelect"
      />
    </template>

    <slot></slot>
  </FAppLayout>
</template>

<script setup lang="ts">
import Logo from '@/components/identity/Logo.vue'
import CurrentUserBlock from '@/components/users/CurrentUserBlock.vue'
import FAppLayout from '@finzor-ui/layout'
import FSpace from '@finzor-ui/space'
import {
  PhMapPinSimpleArea,
  PhSpeedometer,
  PhDoorOpen,
  PhCalendarDots,
  PhTicket,
  PhCurrencyCircleDollar,
} from '@phosphor-icons/vue/compact'
import { FMenu, type MenuItemValueType, type MenuElementType } from '@finzor-ui/menu'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
    value: 'locations.index',
    label: 'Локации',
    icon: PhMapPinSimpleArea,
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
    value: 'pricing_rules.index',
    label: 'Правила цен',
    icon: PhCurrencyCircleDollar,
    visible: true,
  },
  {
    type: 'item',
    value: 'bookings.index',
    label: 'Заявки',
    icon: PhTicket,
    visible: true,
  },
])

const activeMenuValues = ref<MenuItemValueType[]>([])

const handleSelect = (value: MenuItemValueType) => {
  router.push({ name: value as string })
}
</script>

<style lang="scss">
.app-layout {
  --f-app-layout--header-background-color: var(--f-color-slate-800);
  --f-app-layout--main-background-color: var(--f-color-neutral-100);

  .f-app-layout-header {
    border-bottom-color: var(--f-color-slate-700);

    &__content {
      width: 100%;
    }

    &__logo {
      .logo {
        &__symbol {
          height: 42px;
          width: auto;
        }
        &__text {
          height: 26px;
          width: auto;
        }
      }
    }

    &__logo_container {
      border-right-color: var(--f-color-slate-700);
      padding: 0 var(--f-space-3);
    }
  }

  .f-app-layout-sidebar {
    &__content {
      padding: var(--f-space-3);
    }
  }

  .f-page-header {
    border-bottom: 1px solid var(--f-color-secondary-200);

    &__title-wrapper {
      max-width: 90%;
    }
  }

  .f-current-user-block {
    --f-current-user-block--bg-color: transparent;
    --f-current-user-block--padding: 4px 4px 4px 8px;

    //gap: var(--f-current-user-block--gap);
  }
}

.fh-w-100 {
  width: 100%;
}
</style>
