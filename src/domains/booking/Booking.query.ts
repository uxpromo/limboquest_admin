import { BookingAPI } from './Booking.api'
import { type MaybeRefOrGetter } from 'vue'
import { useModelQuery } from '@/domains/_base/useModelQuery'
import type { ModelApiRequestParamsType, ModelQueryConfigType } from '../_base/types'
import Booking from './Booking.model'
import type { BookingDTO } from './Booking.types'

const CUSTOM_STALE_TIME = 60 * 60 * 1000

const getQueryConfig = (): ModelQueryConfigType<Booking, number> => ({
  modelName: 'Booking',
  api: BookingAPI,
  mapper: (dto: BookingDTO) => new Booking(dto),
  staleTime: CUSTOM_STALE_TIME,
})

const modelQuery = useModelQuery(getQueryConfig())

export const useBookingViewQuery = (
  id: MaybeRefOrGetter<number>,
  params?: MaybeRefOrGetter<ModelApiRequestParamsType>,
  enabled?: MaybeRefOrGetter<boolean>,
) => modelQuery.useViewQuery(id, params, enabled)

export const useBookingListQuery = (
  params?: MaybeRefOrGetter<ModelApiRequestParamsType>,
  enabled?: MaybeRefOrGetter<boolean>,
) => modelQuery.useListQuery(params, enabled)

export const useBookingCreateMutation = modelQuery.useCreateMutation
export const useBookingUpdateMutation = modelQuery.useUpdateMutation
export const useBookingRemoveMutation = modelQuery.useRemoveMutation
