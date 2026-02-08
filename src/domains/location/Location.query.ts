import { LocationAPI } from './Location.api'
import { LocationMapper } from './Location.mapper'
import { type MaybeRefOrGetter } from 'vue'
import { useModelQuery } from '@/domains/_base/useModelQuery'
import type { ModelApiRequestParamsType, ModelQueryConfigType } from '../_base/types'
import type Location from './Location'

const CUSTOM_STALE_TIME = 60 * 60 * 1000 // 1 hour

const getQueryConfig = (): ModelQueryConfigType<Location, number> => ({
  modelName: 'Location',
  api: LocationAPI,
  mapper: LocationMapper.fromDTO,
  staleTime: CUSTOM_STALE_TIME,
})

const modelQuery = useModelQuery(getQueryConfig())

export const useLocationViewQuery = (
  id: MaybeRefOrGetter<number>,
  params?: MaybeRefOrGetter<ModelApiRequestParamsType>,
  enabled?: MaybeRefOrGetter<boolean>,
) => modelQuery.useViewQuery(id, params, enabled)

export const useLocationListQuery = (
  params?: MaybeRefOrGetter<ModelApiRequestParamsType>,
  enabled?: MaybeRefOrGetter<boolean>,
) => modelQuery.useListQuery(params, enabled)

export const useLocationCreateMutation = modelQuery.useCreateMutation

export const useLocationUpdateMutation = modelQuery.useUpdateMutation

export const useLocationRemoveMutation = modelQuery.useRemoveMutation
