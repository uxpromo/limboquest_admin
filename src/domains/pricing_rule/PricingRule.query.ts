import { PricingRuleAPI } from './PricingRule.api'
import { type MaybeRefOrGetter } from 'vue'
import { useModelQuery } from '@/domains/_base/useModelQuery'
import type { ModelApiRequestParamsType, ModelQueryConfigType } from '../_base/types'
import PricingRule from './PricingRule.model'
import type { PricingRuleDTO } from './PricingRule.types'

const CUSTOM_STALE_TIME = 60 * 60 * 1000

const getQueryConfig = (): ModelQueryConfigType<PricingRule, number> => ({
  modelName: 'PricingRule',
  api: PricingRuleAPI,
  mapper: (dto: PricingRuleDTO) => new PricingRule(dto),
  staleTime: CUSTOM_STALE_TIME,
})

const modelQuery = useModelQuery(getQueryConfig())

export const usePricingRuleViewQuery = (
  id: MaybeRefOrGetter<number>,
  params?: MaybeRefOrGetter<ModelApiRequestParamsType>,
  enabled?: MaybeRefOrGetter<boolean>,
) => modelQuery.useViewQuery(id, params, enabled)

export const usePricingRuleListQuery = (
  params?: MaybeRefOrGetter<ModelApiRequestParamsType>,
  enabled?: MaybeRefOrGetter<boolean>,
) => modelQuery.useListQuery(params, enabled)

export const usePricingRuleCreateMutation = modelQuery.useCreateMutation
export const usePricingRuleUpdateMutation = modelQuery.useUpdateMutation
export const usePricingRuleRemoveMutation = modelQuery.useRemoveMutation
