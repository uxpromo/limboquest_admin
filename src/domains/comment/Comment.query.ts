import { CommentAPI } from './Comment.api'
import { type MaybeRefOrGetter } from 'vue'
import { useModelQuery } from '@/domains/_base/useModelQuery'
import type { ModelApiRequestParamsType, ModelQueryConfigType } from '../_base/types'
import Comment from './Comment.model'
import type { CommentDTO } from './Comment.types'

const CUSTOM_STALE_TIME = 60 * 60 * 1000

const getQueryConfig = (): ModelQueryConfigType<Comment, number> => ({
  modelName: 'Comment',
  api: CommentAPI,
  mapper: (dto: CommentDTO) => new Comment(dto),
  staleTime: CUSTOM_STALE_TIME,
})

const modelQuery = useModelQuery(getQueryConfig())

export const useCommentViewQuery = (
  id: MaybeRefOrGetter<number>,
  params?: MaybeRefOrGetter<ModelApiRequestParamsType>,
  enabled?: MaybeRefOrGetter<boolean>,
) => modelQuery.useViewQuery(id, params, enabled)

export const useCommentListQuery = (
  params?: MaybeRefOrGetter<ModelApiRequestParamsType>,
  enabled?: MaybeRefOrGetter<boolean>,
) => modelQuery.useListQuery(params, enabled)

export const useCommentCreateMutation = modelQuery.useCreateMutation
export const useCommentUpdateMutation = modelQuery.useUpdateMutation
export const useCommentRemoveMutation = modelQuery.useRemoveMutation
