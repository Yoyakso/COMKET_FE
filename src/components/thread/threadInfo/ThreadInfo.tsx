import { CheckCircle, Tag, User, FileText, Calendar } from "lucide-react"
import * as S from "./ThreadInfo.Style"
import { StatusBadge } from "@components/ticket/StatusBadge"
import { useNavigate, useParams } from "react-router-dom"
import { PriorityBadge } from "@/components/ticket/PriorityBadge"

export const ThreadInfo = ({ ticket }) => {
  const navigate = useNavigate()
  const { projectId } = useParams<{ projectId: string }>()

  const formatDate = (dateString) => {
    if (!dateString) return "YYYY-MM-DD (W)"
    const date = new Date(dateString)
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"]
    const weekday = weekdays[date.getDay()]
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} (${weekday})`
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return "0KB"
    const kb = bytes / 1024
    return `${Math.round(kb)}KB`
  }

  return (
    <S.Container>

      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>상세 정보</S.SectionTitle>
        </S.SectionHeader>
        <S.InfoGrid style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <S.InfoSection>
            <S.InfoTitle>
              <Tag size={14} />
              유형
            </S.InfoTitle>
            <S.InfoContent>
              <S.TypeContainer>
                <S.TagBadge>{ticket.type}</S.TagBadge>
                <PriorityBadge priority={ticket.priority} />
              </S.TypeContainer>
            </S.InfoContent>
          </S.InfoSection>

          <S.InfoSection>
            <S.InfoTitle>상태</S.InfoTitle>
            <S.InfoContent>
              <S.StatusBadgeContainer>
                <StatusBadge status={ticket.status} />
              </S.StatusBadgeContainer>
            </S.InfoContent>
          </S.InfoSection>

          <S.InfoSection>
            <S.InfoTitle>
              <Calendar size={14} />
              시작 일자
            </S.InfoTitle>
            <S.InfoContent>
              <S.DateText>{formatDate(ticket.startDate)}</S.DateText>
            </S.InfoContent>
          </S.InfoSection>

          <S.InfoSection>
            <S.InfoTitle>
              <User size={14} />
              담당자
            </S.InfoTitle>
            <S.InfoContent>
              <S.UserDisplay>
                <S.SmallAvatar>
                  <S.AvatarImage
                    src={ticket.assignee_member?.avatar || "/images/avatar-1.png"}
                    alt={ticket.assignee_member?.name || "미배정"}
                  />
                </S.SmallAvatar>
                <S.UserInfo>
                  <span>{ticket.assignee_member?.name || "미배정"}</span>
                </S.UserInfo>
              </S.UserDisplay>
            </S.InfoContent>
          </S.InfoSection>

          <S.InfoSection>
            <S.InfoTitle>
              <User size={16} />
              요청자
            </S.InfoTitle>
            <S.InfoContent>
              <S.UserDisplay>
                <S.SmallAvatar>
                  <S.AvatarImage
                    src={ticket.creator_member?.avatar || "/images/avatar-1.png"}
                    alt={ticket.creator_member?.name || "미지정"}
                  />
                </S.SmallAvatar>
                <S.UserInfo>
                  <span>{ticket.creator_member?.name || "미지정"}</span>
                </S.UserInfo>
              </S.UserDisplay>
            </S.InfoContent>
          </S.InfoSection>

          <S.InfoSection>
            <S.InfoTitle>
              <Calendar size={14} />
              마감 일자
            </S.InfoTitle>
            <S.InfoContent>
              <S.DateText>{formatDate(ticket.endDate)}</S.DateText>
            </S.InfoContent>
          </S.InfoSection>
        </S.InfoGrid>

        <S.DescriptionSection>
          <S.InfoTitle>
            상세 내용
          </S.InfoTitle>
          <S.DetailContent>
            {ticket.description ? (
              <div dangerouslySetInnerHTML={{ __html: ticket.description }} />
            ) : (
              <S.PlaceholderText>상세 내용이 없습니다.</S.PlaceholderText>
            )}
          </S.DetailContent>
        </S.DescriptionSection>
      </S.Section>

      {/* 첨부 파일 섹션 */}
      {/* <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>첨부 파일</S.SectionTitle>
        </S.SectionHeader>
        <S.AttachmentsGrid>
          {ticket.attachments && ticket.attachments.length > 0 ? (
            ticket.attachments.map((file, index) => (
              <S.AttachmentItem key={index}>
                <S.FileIcon>
                  <FileText size={24} />
                  <S.FileType>PDF</S.FileType>
                </S.FileIcon>
                <S.FileInfo>
                  <S.FileName>{file.name}</S.FileName>
                  <S.FileSize>{formatFileSize(file.size)}</S.FileSize>
                </S.FileInfo>
              </S.AttachmentItem>
            ))
          ) : (
            <S.PlaceholderText>첨부된 파일이 없습니다.</S.PlaceholderText>
          )}
        </S.AttachmentsGrid>
      </S.Section> */}

      {/* 하위 티켓 섹션 */}
      {ticket.subtickets && ticket.subtickets.length > 0 && (
        <S.Section>
          <S.SectionHeader>
            <S.SectionTitle>하위 티켓</S.SectionTitle>
          </S.SectionHeader>
          <S.SubticketList>
            {ticket.subtickets.map((childTicket) => (
              <S.SubticketItem
                key={childTicket.id}
                onClick={() =>
                  navigate(`/${projectId}/tickets/${childTicket.id}/thread`, {
                    state: { ticket: childTicket, projectName: ticket.projectName },
                  })
                }
              >
                <CheckCircle size={14} />
                <span>{childTicket.title}</span>
              </S.SubticketItem>
            ))}
          </S.SubticketList>
        </S.Section>
      )}
    </S.Container>
  )
}
