import { useEffect, useRef } from "react"

const BASE_URL = import.meta.env.VITE_WEBSOCKET_URL;

export const useWebSocket = ({
  ticketId,
  token,
  onMessage,
}: {
  ticketId: number
  token: string
  onMessage: (data: any) => void
}) => {
  const socketRef = useRef<WebSocket | null>(null)
  const openedRef = useRef(false) // 연결이 성공했는지 여부 추적

  const connect = () => {
    const url = `${BASE_URL}/ws/chat?ticketId=${ticketId}&token=${token}`
    console.log(" WebSocket 연결 시도:", url)

    const ws = new WebSocket(url)
    socketRef.current = ws

    ws.onopen = () => {
      openedRef.current = true
      console.log(" WebSocket 연결됨")
    }

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)
      onMessage(data)
    }

    ws.onerror = (e) => {
      console.error("⚠️ WebSocket 에러 발생", e)
    }

    ws.onclose = (e) => {
      if (!openedRef.current) {
        console.warn("WebSocket이 onopen 전에 종료됨 (초기 연결 실패)", e.code)
      } else {
        console.log("WebSocket 종료됨 (정상 연결 후 끊김)", e.code)
      }
    }
  }

  const send = (message: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message))
    } else {
      console.warn("ㄴ WebSocket이 열려 있지 않아 메시지를 보낼 수 없습니다.")
    }
  }

  const disconnect = () => {
    socketRef.current?.close()
  }

  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [])

  return { connect, send, disconnect }
}
