import { QuestAPI } from './Quest.api'
import { type MaybeRefOrGetter } from 'vue'
import { useModelQuery } from '@/domains/_base/useModelQuery'
import type { ModelApiRequestParamsType, ModelQueryConfigType } from '../_base/types'
import Quest from './Quest.model'
import type { QuestDTO } from './Quest.types'

const CUSTOM_STALE_TIME = 60 * 60 * 1000 // 1 hour

const getQueryConfig = (): ModelQueryConfigType<Quest, number> => ({
  modelName: 'Quest',
  api: QuestAPI,
  mapper: (dto: QuestDTO) => new Quest(dto),
  staleTime: CUSTOM_STALE_TIME,
})

const modelQuery = useModelQuery(getQueryConfig())

export const useQuestViewQuery = (
  id: MaybeRefOrGetter<number>,
  params?: MaybeRefOrGetter<ModelApiRequestParamsType>,
  enabled?: MaybeRefOrGetter<boolean>,
) => modelQuery.useViewQuery(id, params, enabled)

export const useQuestListQuery = (
  params?: MaybeRefOrGetter<ModelApiRequestParamsType>,
  enabled?: MaybeRefOrGetter<boolean>,
) => modelQuery.useListQuery(params, enabled)

export const useQuestCreateMutation = modelQuery.useCreateMutation

export const useQuestUpdateMutation = modelQuery.useUpdateMutation

export const useQuestRemoveMutation = modelQuery.useRemoveMutation
