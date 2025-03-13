import { create } from 'zustand'

interface CommentState {
  comments: IAdminComment[]
  loading: boolean
  error: string | null
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setComments: (comments: IAdminComment[]) => void
  addComment: (comment: IAdminComment) => void
  updateComment: (commentId: string, updatedComment: Partial<IAdminComment>) => void
}

export const useCommentStore = create<CommentState>((set) => ({
  comments: [],
  loading: false,
  error: null,

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setComments: (comments) => set({ comments }),
  addComment: (comment) => set((state) => ({ comments: [...state.comments, comment] })),
  updateComment: (commentId, updatedComment) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === commentId ? { ...comment, ...updatedComment } : comment
      )
    }))
}))
