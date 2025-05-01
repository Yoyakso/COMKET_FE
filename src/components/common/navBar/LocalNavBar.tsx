import type React from "react"
import * as S from "./LocalNavBar.Style"
import { InformationIcon, MemberIcon, PlanIcon, ListIcon, PlusIcon, ProfileIcon, KeyIcon, SettingIcon } from "@/assets/icons"
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
}

const sections: NavSection[] = [
  {
    id: "workspace",
    title: "워크스페이스 관리",
    items: [
      { id: "workspace_information", label: "워크스페이스 정보", href: "/", icon: <InformationIcon /> },
      { id: "member", label: "멤버 관리", href: "/", icon: <MemberIcon /> },
      { id: "plan", label: "플랜 관리", href: "/", icon: <PlanIcon /> },
    ],
  },
  {
    id: "project",
    title: "프로젝트 관리",
    items: [
      { id: "list", label: "프로젝트 목록", href: "/", icon: <ListIcon /> },
      { id: "menu1", label: "메뉴명", href: "/", icon: <PlusIcon /> },
      { id: "menu2", label: "메뉴명", href: "/", icon: <PlusIcon /> },
    ],
  },
  {
    id: "account",
    title: "계정 관리",
    items: [
      { id: "profile", label: "프로필 설정", href: "/", icon: <ProfileIcon /> },
      { id: "account_information", label: "계정 정보", href: "/", icon: <KeyIcon /> },
      { id: "menu3", label: "메뉴명", href: "/", icon: <PlusIcon /> },
    ],
  },
]

export const LocalNavBar = ({
  variant = 'settings',
}: NavigationBarProps) => {
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
                    onClick={item.onClick}
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
      <S.NavProfileContainer>
        <NavProfile
          name="사용자"
          defaultImage=""
          status="온라인"
        />
        <S.IconContainer>
          <SettingIcon />
        </S.IconContainer>
      </S.NavProfileContainer>
    </S.NavContainer >
  )
}
