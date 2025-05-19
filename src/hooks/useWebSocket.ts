import { useEffect, useRef, useCallback } from "react"

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
  const openedRef = useRef(false)

  const connect = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.warn("이미 연결되어 있음")
      return
    }

    const url = `${BASE_URL}/ws/chat?ticketId=${ticketId}&token=${token}`
    console.log("WebSocket 연결 시도:", url)

    const ws = new WebSocket(url)
    socketRef.current = ws

    ws.onopen = () => {
      openedRef.current = true
      console.log("WebSocket 연결됨")
    }

    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data)
        onMessage(data)
      } catch (err) {
        console.error("메시지 파싱 실패:", e.data)
      }
    }

    ws.onerror = (e) => {
      console.error("WebSocket 에러 발생", e)
    }

    ws.onclose = (e) => {
      if (!openedRef.current) {
        console.warn("onopen 전에 종료됨", e.code)
      } else {
        console.log("WebSocket 정상 종료", e.code)
      }
    }
  }, [ticketId, token, onMessage])

  const send = useCallback((message: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message))
    } else {
      console.warn("연결 안됨")
    }
  }, [])

  const disconnect = useCallback(() => {
    socketRef.current?.close()
    socketRef.current = null
    openedRef.current = false
  }, [])

  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  return { connect, send, disconnect }
}
