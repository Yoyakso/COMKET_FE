import * as S from "./EmptyProject.Style"

interface EmptyProjectStateProps {
  onCreateProject: () => void
}

export const EmptyProjectState = ({ onCreateProject }: EmptyProjectStateProps) => {
  return (
    <S.Container>
      <S.Content>
        <S.TextContainer>
          <S.Text>아직 생성된 프로젝트가 없습니다.<br />지금 프로젝트를 생성하고 팀원들과 함께 협업을 시작해 보세요.</S.Text>
        </S.TextContainer>
        <S.CreateButton onClick={onCreateProject}>프로젝트 생성</S.CreateButton>
      </S.Content>
    </S.Container>
  )
}
