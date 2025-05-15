import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalDropdownProps {
    triggerRef: React.RefObject<HTMLElement>;
    children: React.ReactNode;
}

export const PortalDropdown = ({ triggerRef, children }: PortalDropdownProps) => {
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    useLayoutEffect(() => {
        const updatePosition = () => {
            if (!triggerRef.current) return;

            const rect = triggerRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
            });
        };

        updatePosition();
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);

        return () => {
            window.removeEventListener("scroll", updatePosition, true);
            window.removeEventListener("resize", updatePosition);
        };
    }, [triggerRef]);

    const portalRoot = document.getElementById("dropdown-root");
    if (!portalRoot) return null; // ❗ 실패 시 아무것도 렌더링하지 않음 (안전하게 처리)

    return createPortal(
        <div
            style={{
                position: "absolute",
                top: coords.top,
                left: coords.left,
                zIndex: 9999,
            }}
        >
            {children}
        </div>,
        portalRoot
    );
};
