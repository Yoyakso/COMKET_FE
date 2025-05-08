import { ProjectModal, type ProjectData } from "./ProjectModal"

interface CreateProjectModalProps {
  onClose: () => void
  onConfirm: (projectData: ProjectData) => Promise<void>
}

export const CreateProjectModal = ({ onClose, onConfirm }: CreateProjectModalProps) => {
  return <ProjectModal mode="create" onClose={onClose} onConfirm={onConfirm} title="프로젝트 생성" />
}
