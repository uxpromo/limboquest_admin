export interface CommentDTO {
  id: number
  author_id: number
  commentable_type: string
  commentable_id: number
  text: string
  created_at: string
  updated_at: string
}
