export interface ProjectMember {
  projectMemberId: number;
  name: string;
}

/**
 * 메시지 내 @멘션된 이름을 기반으로 해당 멤버 ID 목록을 추출하는 유틸 함수
 * @param message - 사용자 입력 메시지 문자열
 * @param projectMembers - 프로젝트 멤버 리스트
 * @returns 멘션된 멤버의 projectMemberId 배열
 */
export const extractMentionedProjectMemberIds = (
  message: string,
  projectMembers: ProjectMember[]
): number[] => {
  const mentionRegex = /@(\S+)/g;
  const mentionedNames = [...message.matchAll(mentionRegex)].map((m) => m[1]);
  const mentionedSet = new Set<number>();

  mentionedNames.forEach((name) => {
    const matched = projectMembers.find((m) => m.name === name);
    if (matched) mentionedSet.add(matched.projectMemberId);
  });

  return Array.from(mentionedSet);
};
