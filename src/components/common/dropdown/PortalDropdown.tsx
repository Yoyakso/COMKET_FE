import { createPortal } from "react-dom";

export const PortalDropdown = ({ children }: { children: React.ReactNode }) => {
    const element = document.getElementById("dropdown-root");
    if (!element) return null;

    return createPortal(children, element);
};