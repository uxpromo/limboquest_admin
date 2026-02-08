<template>
  <FPage>
    <template #title>Мой профиль</template>
    <template #subtitle>{{ user?.full_name }}</template>
    <template #icon>
      <PhUser />
    </template>
    <!-- <FAvatarEditor
      class="avatar-editor"
      v-if="user"
      :avatar-size="64"
      @cropped="onAvatarChange($event)"
      :loading="avatarLoading.state"
    /> -->
    <!-- <FCurrentUserProfileForm /> -->

    <h6>Изменение пароля</h6>
    <FPasswordChangeForm />
  </FPage>
</template>

<script setup lang="ts">
import FPage from "@finzor-ui/page";
// import FAvatarEditor from "@finzor-ui/avatar-editor";
import {
  // FCurrentUserProfileForm,
  FPasswordChangeForm,
} from "@finzor-ui/feature-auth";
import { useAuth } from "@finzor-ui/feature-auth";
// import useApi from "@finzor-ui/feature-api";
// import useLoading from "@finzor-ui/use-loading";
import { PhUser } from "@phosphor-icons/vue";
import type { CurrentUserType } from "@/types";

const { user } = useAuth<CurrentUserType>();
// const api = useApi();
// const avatarLoading = useLoading();

// const onAvatarChange = async (avatar: string | null) => {
//   if (!avatar) return;
//   avatarLoading.start();
//   try {
//     await api.post("/profile/avatar", { avatar });
//     await setTimeout(() => refetchUser(), 1000);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     avatarLoading.stop();
//   }
// };
</script>

<style lang="scss">
// .avatar-editor {
//   margin-bottom: 24px;
//   .f-image__image:hover {
//     cursor: pointer;
//   }
// }
</style>
