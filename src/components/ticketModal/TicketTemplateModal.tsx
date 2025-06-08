import type React from "react"
import { useState } from "react"
import { FileText, Code, Lightbulb, Users, ClipboardCheck, Bug, BarChart3, BookOpen } from "lucide-react"
import type { TicketTemplate } from "@/types/ticketTemplate"
import { TICKET_TEMPLATE_DATA } from "@/constants/ticketTemplateData"
import * as S from "./TicketTemplateModal.Style"
import type { Priority } from "@/types/filter"

const iconMap = {
  FileText,
  Code,
  Lightbulb,
  Users,
  ClipboardCheck,
  Bug,
  BarChart3,
  BookOpen,
}

interface TicketTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate?: (template: TicketTemplate) => void
  initialData?: {
    ticket_name?: string
    ticket_priority?: Priority
    assignee_member_id_list?: number[] | []
    due_date?: string | null
    ticket_type?: string
    description?: string
    parent_ticket_id?: number
  }
  projectName?: string
}

export const TicketTemplateModal = ({ isOpen, onClose, onSelectTemplate, initialData, projectName }: TicketTemplateModalProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TicketTemplate | null>(null)

  if (!isOpen) return null

  const handleTemplateSelect = (template: TicketTemplate) => {
    setSelectedTemplate(template)
  }

  const handleConfirm = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate)
      onClose()
    }
  }

  const handleCancel = () => {
    setSelectedTemplate(null)
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel()
    }
  }

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap]
    return IconComponent ? <IconComponent /> : <FileText />
  }

  return (
    <S.ModalOverlay onClick={handleOverlayClick}>
      <S.ModalContainer>
        <S.CloseButton onClick={handleCancel}>×</S.CloseButton>

        <S.ModalHeader>
          <S.ModalTitle>티켓 템플릿 선택</S.ModalTitle>
          <S.ModalSubtitle>티켓 유형에 대한 표준화된 양식을 제공합니다.</S.ModalSubtitle>
        </S.ModalHeader>

        <S.ModalBody>
          <S.TemplateGrid>
            {TICKET_TEMPLATE_DATA.map((template) => (
              <S.TemplateCard
                key={template.id}
                $isSelected={selectedTemplate?.id === template.id}
                color={template.color}
                onClick={() => handleTemplateSelect(template)}
              >
                <S.CardIcon color={template.color}>{getIcon(template.icon)}</S.CardIcon>
                <S.CardTitle>{template.name}</S.CardTitle>
                <S.CardDescription>{template.purpose}</S.CardDescription>
                <S.CardTag color={template.color}>{template.type}</S.CardTag>
              </S.TemplateCard>
            ))}
          </S.TemplateGrid>
        </S.ModalBody>

        <S.ModalFooter>
          <S.Button variant="secondary" onClick={handleCancel}>
            취소
          </S.Button>
          <S.Button variant="primary" onClick={handleConfirm} disabled={!selectedTemplate}>
            선택
          </S.Button>
        </S.ModalFooter>
      </S.ModalContainer>
    </S.ModalOverlay>
  )
}
