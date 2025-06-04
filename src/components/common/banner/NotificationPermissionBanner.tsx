'use client';

import { useEffect, useState } from 'react';
import { Bell, X } from 'lucide-react';
import * as S from './NotificationPermissionBanner.Style';

export const NotificationPermissionBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const status = Notification.permission;
      if (status !== 'granted') {
        setIsVisible(true);
      }
    }
  }, []);

  const handleRequestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <S.BannerWrapper>
      <S.BannerContent>
        <S.IconCircle>
          <Bell size={16} strokeWidth={2.2} className="text-blue-600" />
        </S.IconCircle>

        <S.TextBox>
          <S.Title>실시간 알림을 놓치지 마세요</S.Title>
          <S.Description>
            담당 티켓 변경, 멘션, 스레드 요약 등 <br /> 중요한 소식을 바로 받아볼 수 있어요.
          </S.Description>
          <S.ButtonRow>
            <S.ActionButton onClick={handleRequestPermission}>허용하기</S.ActionButton>
            <S.GhostButton onClick={() => setIsVisible(false)}>닫기</S.GhostButton>
          </S.ButtonRow>
        </S.TextBox>

        <S.CloseButton onClick={() => setIsVisible(false)}>
          <X size={14} />
        </S.CloseButton>
      </S.BannerContent>
    </S.BannerWrapper>
  );
};
