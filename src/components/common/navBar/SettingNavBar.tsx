import type React from 'react';
import * as S from './LocalNavBar.Style';
import {
  InformationIcon,
  MemberIcon,
  PlanIcon,
  ListIcon,
  ProfileIcon,
  KeyIcon,
  AlarmIcon,
} from '@/assets/icons';
import { useWorkspaceStore } from '@/stores/workspaceStore';

export const SettingNavBar = () => {
  const workspaceSlug = useWorkspaceStore(state => state.workspaceSlug);

  const sections = [
    {
      id: 'workspace',
      title: '워크스페이스 관리',
      items: [
        {
          id: 'workspace_information',
          label: '워크스페이스 설정',
          href: `/${workspaceSlug}/settings`,
          icon: <InformationIcon />,
        },
        { id: 'plan', label: '플랜 관리', href: '/plan', icon: <PlanIcon /> },
        {
          id: 'member',
          label: '워크스페이스 멤버',
          href: `/${workspaceSlug}/member`,
          icon: <MemberIcon />,
        },
        {
          id: 'list',
          label: '프로젝트 목록',
          href: `/${workspaceSlug}/project`,
          icon: <ListIcon />,
        },
      ],
    },
    {
      id: 'account',
      title: '계정 관리',
      items: [
        { id: 'profile', label: '프로필 설정', href: '/profile', icon: <ProfileIcon /> },
        { id: 'account_information', label: '계정 정보', href: '/account', icon: <KeyIcon /> },
        { id: 'alarm', label: '알림 설정', href: '#', icon: <AlarmIcon /> },
      ],
    },
  ];

  return (
    <S.NavContainer $variant="settings">
      <S.NavContent>
        {sections.map(section => (
          <S.SectionContainer key={section.id}>
            {section.title && <S.SectionTitle>{section.title}</S.SectionTitle>}
            <S.ItemsContainer>
              {section.items.map(item => (
                <S.NavItemLink key={item.id} href={item.href}>
                  {item.icon && <S.IconWrapper>{item.icon}</S.IconWrapper>}
                  {item.label}
                </S.NavItemLink>
              ))}
            </S.ItemsContainer>
          </S.SectionContainer>
        ))}
      </S.NavContent>
    </S.NavContainer>
  );
};
