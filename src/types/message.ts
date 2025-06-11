export interface Message {
  threadId?: number
  ticketId: number
  sentAt: string
  senderWorkspaceMemberId: number
  senderName: string
  content: string
  profileFileUri?: string | null
  isCurrentUser: boolean
  isModified?: boolean
  messageState?: string
  parentThreadId?: number
  replyTo?: {
    threadId: number
    senderName: string
    content: string
    profileFileUri?: string | null
  }
  mentionedProjectMemberIds?: number[]
}

