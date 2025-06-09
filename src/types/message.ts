export interface Message {
  threadId?: number
  ticketId: number
  sentAt: string
  senderMemberId: number
  senderName: string
  content: string
  isCurrentUser: boolean
  isModified?: boolean
  messageState?: string
  parentThreadId?: number
  replyTo?: {
    threadId: number
    senderName: string
    content: string
  }
}

