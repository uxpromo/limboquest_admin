import type { DayjsType } from '@finzor-ui/use-day-js'
import type { CommentDTO } from './Comment.types'
import dayjsCast from '@/domains/_base/casts/dayjsCast'

export default class Comment {
  readonly id!: number
  readonly author_id!: number
  readonly commentable_type!: string
  readonly commentable_id!: number
  readonly text!: string
  readonly created_at!: DayjsType
  readonly updated_at!: DayjsType

  constructor(dto: CommentDTO) {
    this.id = dto.id
    this.author_id = dto.author_id
    this.commentable_type = dto.commentable_type
    this.commentable_id = dto.commentable_id
    this.text = dto.text
    this.created_at = dayjsCast(dto.created_at)
    this.updated_at = dayjsCast(dto.updated_at)
  }
}
