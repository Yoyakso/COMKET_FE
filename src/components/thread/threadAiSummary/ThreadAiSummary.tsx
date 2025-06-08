import * as S from "./ThreadAiSummary.Style"
import { useState, useEffect } from "react"
import { Loader2, Bot, Sparkles, Eye, ChevronDown } from "lucide-react"
import { getAiSummary, getAiHistory, getEyelevelSummary } from "@/api/Ai"
import { Priority } from "@/types/filter"
import { EyelevelPerspective } from "@/types/eyeLevel"
import { TicketTemplateModal } from "@/components/ticketModal/TicketTemplateModal"
import { TicketTemplate } from "@/types/ticketTemplate"
import { CreateTicketModal } from "@/components/ticketModal/CreateTicketModal"
import { useParams } from "react-router-dom"

interface ActionItem {
  title: string
  priority: Priority
  dueDate?: string
  memberInfo?: {
    name: string
    projectMemberId: number
  }
}

interface ThreadAiSummaryProps {
  ticketId: number
  placeholderMessage?: string
  projectName?: string
}

type perspective = EyelevelPerspective

const PERSPECTIVE_LABELS: Record<perspective, string> = {
  DEVELOPER: "개발자",
  PROJECT_MANAGER: "PM/기획자",
  DESIGNER: "디자이너",
  DATA_ANALYST: "데이터 엔지니어",
}

const parseStringArray = (str: string): string[] => {
  if (!str) return []

  if (str.startsWith("[") && str.endsWith("]")) {
    const content = str.slice(1, -1)
    return content.split(", ").map((item) => item.trim())
  }
  return [str]
}

