import * as S from "./ThreadAiSummary.Style"
import { useState, useEffect } from "react"
import { Loader2, Bot, Sparkles } from "lucide-react"
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

export const ThreadAiSummary = ({
  ticketId,
  placeholderMessage,
}: ThreadAiSummaryProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [actionItems, setActionItems] = useState<ActionItem[]>([])

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
                <S.TableHeaderCell>우선 순위</S.TableHeaderCell>
                <S.TableHeaderCell>마감 기한</S.TableHeaderCell>
              </S.TableRow>
            </S.TableHeader>
            <S.TableBody>
              {actionItems && actionItems.map((item) => (
                <S.TableRow key={item.title}>
                  <S.TableCell>
                    <S.AssigneeDisplay>
                      <S.SmallAvatar>
                        <S.AvatarImage
                          // src={item.assignee.avatar || ""}
                          alt={item.memberInfo?.name}
                        />
                      </S.SmallAvatar>
                      <span>{item.memberInfo?.name}</span>
                    </S.AssigneeDisplay>
                  </S.TableCell>
                  <S.TableCell>{item.title}</S.TableCell>
                  <S.TableCell>
                    <S.PriorityBadge $priority={item.priority}>{item.priority}</S.PriorityBadge>
                  </S.TableCell>
                  <S.TableCell>
                    <span>{item.dueDate || "미정"}</span>
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
