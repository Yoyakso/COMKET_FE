import axiosInstance from './axiosInstance';
import { ProjectData } from '../types/project';

/**
 * 프로젝트 목록 전체 조회
 * @returns
 */
export const getAllProjects = async (workspaceName: string) => {
  try {
    if (!workspaceName) throw new Error('워크스페이스 정보가 없습니다.');

    const response = await axiosInstance.get(`/api/v1/${workspaceName}/project/all`);

    return response.data;
  } catch (error) {
    console.error('프로젝트 전체 조회 실패:', error);
    throw error;
  }
};

/**
 * 프로젝트 단건 조회
 * @param projectId
 * @returns
 */
export const getProjectById = async (
  workspaceName: string,
  projectId: string,
): Promise<ProjectData> => {
  try {
    if (!workspaceName) throw new Error('워크스페이스 정보가 없습니다.');

    const response = await axiosInstance.get(`/api/v1/${workspaceName}/${projectId}`);
    const raw = response.data;

    return {
      id: raw.projectId,
      name: raw.projectName,
      description: raw.projectDescription,
      tag: (raw.projectTag || []).join(', '),
      visibility: raw.isPublic ? '전체 공개' : '멤버 공개',
      admin: raw.adminInfo.name,
      adminInfo: [raw.adminInfo],
      memberCount: 0,
      createdBy: raw.adminInfo.email,
      createdAt: raw.createTime,
    };
  } catch (error) {
    console.error(`프로젝트(${projectId}) 조회 실패:`, error);
    throw error;
  }
};

/**
 * 내가 속한 프로젝트 전체 조회
 * @returns
 */
export const getMyProjects = async (): Promise<ProjectData[]> => {
  try {
    const workspaceName = localStorage.getItem('workspaceName');
    if (!workspaceName) throw new Error('워크스페이스 정보가 없습니다.');

    const response = await axiosInstance.get(`/api/v1/${workspaceName}/project/my`);
    return response.data;
  } catch (error) {
    console.error('내가 속한 프로젝트 조회 실패:', error);
    throw error;
  }
};

interface CreateProjectDto {
  name: string;
  description: string;
  isPublic: boolean;
  tags: string[];
  profile_file_id: number | null;
}

/**
 * 프로젝트 생성
 * @param workspaceName 워크스페이스 이름 (path param으로 사용)
 * @param projectData 생성할 프로젝트 데이터
 * @returns 생성된 프로젝트 정보
 */
export const createProject = async (workspaceName: string, projectData: CreateProjectDto) => {
  try {
    if (!workspaceName) throw new Error('워크스페이스 정보가 없습니다.');

    const response = await axiosInstance.post(`/api/v1/${workspaceName}/project`, projectData);
    return response.data;
  } catch (error) {
    console.error('프로젝트 생성 실패:', error);
    throw error;
  }
};

export interface UpdateProjectDto {
  name?: string;
  description?: string;
  isPublic?: boolean;
  profile_file_id?: string;
}

/**
 * 프로젝트 삭제
 * @param workspaceName 워크스페이스 식별자 (slug)
 * @param projectId 삭제할 프로젝트 ID
 * @returns
 */
export const deleteProject = async (workspaceName: string, projectId: number) => {
  try {
    const encodedWorkspaceName = encodeURIComponent(workspaceName);

    const response = await axiosInstance.delete(`/api/v1/${encodedWorkspaceName}/${projectId}`);
    console.log('프로젝트 삭제 성공');
    return response.data;
  } catch (error) {
    console.error('프로젝트 삭제 실패:', error);
    throw error;
  }
};

/**
 * 프로젝트 멤버 탈퇴
 * @param workspaceName
 * @param projectId
 * @returns
 */
