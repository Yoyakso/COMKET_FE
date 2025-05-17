import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWorkspaceBySlug } from "@/api/Workspace";
import { useWorkspaceStore } from "@/stores/workspaceStore";

/**
 * 페이지 진입 시 URL의 workspaceSlug를 이용해
 * zustand에 워크스페이스 정보를 초기화하는 훅
 */
export const useInitializeWorkspace = () => {
  const { workspaceSlug } = useParams();
  const { setWorkspaceStore, clearWorkspace } = useWorkspaceStore();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (!workspaceSlug) return;

      try {
        const ws = await fetchWorkspaceBySlug(workspaceSlug);

        setWorkspaceStore({
          workspaceName: ws.name,
          workspaceSlug: ws.slug,
          workspaceId: ws.id,
          profileFileUrl: ws.profileFileUrl ?? "",
        });
      } catch (e) {
        console.error("워크스페이스 초기화 실패:", e);
        clearWorkspace();
        navigate("/workspace");
      }
    };

    init();
  }, [workspaceSlug]);
};