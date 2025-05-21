import * as S from "./ThreadAiSummary.Style"

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
  priority: "상" | "중" | "하"
  status: "대기" | "진행중" | "완료"
}

interface ThreadAiSummaryProps {
  aiSummary: string | null
  actionItems: ActionItem[]
  placeholderMessage?: string
}

export const ThreadAiSummary = ({
  aiSummary,
  actionItems,
  placeholderMessage,
}: ThreadAiSummaryProps) => {
  return (
    <>
      <S.SectionTitle>AI 요약</S.SectionTitle>
      <S.AiSummaryBox>
        <S.AiSummaryContent>{aiSummary}</S.AiSummaryContent>
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
              {actionItems.map((item) => (
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
