import type React from "react"
import * as S from "./LocalNavBar.Style"
import { InformationIcon, MemberIcon, PlanIcon, ListIcon, ProfileIcon, KeyIcon } from "@/assets/icons"
import { NavProfile } from "./NavProfile"

export interface NavItem {
  id: string
  label: string
  icon?: React.ReactNode
  href?: string
  onClick?: () => void
  active?: boolean
}

export interface NavSection {
  id: string
  title?: string
  items: NavItem[]
}

export interface NavigationBarProps {
  variant?: "default" | "settings"
  onNavigateMember?: () => void
  onNavigateProject?: () => void
}

export const LocalNavBar = ({
  variant = 'settings',
  onNavigateMember,
  onNavigateProject,
}: NavigationBarProps) => {
  const sections: NavSection[] = [
    {
      id: "workspace",
      title: "워크스페이스 관리",
      items: [
        { id: "workspace_information", label: "워크스페이스 설정", href: "/workspace/manage/info", icon: <InformationIcon /> },
        { id: "plan", label: "플랜 관리", href: "/", icon: <PlanIcon /> },
        { id: "member", label: "멤버 관리", href: "/member", icon: <MemberIcon />, onClick: onNavigateMember, },
        { id: "list", label: "프로젝트 관리", href: "/project", icon: <ListIcon />, onClick: onNavigateProject, },
      ],
    },
    {
      id: "account",
      title: "계정 관리",
      items: [
        { id: "profile", label: "프로필 설정", href: "/profile", icon: <ProfileIcon /> },
        { id: "account_information", label: "계정 정보", href: "/", icon: <KeyIcon /> },
      ],
    },
  ]

  return (
    <S.NavContainer $variant={variant}>
      {variant === "settings" && (
        <S.NavContent>
          {sections.map((section) => (
            <S.SectionContainer key={section.id}>
              {section.title && <S.SectionTitle>{section.title}</S.SectionTitle>}
              <S.ItemsContainer>
                {section.items.map((item) => (
                  <S.NavItemLink
                    key={item.id}
                    href={item.href || "#"}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }}
                    $active={item.active}
                  >
                    {item.icon && <S.IconWrapper>{item.icon}</S.IconWrapper>}
                    {item.label}
                  </S.NavItemLink>
                ))}
              </S.ItemsContainer>
            </S.SectionContainer>
          ))}
        </S.NavContent>
      )}
      <S.Divider />
      <S.NavProfileContainer>
        <NavProfile
          name="사용자"
          defaultImage=""
          status="온라인"
        />
      </S.NavProfileContainer>
    </S.NavContainer >
  )
}