export const leaveProject = async (workspaceName: string, projectId: number) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/${workspaceName}/${projectId}/exit`);
    console.log('프로젝트 탈퇴 성공');
    return response.data;
  } catch (error) {
    console.error('프로젝트 탈퇴 실패:', error);
    throw error;
  }
};

/**
 * 프로젝트 멤버 삭제
 * @param workspaceName 워크스페이스 이름
 * @param projectId 프로젝트 ID
 * @param projectMemberId 삭제할 프로젝트 멤버의 ID (쿼리 파라미터로 전달됨)
 */
export const deleteProjectMember = async (
  workspaceName: string,
  projectId: number,
  projectMemberId: number,
) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/${workspaceName}/${projectId}/edit/members`,
      {
        params: {
          projectMemberId,
        },
      },
    );

    console.log('멤버 삭제 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('멤버 삭제 실패:', error);
    throw error;
  }
};

/**
 * 프로젝트 멤버 조회
 * @param workspaceName - 워크스페이스 이름
 * @param projectId - 조회할 프로젝트 ID
 * @returns 멤버 목록 배열
 */
export const getProjectMembers = async (workspaceName: string, projectId: number) => {
  try {
    if (!workspaceName) throw new Error('워크스페이스 정보가 없습니다.');
    const encodedWorkspaceName = encodeURIComponent(workspaceName);

    const response = await axiosInstance.get(
      `/api/v1/${encodedWorkspaceName}/${projectId}/members`,
    );

    console.log('프로젝트 멤버 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('프로젝트 멤버 조회 실패:', error);
    throw error;
  }
};

interface InviteProjectMembersDto {
  workspaceMemberIdList: number[];
  positionType: 'ADMIN' | 'MEMBER';
}

/**
 * 프로젝트 멤버 초대
 * @param workspaceName 워크스페이스 이름
 * @param projectId 프로젝트 ID
 * @param payload 초대할 멤버 ID 목록과 역할
 */
export const inviteProjectMembers = async (
  workspaceName: string,
  projectId: number,
  payload: InviteProjectMembersDto,
) => {
  try {
    if (!workspaceName) throw new Error('워크스페이스 정보가 없습니다.');

    const encodedWorkspaceName = encodeURIComponent(workspaceName);

    const response = await axiosInstance.post(
      `/api/v1/${encodedWorkspaceName}/${projectId}/members`,
      payload,
    );

    console.log('프로젝트 멤버 초대 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('프로젝트 멤버 초대 실패:', error);
    throw error;
  }
};

interface EditProjectPayload {
  name: string;
  description: string;
  isPublic: boolean;
  tags: string[];
  profile_file_id: number | null;
}

/**
 * 프로젝트 정보 수정 API 호출
 * @param workspaceName 워크스페이스 이름
 * @param projectId 프로젝트 ID
 * @param payload 수정할 프로젝트 데이터
 */
export const editProject = async (
  workspaceName: string,
  projectId: number,
  payload: EditProjectPayload,
) => {
  try {
    if (!workspaceName) throw new Error('워크스페이스 정보가 없습니다.');

    const encodedWorkspaceName = encodeURIComponent(workspaceName);

    const response = await axiosInstance.patch(
      `/api/v1/${encodedWorkspaceName}/${projectId}/edit`,
      payload,
    );

    return response.data;
  } catch (error) {
    console.error('프로젝트 수정 실패:', error);
    throw error;
  }
};

interface EditProjectMemberDto {
  projectMemberId: number;
  positionType: 'ADMIN' | 'MEMBER';
}

/**
 * 프로젝트 멤버 관리
 * @param workspaceName
 * @param projectId
 * @param payload
 * @returns
 */
export const editProjectMemberRole = async (
  workspaceName: string,
  projectId: number,
  payload: EditProjectMemberDto,
) => {
  try {
    if (!workspaceName) throw new Error('워크스페이스 정보가 없습니다.');

    const encodedWorkspaceName = encodeURIComponent(workspaceName);

    const response = await axiosInstance.patch(
      `/api/v1/${encodedWorkspaceName}/${projectId}/edit/members`,
      payload,
    );

    console.log('역할 수정 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('프로젝트 멤버 역할 수정 실패:', error);
    throw error;
  }
};
