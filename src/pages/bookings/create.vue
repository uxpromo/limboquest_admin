<template>
  <FPage>
    <template #title>Заявки</template>
    <template #subtitle>Создание заявки</template>
    <template #icon>
      <PhTicket />
    </template>
    <template #breadcrumbs>
      <FBreadcrumbs>
        <FBreadcrumbsItem href="/">Главная</FBreadcrumbsItem>
        <FBreadcrumbsItem :to="{ name: 'bookings.index' }">
          <template #icon>
            <PhTicket />
          </template>
          Заявки
        </FBreadcrumbsItem>
        <FBreadcrumbsItem>Создание</FBreadcrumbsItem>
      </FBreadcrumbs>
    </template>

    <BookingForm :loading="isPending" ref="formRef" class="fh-mb-4" />
    <FCreateButton @click="handleCreate" :loading="isPending">Создать</FCreateButton>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhTicket } from '@phosphor-icons/vue'
import BookingForm from '@/components/bookings/BookingForm.vue'
import { useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingCreateMutation } from '@/domains/booking'
import { FCreateButton } from '@finzor-ui/button'
import { FBreadcrumbs, FBreadcrumbsItem } from '@finzor-ui/breadcrumbs'

defineOptions({
  name: 'BookingsCreate',
})

const router = useRouter()
const formRef = useTemplateRef<InstanceType<typeof BookingForm>>('formRef')
const { mutate: create, isPending } = useBookingCreateMutation()

const handleCreate = async () => {
  const result = await formRef.value?.validate()
  if (result === false) return
  create(result, {
    onSuccess: (model) => {
      router.push({ name: 'bookings.edit', params: { id: model.id } })
    },
    onError: (e) => console.error('[BookingsCreate]', e),
  })
}
</script>

<style lang="scss"></style>
