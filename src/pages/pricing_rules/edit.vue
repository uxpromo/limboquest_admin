<template>
  <FPage>
    <template #title>Правила цен</template>
    <template #subtitle>Редактирование</template>
    <template #icon>
      <PhCurrencyCircleDollar />
    </template>
    <template #breadcrumbs>
      <FBreadcrumbs>
        <FBreadcrumbsItem href="/">Главная</FBreadcrumbsItem>
        <FBreadcrumbsItem :to="{ name: 'pricing_rules.index' }">
          <template #icon>
            <PhCurrencyCircleDollar />
          </template>
          Правила цен
        </FBreadcrumbsItem>
        <FBreadcrumbsItem>Редактирование</FBreadcrumbsItem>
      </FBreadcrumbs>
    </template>

    <PricingRuleForm :model="data" :loading="isPending" ref="formRef" class="fh-mb-4" />
    <FCreateButton @click="handleUpdate" :loading="isPending" :disabled="isLoading">
      Сохранить
    </FCreateButton>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhCurrencyCircleDollar } from '@phosphor-icons/vue'
import PricingRuleForm from '@/components/pricing_rules/PricingRuleForm.vue'
import { useTemplateRef, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePricingRuleViewQuery, usePricingRuleUpdateMutation } from '@/domains/pricing_rule'
import { FCreateButton } from '@finzor-ui/button'
import { FBreadcrumbs, FBreadcrumbsItem } from '@finzor-ui/breadcrumbs'

defineOptions({
  name: 'PricingRulesEdit',
})

const route = useRoute()
const id = computed(() => Number(route.params.id))
const formRef = useTemplateRef<InstanceType<typeof PricingRuleForm>>('formRef')

const { data, isLoading } = usePricingRuleViewQuery(
  id,
  undefined,
  computed(() => !Number.isNaN(id.value)),
)
const { mutate: update, isPending } = usePricingRuleUpdateMutation()

const handleUpdate = async () => {
  const result = await formRef.value?.validate()
  if (result === false) return
  update(
    { id: id.value, data: result },
    { onError: (e) => console.error('[PricingRulesEdit]', e) },
  )
}
</script>

<style lang="scss"></style>
