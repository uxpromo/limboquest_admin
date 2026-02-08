<template>
  <div class="layout--fatal-error">
    <FEmpty :title="'Нет связи с сервером'" class="fh-pb-3">
      <template #icon>
        <PhPlugs />
      </template>
      <p>Проверьте соединение с интернетом и попробуйте снова</p>
      <FButton type="solid" color="danger" rounded @click="onReloadPageHandler"
        >Обновить страницу</FButton
      >
    </FEmpty>
  </div>
</template>

<script setup lang="ts">
import FEmpty from "@finzor-ui/empty";
import FButton from "@finzor-ui/button";
import { PhPlugs } from "@phosphor-icons/vue";

const onReloadPageHandler = () => {
  window.location.reload();
};
</script>

<style lang="scss">
.layout--fatal-error {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--f-color-danger);
  --f-empty--title--color: var(--f-color-danger);
  --f-empty--icon--color: var(--f-color-danger);

  .f-spinner {
    --f-spinner-size: 32px;
  }
}
</style>
