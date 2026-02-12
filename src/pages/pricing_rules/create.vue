<template>
  <FPage>
    <template #title>Правила цен</template>
    <template #subtitle>Создание правила</template>
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
        <FBreadcrumbsItem>Создание</FBreadcrumbsItem>
      </FBreadcrumbs>
    </template>

    <PricingRuleForm :loading="isPending" ref="formRef" class="fh-mb-4" />
    <FCreateButton @click="handleCreate" :loading="isPending">Создать</FCreateButton>
  </FPage>
</template>

<script setup lang="ts">
import FPage from '@finzor-ui/page'
import { PhCurrencyCircleDollar } from '@phosphor-icons/vue'
import PricingRuleForm from '@/components/pricing_rules/PricingRuleForm.vue'
import { useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import { usePricingRuleCreateMutation } from '@/domains/pricing_rule'
import { FCreateButton } from '@finzor-ui/button'
import { FBreadcrumbs, FBreadcrumbsItem } from '@finzor-ui/breadcrumbs'

defineOptions({
  name: 'PricingRulesCreate',
})

const router = useRouter()
const formRef = useTemplateRef<InstanceType<typeof PricingRuleForm>>('formRef')
const { mutate: create, isPending } = usePricingRuleCreateMutation()

const handleCreate = async () => {
  const result = await formRef.value?.validate()
  if (result === false) return
  create(result, {
    onSuccess: (model) => {
      router.push({ name: 'pricing_rules.edit', params: { id: model.id } })
    },
    onError: (e) => console.error('[PricingRulesCreate]', e),
  })
}
</script>

<style lang="scss"></style>
