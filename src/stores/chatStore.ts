import { create } from 'zustand';

interface ChatMessage {
  ticketId: number;
  senderWorkspaceMemberId: number;
  senderName: string;
  content: string;
  sentAt: string;
}

interface ChatState {
  messages: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),
}));
