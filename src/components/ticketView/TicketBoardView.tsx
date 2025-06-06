import { useState } from "react"
import * as S from "./TicketBoardView.Style"
import type { Ticket } from "@/types/ticket"
import { TicketCard } from "./TicketCard"
import { StatusSelectModal } from '../ticketModal/StatusSelectModal'
import { ClipboardList, Clock, CheckCircle, Layers } from "lucide-react"

interface TicketBoardViewProps {
  ticketList: Ticket[]
  onTicketClick: (ticket: Ticket) => void
  onTicketDrop: (ticketId: number, newStatus: string) => void
}

const statusGroups = [
  { title: "TODO", key: "TODO", icon: <ClipboardList size={16} /> },
  { title: "IN PROGRESS", key: "IN_PROGRESS", icon: <Clock size={16} /> },
  { title: "DONE", key: "DONE", icon: <CheckCircle size={16} /> },
  { title: "OTHERS", key: "OTHERS", icon: <Layers size={16} /> }, // DROP / HOLD / BACKLOG
]

const flattenTickets = (tickets: Ticket[]): Ticket[] => {
  const result: Ticket[] = []

  const dfs = (ticket: Ticket) => {
    result.push(ticket)
    if (ticket.subtickets) {
      ticket.subtickets.forEach(dfs)
    }
  }

  tickets.forEach(dfs)
  return result
}

export const TicketBoardView = ({ ticketList, onTicketClick, onTicketDrop }: TicketBoardViewProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pendingTicket, setPendingTicket] = useState<{ id: number; title: string } | null>(null) // 비동기 처리 위한 임시 변수

  const flatTickets = flattenTickets(ticketList)

  const groupedTickets = {
    TODO: flatTickets.filter((t) => t.status === "TODO"),
    IN_PROGRESS: flatTickets.filter((t) => t.status === "IN_PROGRESS"),
    DONE: flatTickets.filter((t) => t.status === "DONE"),
    OTHERS: flatTickets.filter((t) => ["DROP", "HOLD", "BACKLOG"].includes(t.status)),
  }

  const handleDrop = (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault()
    const ticketId = Number(e.dataTransfer.getData("ticketId"))

    if (targetStatus === "OTHERS") {
      const ticket = flatTickets.find((t) => t.id === ticketId)
      if (ticket) {
        setPendingTicket({ id: ticketId, title: ticket.title })
        setIsModalOpen(true)
      }
    } else {
      onTicketDrop(ticketId, targetStatus)
    }
  }

  const handleStatusConfirm = (selectedStatus: string) => {
    if (pendingTicket) {
      onTicketDrop(pendingTicket.id, selectedStatus)
      setPendingTicket(null)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setPendingTicket(null)
  }

  return (
    <>
      <S.BoardContainer>
        {statusGroups.map((group) => (
          <S.Column key={group.key} $columnType={group.key}>
            <S.ColumnHeader $columnType={group.key}>
              <S.ColumnTitle>
                {group.icon}
                <span style={{ marginLeft: "8px" }}>{group.title}</span>
              </S.ColumnTitle>
              <S.TicketCount>{(groupedTickets[group.key] || []).length}</S.TicketCount>
            </S.ColumnHeader>

            <S.TicketList
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, group.key)}
              style={{ minHeight: "700px" }}
            >
              {groupedTickets[group.key as keyof typeof groupedTickets].map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} onClick={() => onTicketClick(ticket)} />
              ))}
            </S.TicketList>
          </S.Column>
        ))}
      </S.BoardContainer>

      <StatusSelectModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleStatusConfirm}
        ticketTitle={pendingTicket?.title || ""}
      />
    </>
  )
}
