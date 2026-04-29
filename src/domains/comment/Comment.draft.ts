import type Comment from './Comment.model'

export default class CommentDraft {
  readonly id: number | null = null
  commentable_type: string | null = null
  commentable_id: number | null = null
  text: string | null = null

  constructor(model?: Comment) {
    if (model) {
      this.id = model.id
      this.commentable_type = model.commentable_type
      this.commentable_id = model.commentable_id
      this.text = model.text
    }
  }

  static fromModel(model: Comment): CommentDraft {
    return new CommentDraft(model)
  }
}
