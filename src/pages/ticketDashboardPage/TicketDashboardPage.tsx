import * as S from "./TicketDashboardPage.Style";
import { useState } from "react";
import { TicketListView } from "@/components/ticketView/TicketListView";
import { TicketBoardView } from "@/components/ticketView/TicketBoardView";
import { ListChecks, Rows2, Plus } from 'lucide-react'
import { Button } from "@components/common/button/Button";
import { CreateTicketModal } from "@components/ticketModal/CreateTicketModal"

export const TicketDashboardPage = () => {
    const [viewType, setViewType] = useState<"list" | "board">("list");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateTicket = () => {
        setIsModalOpen(true);
    }

    return (
        <>
            <S.Wrapper>
                <S.Header>
                    <S.TitleGroup>
                        <div style={{ width: "calc(100% - 100px)" }}>
                            <S.Title>COMKET_통합</S.Title>
                            <S.Description>
                                프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다
                            </S.Description>
                        </div>
                        <Button size='md' variant="tealFilled" onClick={handleCreateTicket}>
                            <span style={{ marginRight: '4px' }}>
                                <Plus width={'14px'} height={'14px'} />
                            </span>
                            티켓 생성
                        </Button>
                    </S.TitleGroup>

                    <S.ViewTabBar>
                        <S.ViewTab $active={viewType === "list"} onClick={() => setViewType("list")}>
                            <ListChecks size={16} />
                            <span>목록</span>
                        </S.ViewTab>
                        <S.ViewTab $active={viewType === "board"} onClick={() => setViewType("board")}>
                            <Rows2 size={16} />
                            <span>보드</span>
                        </S.ViewTab>

                    </S.ViewTabBar>
                </S.Header>

                {viewType === "list" ? <TicketListView /> : <TicketBoardView />}
            </S.Wrapper>
            {isModalOpen && (
                <CreateTicketModal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={(data) => {
                        console.log("등록된 티켓:", data)
                        setIsModalOpen(false)
                    }}
                />
            )}

        </>
    );
};