import { useState } from "react";
import { ProjectModal, type ProjectData } from "./ProjectModal"

interface ViewProjectModalProps {
  projectId: number;
  projectData: ProjectData;
  isAdmin: boolean; // 관리자 여부
  onSubmit: (projectId: number, data: ProjectData) => Promise<void>;
  onClose: () => void;
}

export const ViewProjectModal = ({ projectId, projectData, isAdmin, onSubmit, onClose }: ViewProjectModalProps) => {
  const [mode, setMode] = useState<"view" | "edit">("view");

  const handleSwitchToEdit = () => {
    setMode("edit");
  };

  return (
    <ProjectModal
      mode={mode}
      initialData={projectData}
      title="프로젝트 정보"
      onClose={onClose}
      onConfirm={(data) => onSubmit(projectId, data)}
      onEditClick={isAdmin ? handleSwitchToEdit : undefined}
    />
  )
}
