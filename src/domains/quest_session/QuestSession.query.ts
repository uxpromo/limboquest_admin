import { QuestSessionAPI } from './QuestSession.api'
import { type MaybeRefOrGetter } from 'vue'
import { useModelQuery } from '@/domains/_base/useModelQuery'
import type { ModelApiRequestParamsType, ModelQueryConfigType } from '../_base/types'
import QuestSession from './QuestSession.model'
import type { QuestSessionDTO } from './QuestSession.types'

const CUSTOM_STALE_TIME = 60 * 60 * 1000 // 1 hour

const getQueryConfig = (): ModelQueryConfigType<QuestSession, number> => ({
  modelName: 'QuestSession',
  api: QuestSessionAPI,
  mapper: (dto: QuestSessionDTO) => new QuestSession(dto),
  staleTime: CUSTOM_STALE_TIME,
})

const modelQuery = useModelQuery(getQueryConfig())

export const useQuestSessionViewQuery = (
  id: MaybeRefOrGetter<number>,
  params?: MaybeRefOrGetter<ModelApiRequestParamsType>,
  enabled?: MaybeRefOrGetter<boolean>,
) => modelQuery.useViewQuery(id, params, enabled)

export const useQuestSessionListQuery = (
  params?: MaybeRefOrGetter<ModelApiRequestParamsType>,
  enabled?: MaybeRefOrGetter<boolean>,
) => modelQuery.useListQuery(params, enabled)

export const useQuestSessionCreateMutation = modelQuery.useCreateMutation

export const useQuestSessionUpdateMutation = modelQuery.useUpdateMutation

export const useQuestSessionRemoveMutation = modelQuery.useRemoveMutation
