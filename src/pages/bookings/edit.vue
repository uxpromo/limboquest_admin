<template>
  <FPage>
    <template #title>Заявки</template>
    <template #subtitle>Редактирование заявки</template>
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
        <FBreadcrumbsItem>Редактирование</FBreadcrumbsItem>
      </FBreadcrumbs>
    </template>

    <BookingForm :model="data" :loading="isPending" ref="formRef" class="fh-mb-4" />
    <FCreateButton @click="handleUpdate" :loading="isPending" :disabled="isLoading">
      Сохранить
    </FCreateButton>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhTicket } from '@phosphor-icons/vue'
import BookingForm from '@/components/bookings/BookingForm.vue'
import { useTemplateRef, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBookingViewQuery, useBookingUpdateMutation } from '@/domains/booking'
import { FCreateButton } from '@finzor-ui/button'
import { FBreadcrumbs, FBreadcrumbsItem } from '@finzor-ui/breadcrumbs'

defineOptions({
  name: 'BookingsEdit',
})

const route = useRoute()
const id = computed(() => Number(route.params.id))
const formRef = useTemplateRef<InstanceType<typeof BookingForm>>('formRef')

const { data, isLoading } = useBookingViewQuery(
  id,
  undefined,
  computed(() => !Number.isNaN(id.value)),
)
const { mutate: update, isPending } = useBookingUpdateMutation()

const handleUpdate = async () => {
  const result = await formRef.value?.validate()
  if (result === false) return
  update(
    { id: id.value, data: result },
    { onError: (e) => console.error('[BookingsEdit]', e) },
  )
}
</script>

<style lang="scss"></style>
