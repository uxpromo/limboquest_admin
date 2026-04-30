<template>
  <div :class="['logo', `logo--${props.variant}`]">
    <LogoSymbol v-if="props.showSymbol" :variant="props.variant" />
    <LogoText v-if="props.showText" :variant="props.variant" />
  </div>
</template>

<script setup lang="ts">
import LogoSymbol from './LogoSymbol.vue'
import LogoText from './LogoText.vue'
defineOptions({
  name: 'Logo',
})

const props = withDefaults(
  defineProps<{
    showText?: boolean
    showSymbol?: boolean
    variant?: 'dark' | 'lite'
  }>(),
  {
    showText: true,
    showSymbol: true,
    variant: 'lite',
  },
)
</script>

<style lang="scss">
.logo {
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  max-width: 100%;

  &--lite {
    color: var(--f-color-white);
  }

  &--dark {
    color: var(--f-color-black, #111827);
  }
}
</style>
