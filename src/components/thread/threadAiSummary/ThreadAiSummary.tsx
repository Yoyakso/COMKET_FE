import * as S from "./ThreadAiSummary.Style"
import { useState } from "react"
import { Loader2, Bot, Sparkles } from "lucide-react"

interface Assignee {
  id: number
  name: string
  avatar?: string
  code?: string
}

interface ActionItem {
  id: number
  assignee: Assignee
  task: string
  priority: "HIGH" | "MEDIUM" | "LOW"
  status: "TODO" | "IN PROGRESS" | "DONE"
}

interface ThreadAiSummaryProps {
  aiSummary: string | null
  actionItems: ActionItem[]
  placeholderMessage?: string
  onGenerateSummary?: () => Promise<string>
}

// 목업 데이터
const mockAiSummary = `이번 회의에서는 Q4 마케팅 캠페인 전략에 대해 논의했습니다. 주요 결정사항으로는 소셜미디어 광고 예산을 30% 증액하고, 인플루언서 마케팅을 강화하기로 했습니다. 또한 새로운 제품 런칭을 위한 티저 캠페인을 12월 첫째 주에 시작하기로 결정했습니다. 팀 간 협업을 위해 주간 스탠드업 미팅을 도입하고, 프로젝트 진행상황을 실시간으로 공유할 수 있는 대시보드를 구축하기로 했습니다.`

export const ThreadAiSummary = ({
  aiSummary: initialAiSummary,
  actionItems,
  placeholderMessage,
  onGenerateSummary
}: ThreadAiSummaryProps) => {

  const [isLoading, setIsLoading] = useState(false)
  const [aiSummary, setAiSummary] = useState<string | null>(initialAiSummary || mockAiSummary)

  const handleGenerateSummary = async () => {
    setIsLoading(true)
    try {
      if (onGenerateSummary) {
        const summary = await onGenerateSummary()
        setAiSummary(summary)
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setAiSummary(mockAiSummary)
      }
    } catch (error) {
      console.error("요약 생성 중 오류 발생:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <S.SectionTitleContainer>
        <S.SectionTitle>AI 요약</S.SectionTitle>
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
      </S.SectionTitleContainer>

      <S.AiSummaryBox>
        {isLoading ? (
          <S.LoadingContainer>
            <S.LoadingSpinner>
              <Bot size={32} />
            </S.LoadingSpinner>
            <S.LoadingText>AI가 회의 내용을 요약하고 있습니다...</S.LoadingText>
          </S.LoadingContainer>
        ) : (
          <S.AiSummaryContent>{aiSummary}</S.AiSummaryContent>
        )}
      </S.AiSummaryBox>

      <S.SectionTitle>액션 아이템</S.SectionTitle>
      <S.ActionItemsContainer>
        {placeholderMessage ? (
          <S.PlaceholderMessage>{placeholderMessage}</S.PlaceholderMessage>
        ) : (
          <S.ActionItemsTable>
            <S.TableHeader>
              <S.TableRow>
                <S.TableHeaderCell>담당자</S.TableHeaderCell>
                <S.TableHeaderCell>작업 상세 내용</S.TableHeaderCell>
                <S.TableHeaderCell>우선순위</S.TableHeaderCell>
                <S.TableHeaderCell>상태</S.TableHeaderCell>
              </S.TableRow>
            </S.TableHeader>
            <S.TableBody>
              {actionItems && actionItems.map((item) => (
                <S.TableRow key={item.id}>
                  <S.TableCell>
                    <S.AssigneeDisplay>
                      <S.SmallAvatar>
                        <S.AvatarImage
                          src={item.assignee.avatar || ""}
                          alt={item.assignee.name}
                        />
                      </S.SmallAvatar>
                      <span>{item.assignee.name}</span>
                    </S.AssigneeDisplay>
                  </S.TableCell>
                  <S.TableCell>{item.task}</S.TableCell>
                  <S.TableCell>
                    <S.PriorityBadge $priority={item.priority}>{item.priority}</S.PriorityBadge>
                  </S.TableCell>
                  <S.TableCell>
                    <S.StatusBadge $status={item.status}>{item.status}</S.StatusBadge>
                  </S.TableCell>
                </S.TableRow>
              ))}
            </S.TableBody>
          </S.ActionItemsTable>
        )}
      </S.ActionItemsContainer>
    </>
  )
}
