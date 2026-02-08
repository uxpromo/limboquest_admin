<template>
  <FBlock class="auth-block">
    <FBlockSection>
      <Logo />
    </FBlockSection>
    <FBlockSection class="auth-block__form-section">
      <FLoginForm v-if="currentSection === SECTION_LOGIN" />
      <FPasswordRequestForm
        v-if="currentSection === SECTION_PASSWORD_REQUEST"
      />
      <FPasswordResetForm v-if="currentSection === SECTION_PASSWORD_RESET" />
    </FBlockSection>
    <FBlockSection class="auth-block__footer">
      <template v-if="currentSection === SECTION_LOGIN">
        <router-link
          :to="{ name: 'auth', params: { action: SECTION_PASSWORD_REQUEST } }"
          >Восстановить пароль</router-link
        >
      </template>
      <template
        v-if="
          currentSection === SECTION_PASSWORD_REQUEST ||
          currentSection === SECTION_PASSWORD_RESET
        "
      >
        <router-link :to="{ name: 'auth', params: { action: SECTION_LOGIN } }"
          >← Вход</router-link
        >
        <!-- <router-link
          :to="{ name: 'auth', params: { action: SECTION_PASSWORD_RESET } }"
          >← Сбросить пароль</router-link
        > -->
      </template>
    </FBlockSection>
  </FBlock>
</template>

<script setup lang="ts">
import { FBlock, FBlockSection } from "@finzor-ui/block";
import {
  FLoginForm,
  FPasswordRequestForm,
  FPasswordResetForm,
} from "@finzor-ui/feature-auth";
import Logo from "@/components/identity/Logo.vue";
import { onMounted, computed } from "vue";
import { useAuth } from "@finzor-ui/feature-auth";
import { useRouter, useRoute } from "vue-router";

const SECTION_LOGIN = "login";
const SECTION_PASSWORD_REQUEST = "password-request";
const SECTION_PASSWORD_RESET = "password-reset";

const route = useRoute();

const auth = useAuth();
const router = useRouter();

const checkAuth = async () => {
  const hasAuth = await auth.isAuthenticated;

  if (hasAuth) {
    console.log("redirecting to /");
    router.push("/");
    return;
  }
};

const currentSection = computed<string>(() => {
  if (route.params.action === SECTION_PASSWORD_REQUEST) {
    return SECTION_PASSWORD_REQUEST;
  } else if (route.params.action === SECTION_PASSWORD_RESET) {
    return SECTION_PASSWORD_RESET;
  } else {
    return SECTION_LOGIN;
  }
});
const init = () => {
  checkAuth();
};

onMounted(init);
</script>

<style lang="scss">
.auth-block {
  width: min(96%, 500px);
  --f-block-padding: 20px 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);

  &__form-section {
    --f-block-padding: 30px;
  }

  &__footer {
    --f-block-padding: 10px 30px;
    text-align: center;
    background-color: var(--f-color-secondary-ghost);

    a {
      color: var(--f-color-secondary);
      transition: color 0.2s ease-in-out;
      text-decoration: none;

      &:hover {
        color: var(--f-color-primary);
      }
    }
  }
}
</style>
