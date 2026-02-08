<template>
  <div class="layout--loading">
    <FSpinner />
  </div>
</template>

<script setup lang="ts">
import FSpinner from "@finzor-ui/spinner";
</script>

<style lang="scss">
.layout--loading {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--f-color-primary);

  .f-spinner {
    --f-spinner-size: 32px;
  }
}
</style>