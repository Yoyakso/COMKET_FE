import * as S from "./ThreadAiSummary.Style"
import { useState, useEffect } from "react"
import { Loader2, Bot, Sparkles, Eye, ChevronDown } from "lucide-react"
import { getAiSummary, getAiHistory } from "@/api/Ai"
import { Priority } from "@/types/filter"

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
}

type JobRole = "DEVELOPER" | "PROJECT_MANAGER" | "DESIGNER" | "DATA_ANALYST"

const JOB_ROLE_LABELS: Record<JobRole, string> = {
  DEVELOPER: "개발자",
  PROJECT_MANAGER: "PM/기획자",
  DESIGNER: "디자이너",
  DATA_ANALYST: "데이터 엔지니어",
}

export const ThreadAiSummary = ({
  ticketId,
  placeholderMessage,
}: ThreadAiSummaryProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isEyeLevelLoading, setIsEyeLevelLoading] = useState(false)
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [actionItems, setActionItems] = useState<ActionItem[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedJobRole, setSelectedJobRole] = useState<JobRole>("DEVELOPER")

  useEffect(() => {
    const fetchAiHistory = async () => {
      try {
        const historyList = await getAiHistory(ticketId);
        if (Array.isArray(historyList) && historyList.length > 0) {
          const latest = historyList.sort(
            (a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
          )[0];

          setAiSummary(latest.summary || null);
          setActionItems(latest.actionItems || []);
        } else {
          setAiSummary(null);
          setActionItems([]);
        }
      } catch (error) {
        console.error("AI 요약 히스토리 불러오기 실패:", error);
      }
    };

    fetchAiHistory();
  }, [ticketId]);

  const handleGenerateSummary = async () => {
    setIsLoading(true);
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

  const handleEyeLevelSummary = async (jobRole: JobRole) => {
    setIsEyeLevelLoading(true)
    setIsDropdownOpen(false)
    try {
      // const result = await getAiSummary(ticketId, { jobRole })
      // setAiSummary(result.summary)
      // setActionItems(result.actionItems || [])
    } catch (error) {
      console.error("눈높이 요약 생성 실패:", error)
    } finally {
      setIsEyeLevelLoading(false)
    }
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
                {Object.entries(JOB_ROLE_LABELS).map(([role, label]) => (
                  <S.DropdownItem
                    key={role}
                    onClick={() => handleEyeLevelSummary(role as JobRole)}
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
        {isLoading ? (
          <S.LoadingContainer>
            <S.LoadingSpinner>
              <Bot size={32} />
            </S.LoadingSpinner>
            <S.LoadingText>AI가 회의 내용을 요약하고 있습니다...</S.LoadingText>
          </S.LoadingContainer>
        ) : (
          <S.AiSummaryContent>{aiSummary || "스레드 내용을 AI로 정리해보세요!"}</S.AiSummaryContent>
        )}
      </S.AiSummaryBox>

      <S.SectionTitle>액션 아이템</S.SectionTitle>
      <S.ActionItemsContainer>
        {placeholderMessage ? (
          <S.PlaceholderMessage>{placeholderMessage}</S.PlaceholderMessage>
        ) : actionItems && actionItems.length > 0 ? (
          <S.ActionItemsList>
            {actionItems.map((item, index) => (
              <S.ActionItemCard $priority={item.priority} key={`${item.title}-${index}`}>
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
      </S.ActionItemsContainer>
    </>
  )
}
