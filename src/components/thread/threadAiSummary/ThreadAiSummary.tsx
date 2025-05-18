import * as S from "./ThreadAiSummary.Style"

export const ThreadAiSummary = ({ aiSummary, actionItems }) => (
  <>
    <S.SectionTitle>AI 요약</S.SectionTitle>
    <S.AiSummaryBox>
      <S.AiSummaryContent>{aiSummary}</S.AiSummaryContent>
    </S.AiSummaryBox>

    <S.SectionTitle>액션 아이템</S.SectionTitle>
    <S.ActionItemsContainer>
      <S.ActionItemsTable>
        <S.TableHeader>
          <S.TableHeaderCell>담당자</S.TableHeaderCell>
          <S.TableHeaderCell>작업 상세 내용</S.TableHeaderCell>
          <S.TableHeaderCell>우선순위</S.TableHeaderCell>
          <S.TableHeaderCell>상태</S.TableHeaderCell>
        </S.TableHeader>
        <S.TableBody>
          {actionItems.map((item) => (
            <S.TableRow key={item.id}>
              <S.TableCell>
                <S.AssigneeDisplay>
                  <S.SmallAvatar>
                    <S.AvatarImage src={item.assignee.avatar || "/placeholder.svg"} alt={item.assignee.name} />
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
    </S.ActionItemsContainer>
  </>
)
