import { useEffect, useRef } from "react"

export const useWebSocket = ({
  ticketId,
  token,
  onMessage,
}: {
  ticketId: number
  token: string
  onMessage: (data: any) => void
}) => {
  // 웹소켓 객처는 컴포넌트가 리렌더링되더라도 유지되어야 하므로 useState가 아니라 useRef를 씀 (유지되지만 렌더링을 트리거 x)
  const socketRef = useRef<WebSocket | null>(null)

  const connect = () => {
    const ws = new WebSocket(`ws://localhost:8080/ws/chat?ticketId=${ticketId}&token=${token}`)
    socketRef.current = ws

    ws.onopen = () => console.log("✅ WebSocket 연결됨") // 연결되면 로그 출력
    ws.onmessage = (e) => { // 메세지를 받으면 호출되는 콜백
      const data = JSON.parse(e.data)
      onMessage(data) // 데이터를 외부로 전달
    }
    ws.onclose = () => console.log("❌ WebSocket 종료됨")
    ws.onerror = (e) => console.error("⚠️ WebSocket 에러", e)
  }

  const send = (message: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) { // 웹소켓이 열려있으면 OPEN -> json 문자열로 메시지 전송
      socketRef.current.send(JSON.stringify(message)) // 전송 형식은 객체를 Json.stringify() 처리
    }
  }

  const disconnect = () => {
    socketRef.current?.close() // 현재 연결된 웹소켓을 종료
  }

  // 컴포넌트가 언마운트될 때 WebSocket 자동 정리 (메모리 누수 방지)
  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [])

  // 최종 반환값, 이 훅을 사용하는 곳에서 아래 3함수 자유롭게 사용 가능
  return { connect, send, disconnect }
}
