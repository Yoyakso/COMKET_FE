import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OutsideClick } from "@/utils/OutsideClick";
import * as S from "./BulkDropdown.Style";

interface BulkDropdownProps<T extends string = string> {
    field: "type" | "status";
    selectedValue: string;
    ticketIds: number[];
    options: readonly T[];
    onSelect: (value: T) => void;
    getColor?: (value: T) => string;
}

export const BulkDropdown = <T extends string = string>({
    field,
    selectedValue,
    ticketIds,
    options,
    onSelect,
    getColor,
}: BulkDropdownProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [hovered, setHovered] = useState<string | null>(null);

    OutsideClick(ref, () => setIsOpen(false));

    const currentColor = getColor?.(hovered ?? selectedValue) ?? "#D1D5DB";

    return (
        <S.Positioner ref={ref}>
            <S.Wrapper $color={currentColor} onClick={() => setIsOpen(!isOpen)}>
                {selectedValue}
            </S.Wrapper>

            <AnimatePresence>
                {isOpen && (
                    <S.MorphDropdown
                        as={motion.div}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        {options.map((option) => (
                            <S.Option
                                key={option}
                                $color={getColor?.(option) ?? "#D1D5DB"}
                                onMouseEnter={() => setHovered(option)}
                                onMouseLeave={() => setHovered(null)}
                                onClick={() => {
                                    onSelect(option);
                                    setIsOpen(false);
                                }}
                            >
                                {option.replace("_", " ")}
                            </S.Option>
                        ))}
                    </S.MorphDropdown>
                )}
            </AnimatePresence>
        </S.Positioner>
    );
};
