import { ProjectModal, type ProjectData } from "./ProjectModal"

interface ViewProjectModalProps {
  projectData: ProjectData
  onClose: () => void
}

export const ViewProjectModal = ({ projectData, onClose }: ViewProjectModalProps) => {
  return <ProjectModal mode="view" initialData={projectData} onClose={onClose} title="프로젝트 정보" />
}
