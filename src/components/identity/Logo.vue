<template>
  <div class="logo">
    <LogoSymbol v-if="props.showSymbol" />
    <LogoText v-if="props.showText" />
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
  }>(),
  {
    showText: true,
    showSymbol: true,
  },
)
</script>

<style lang="scss">
.logo {
  display: flex;
  flex-direction: row;
  gap: 16px;
  color: var(--f-color-white);
  align-items: center;
  max-width: 100%;
}
</style>
