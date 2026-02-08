<template>
  <div class="layout--guest">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.layout--guest {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .logo {
    color: var(--f-color-black);
  }
}
</style>
