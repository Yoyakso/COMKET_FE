import { useEffect, useState } from 'react';
import { Bell, X } from 'lucide-react';
import * as S from './NotificationPermissionBanner.Style';
import { toast } from 'react-toastify';

export const NotificationPermissionBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  // default + dismissed가 아닐 때만 노출
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      Notification.permission === 'default' &&
      localStorage.getItem('fcmPermission') !== 'dismissed'
    ) {
      setIsVisible(true);
    }
  }, []);

  const handleAllow = async () => {
    try {
      const res = await Notification.requestPermission(); // 팝업
      localStorage.setItem('fcmPermission', res); // granted / denied
      if (res === 'granted') setIsVisible(false);
      else toast.error('브라우저 설정의 알림에서 차단을 해제해 주세요.');
    } catch {
      toast.error('알림 권한 요청 중 오류가 발생했습니다.');
    }
  };

  const handleLater = () => {
    localStorage.setItem('fcmPermission', 'dismissed');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('fcmPermission', 'denied');
    toast.info('언제든 브라우저 설정에서 알림을 다시 허용할 수 있어요.');
    setIsVisible(false);
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
            <S.ActionButton onClick={handleAllow}>허용</S.ActionButton>
            <S.GhostButton onClick={handleLater}>다음에</S.GhostButton>
            <S.DangerButton onClick={handleDecline}>거부</S.DangerButton>
          </S.ButtonRow>
        </S.TextBox>

        <S.CloseButton onClick={() => setIsVisible(false)}>
          <X size={14} />
        </S.CloseButton>
      </S.BannerContent>
    </S.BannerWrapper>
  );
};
