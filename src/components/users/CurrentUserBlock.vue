<template>
  <component
    :is="props.to ? 'router-link' : 'div'"
    :to="props.to"
    class="f-current-user-block"
  >
    <!-- Avatar slot с условным wrapper -->
    <div
      v-if="avatarValue || $slots.avatar"
      class="f-current-user-block__avatar"
    >
      <slot
        name="avatar"
        :user="user"
        :avatarUrl="avatarValue"
      >
        <FAvatar
          :size="props.avatarSize"
          :src="avatarValue"
        />
      </slot>
    </div>

    <div
      class="f-current-user-block__content"
      v-if="user"
    >
      <strong v-if="displayNameValue">{{ displayNameValue }}</strong>

      <small
        v-if="emailValue || $slots.email"
        class="f-current-user-block__content__email"
      >
        <slot
          name="email"
          :user="user"
          :email="emailValue"
        >
          {{ emailValue }}
        </slot>
      </small>
    </div>

    <FIconButton title="Выйти" color="danger" :size="24" @click.stop.prevent="logoutHandler">
      <PhSignOut  />
    </FIconButton>
  </component>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import FAvatar from '@finzor-ui/avatar'
  import { PhSignOut } from '@phosphor-icons/vue/compact'
  import { useAuth } from '@finzor-ui/feature-auth'
  import { useAuthConfig } from '@finzor-ui/feature-auth'
  import type { RouteLocationRaw } from 'vue-router'
  import FIconButton from '@finzor-ui/icon-button'

  const props = withDefaults(
    defineProps<{
      to?: RouteLocationRaw
      avatarSize?: number
    }>(),
    {
      to: () => ({
        name: 'profile.index'
      }),
      avatarSize: 36
    }
  )

  const auth = useAuth()
  const { user } = auth
  const { config, getFieldValue } = useAuthConfig()

  const displayNameValue = computed(() => getFieldValue(user.value, config.userFields.name))

  const avatarValue = computed(() => getFieldValue(user.value, config.userFields.avatar))

  const emailValue = computed(() => getFieldValue(user.value, config.userFields.email))

  const logoutHandler = () => {
    auth.logout()
  }
</script>

<style lang="scss">
  @layer tokens {
    :root {
      --f-current-user-block--padding: var(--f-space-1);
      --f-current-user-block--gap: var(--f-space-3);
      --f-current-user-block--color: var(--f-color-primary);
      --f-current-user-block--color--secondary: var(--f-color-secondary);
      --f-current-user-block--color--hover: var(--f-color-primary);
      --f-current-user-block--bg-color--hover: var(--f-color-secondary-100-alpha);
      --f-current-user-block--bg-color: var(--f-color-white);
      --f-current-user-block--border-radius: var(--f-border-radius);
    }
  }
  @layer components {
    .f-current-user-block {
      display: flex;
      flex-direction: row;
      gap: var(--f-current-user-block--gap);
      align-items: center;
      padding: var(--f-current-user-block--padding);
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      text-decoration: none;
      color: var(--f-current-user-block--color);
      border-radius: var(--f-current-user-block--border-radius);
      background-color: var(--f-current-user-block--bg-color);
      flex-shrink: 0;

      &:hover,
      &:active,
      &:focus {
        text-decoration: none;
      }

      &:hover {
        background-color: var(--f-current-user-block--bg-color--hover);
        color: var(--f-current-user-block--color--hover);
      }

      .f-avatar {
        flex-shrink: 0;
      }

      &__content {
        line-height: 1.35;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;

        &__email {
          color: var(--f-current-user-block--color--secondary);
        }
      }
    }
  }
</style>
