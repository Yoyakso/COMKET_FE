import { SettingNavBar } from './SettingNavBar';
import { ProjectNavBar } from './ProjectNavBar';

export interface NavigationBarProps {
  variant?: 'settings' | 'project';
  onNavigateProject?: () => void;
  onNavigateMember?: () => void;
}

export const LocalNavBar = ({
  variant = 'settings',
  onNavigateProject,
  onNavigateMember,
}: NavigationBarProps) => {
  if (variant === 'project') {
    return <ProjectNavBar onNavigateProject={onNavigateProject} />;
  }
  return <SettingNavBar />;
};