export const ThreadAiSummary = ({
  ticketId,
  placeholderMessage,
  projectName,
}: ThreadAiSummaryProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isEyeLevelLoading, setIsEyeLevelLoading] = useState(false)
  const [aiSummary, setAiSummary] = useState<string | string[] | null>(null)
  const [actionItems, setActionItems] = useState<ActionItem[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedJobRole, setSelectedJobRole] = useState<perspective | null>(null)
  const [currentLoadingRole, setCurrentLoadingRole] = useState<perspective | null>(null)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const [selectedActionItem, setSelectedActionItem] = useState<ActionItem | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<TicketTemplate | null>(null)
  const { projectId } = useParams<{ projectId: string; }>()

  useEffect(() => {
    const fetchAiHistory = async () => {
      try {
        const historyList = await getAiHistory(ticketId)

        if (Array.isArray(historyList) && historyList.length > 0) {
          const sortedHistory = historyList.sort(
            (a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime(),
          )

          const latest = sortedHistory[0]
          console.log("Latest history item:", latest)

          let summary = latest.summary || null
          if (typeof summary === "string" && summary.startsWith("[") && summary.endsWith("]")) {
            summary = parseStringArray(summary)
          }

          setAiSummary(summary)
          const latestWithActionItems = sortedHistory.find((item) => {
            const actionItems = item.actionItems || item.actionItem || item.actions || []
            return Array.isArray(actionItems) && actionItems.length > 0
          })

          if (latestWithActionItems) {
            const actionItems =
              latestWithActionItems.actionItems ||
              latestWithActionItems.actionItem ||
              latestWithActionItems.actions ||
              []
            setActionItems(Array.isArray(actionItems) ? actionItems : [])
          } else {
            console.log("No action items found in history")
            setActionItems([])
          }
        } else {
          console.log("No history found, resetting states")
          setAiSummary(null)
          setActionItems([])
        }
      } catch (error) {
        console.error("AI 요약 히스토리 불러오기 실패:", error)
        setAiSummary(null)
        setActionItems([])
      }
    }

    fetchAiHistory()
  }, [ticketId])

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setCurrentLoadingRole(null)
    try {
      const result = await getAiSummary(ticketId);
      setAiSummary(result.summary);
      setActionItems(result.actionItems || []);
    } catch (error) {
      console.error("AI 요약 생성 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEyeLevelSummary = async (perspective: perspective) => {
    setIsEyeLevelLoading(true)
    setIsDropdownOpen(false)
    setSelectedJobRole(perspective)
    setCurrentLoadingRole(perspective)
    try {
      const result = await getEyelevelSummary(ticketId, perspective)
      setAiSummary(result.summary || [])
    } catch (error) {
      console.error("눈높이 요약 생성 실패:", error)
    } finally {
      setIsEyeLevelLoading(false)
      setCurrentLoadingRole(null)
    }
  }

  const handleClickActionItem = (item: ActionItem) => {
    setSelectedActionItem(item)
    setIsTemplateModalOpen(true)
  }

  return (
    <>
      <S.SectionTitleContainer>
        <S.SectionTitle>AI 요약</S.SectionTitle>
        <S.ButtonGroup>
          <S.GenerateButton onClick={handleGenerateSummary} disabled={isLoading}>
            {isLoading ? (
              <>
                <S.SpinnerIcon>
                  <Loader2 size={16} />
                </S.SpinnerIcon>
                <span>요약 생성 중...</span>
              </>
            ) : (
              <>
                <S.ButtonIcon>
                  <Sparkles size={16} />
                </S.ButtonIcon>
                <span>AI 요약 생성</span>
              </>
            )}
          </S.GenerateButton>

          <S.DropdownContainer>
            <S.EyeLevelButton
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={isLoading || isEyeLevelLoading}
              $isOpen={isDropdownOpen}
            >
              {isEyeLevelLoading ? (
                <>
                  <S.SpinnerIcon>
                    <Loader2 size={16} />
                  </S.SpinnerIcon>
                  <span>눈높이 요약 중...</span>
                </>
              ) : (
                <>
                  <S.ButtonIcon>
                    <Eye size={16} />
                  </S.ButtonIcon>
                  <span>눈높이 요약</span>
                  <ChevronDown size={16} />
                </>
              )}
            </S.EyeLevelButton>

            {isDropdownOpen && (
              <S.DropdownMenu>
                {Object.entries(PERSPECTIVE_LABELS).map(([role, label]) => (
                  <S.DropdownItem
                    key={role}
                    onClick={() => handleEyeLevelSummary(role as perspective)}
                    $isSelected={selectedJobRole === role}
                  >
                    {label}
                  </S.DropdownItem>
                ))}
              </S.DropdownMenu>
            )}
          </S.DropdownContainer>

        </S.ButtonGroup>
      </S.SectionTitleContainer >

      <S.AiSummaryBox>
        {isLoading || isEyeLevelLoading ? (
          <S.LoadingContainer>
            <S.LoadingSpinner>
              <Bot size={32} />
            </S.LoadingSpinner>
            <S.LoadingText>
              {isEyeLevelLoading
                ? `${PERSPECTIVE_LABELS[selectedJobRole]} 눈높이로 요약하고 있습니다...`
                : "AI가 회의 내용을 요약하고 있습니다..."}
            </S.LoadingText>
          </S.LoadingContainer>
        ) : (
          <S.AiSummaryContent>
            {aiSummary ? (
              Array.isArray(aiSummary) ? (
                <S.SummaryList>
                  {aiSummary.map((item, index) => (
                    <S.SummaryItem key={index}>{item.replace(/^-\s*/, "")}</S.SummaryItem>
                  ))}
                </S.SummaryList>
              ) : (
                <span>{aiSummary}</span>
              )
            ) : (
              <span>"스레드 내용을 AI로 정리해보세요!"</span>
            )}
          </S.AiSummaryContent>
        )}
      </S.AiSummaryBox>

      <S.SectionTitle>액션 아이템</S.SectionTitle>
      <S.ActionItemsContainer>
        {placeholderMessage ? (
          <S.PlaceholderMessage>{placeholderMessage}</S.PlaceholderMessage>
        ) : actionItems && actionItems.length > 0 ? (
          <S.ActionItemsList>
            {actionItems.map((item, index) => (
              <S.ActionItemCard
                $priority={item.priority}
                key={`${item.title}-${index}`}
                onClick={() => handleClickActionItem(item)}
              >
                <S.ActionItemLeft>
                  <S.ActionItemTitle>{item.title}</S.ActionItemTitle>
                  <S.AssigneeDisplay>
                    <span>{item.memberInfo?.name}</span>
                  </S.AssigneeDisplay>
                </S.ActionItemLeft>
                <S.ActionItemRight>
                  <S.PriorityBadge $priority={item.priority}>{item.priority}</S.PriorityBadge>
                  <S.DueDate>{item.dueDate || "미정"}</S.DueDate>
                </S.ActionItemRight>
              </S.ActionItemCard>
            ))}
          </S.ActionItemsList>
        ) : (
          <S.PlaceholderMessage>추출된 액션아이템이 없습니다.</S.PlaceholderMessage>
        )}
      </S.ActionItemsContainer >

      {isTemplateModalOpen && selectedActionItem && (
        <TicketTemplateModal
          isOpen={isTemplateModalOpen}
          onClose={() => {
            setIsTemplateModalOpen(false)
          }}
          initialData={{
            ticket_name: selectedActionItem.title,
            ticket_priority: selectedActionItem.priority,
            assignee_member_id_list: selectedActionItem.memberInfo?.projectMemberId
              ? [selectedActionItem.memberInfo.projectMemberId]
              : [],
            due_date: selectedActionItem.dueDate || null,
            ticket_type: "기본형",
            description: "",
            parent_ticket_id: ticketId,
          }}
          onSelectTemplate={(template) => {
            setSelectedTemplate(template)
          }}
        />
      )}

      {selectedTemplate && selectedActionItem && projectId && projectName && (
        <CreateTicketModal
          onClose={() => {
            setSelectedTemplate(null)
            setSelectedActionItem(null)
          }}
          template={selectedTemplate}
          projectId={Number(projectId)}
          projectName={projectName}
          parentTicketId={ticketId}
          initialData={{
            title: selectedActionItem.title,
            // assignee_member_id_list: selectedActionItem.memberInfo?.projectMemberId || null,
            assignee_member_id_list: selectedActionItem.memberInfo?.projectMemberId
              ? [selectedActionItem.memberInfo.projectMemberId]
              : [],
            priority: selectedActionItem.priority,
            start_date: new Date().toISOString().split("T")[0],
          }}
          onSubmit={(newTicket) => {
            setSelectedTemplate(null)
            setSelectedActionItem(null)
          }}
        />
      )}
    </>
  )
}
