<template>
  <transition mode="out-in" appear name="transition--bg-swap">
    <template
      v-if="
        [
          props.loadingLayout,
          props.guestLayout,
          props.fatalErrorLayout,
        ].includes(currentComponent)
      "
    >
      <FStarsBg>
        <transition mode="out-in" appear name="transition--content-swap">
          <component :is="currentComponent">
            <slot></slot>
          </component>
        </transition>
      </FStarsBg>
    </template>
    <template v-else>
      <component :is="currentComponent">
        <slot></slot>
      </component>
    </template>
  </transition>
</template>

<script setup lang="ts">
import useLoading from "@finzor-ui/use-loading";
import FStarsBg from "@finzor-ui/stars-bg";
import DefaultAppLayout from "@/layouts/AppLayout.vue";
import DefaultLoadingLayout from "@/layouts/LoadingLayout.vue";
import DefaultGuestLayout from "@/layouts/GuestLayout.vue";
import DefaultFatalErrorLayout from "@/layouts/FatalErrorLayout.vue";
import {
  onMounted,
  watch,
  computed,
  type DefineComponent,
  type FunctionalComponent,
} from "vue";
import { useRouter } from "vue-router";

import { useAuth, getBootPromise } from "@finzor-ui/feature-auth";

type Component = DefineComponent | FunctionalComponent | string;

interface Props {
  loadingLayout?: Component;
  guestLayout?: Component;
  appLayout?: Component;
  fatalErrorLayout?: Component;
}

const props = withDefaults(defineProps<Props>(), {
  loadingLayout: () => DefaultLoadingLayout,
  guestLayout: () => DefaultGuestLayout,
  appLayout: () => DefaultAppLayout,
  fatalErrorLayout: () => DefaultFatalErrorLayout,
});

const auth = useAuth();
const router = useRouter();
const loading = useLoading(true);
const authOrGuestComponent = computed(() =>
  auth.isAuthenticated.value ? props.appLayout : props.guestLayout
);
const currentComponent = computed<Component>(() => {
  return loading.state ? props.loadingLayout : authOrGuestComponent.value;
});

const loadData = async () => {
  await getBootPromise();
  loading.stop();
};

onMounted(() => {
  loadData();
});

watch(auth.isAuthenticated, (newValue, oldValue) => {
  if (newValue === false && oldValue === true) {
    router.push({ name: "auth", params: { action: "login" } });
  }
});
</script>

<style lang="scss">
.transition--content-swap {
  &-enter-active {
    transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }

  &-leave-active {
    transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }

  &-enter-from {
    opacity: 0;
    filter: blur(2px);
    transform: translateY(-20px);
  }

  &-leave-to {
    opacity: 0;
    filter: blur(2px);
    transform: translateY(20px) scale(0.95);
  }
}

.transition--bg-swap {
  &-enter-active {
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }

  &-leave-active {
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }

  &-enter-from {
    opacity: 0;
    filter: blur(2px);
  }

  &-leave-to {
    opacity: 0;
    filter: blur(2px);
  }
}
</style>
