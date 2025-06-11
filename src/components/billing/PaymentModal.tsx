import * as S from './PaymentModal.Style';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/common/button/Button';
import { X } from 'lucide-react';

declare global {
  interface Window {
    IMP: any;
  }
}

interface PaymentModalProps {
  selectedPlan: {
    name: string;
    userRange: string;
    price: number;
    description: string;
  };
  onClose: () => void;
  onConfirm: (cardInfo: {
    cardNumber: string;
    cardholderName: string;
    expiryDate: string;
    cvc: string;
  }) => Promise<void>;
}

export const PaymentModal = ({ selectedPlan, onClose, onConfirm }: PaymentModalProps) => {
  const total = selectedPlan.price;

  const [cardParts, setCardParts] = useState(['', '', '', '']);
  const [cardTouched, setCardTouched] = useState(false);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef(null), useRef(null), useRef(null)];
  const [cvc, setCvc] = useState('');
  const [cvcTouched, setCvcTouched] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('01');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [cardholderName, setCardholderName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (window.IMP) {
      window.IMP.init('imp53325701'); // 너희 imp 식별코드
    }
  }, []);

  const handlePayment = () => {
    window.IMP.request_pay(
      {
        pg: 'kakaopay.TCSUBSCRIP', // 정기결제 PG사+CID
        pay_method: 'card',
        merchant_uid: `comket_${new Date().getTime()}`, // 주문번호
        name: selectedPlan.name,
        amount: 0, // 최초 billing_key 발급 시 amount는 0원 (카드 등록만)
        customer_uid: 'user1234', // 유저별 고유값 (DB 기준으로 생성해서 백엔드 전달)
        buyer_email: 'example@comket.com',
        buyer_name: '홍길동',
      },
      (rsp: any) => {
        if (rsp.success) {
          alert('카드 등록 완료');
          console.log('카드등록 응답:', rsp);

          // rsp.customer_uid와 billing_key를 백엔드에 저장 요청
        } else {
          alert('카드 등록 실패: ' + rsp.error_msg);
        }
      },
    );
  };

  const handleCardChange = (value: string, index: number) => {
    if (!cardTouched) setCardTouched(true);
    const onlyNums = value.replace(/\D/g, '').slice(0, 4);
    const newParts = [...cardParts];
    newParts[index] = onlyNums;
    setCardParts(newParts);
    if (onlyNums.length === 4 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const isCardNumberValid = cardParts.every(p => p.length === 4);
  const isCvcValid = /^\d{3}$/.test(cvc);
  const isNameValid = cardholderName.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = isCardNumberValid && isCvcValid && isNameValid && isEmailValid;

  return (
    <>
      <S.ModalBackground onClick={onClose} />
      <S.Modal>
        {/* 닫기 아이콘 */}
        <S.CloseIcon onClick={onClose}>
          <X size={20} />
        </S.CloseIcon>

        <S.Header>
          <S.Title>결제 정보</S.Title>
          <S.Subtitle>선택하신 플랜의 결제를 진행합니다</S.Subtitle>
        </S.Header>

        <S.Body>
          <S.PlanSection>
            <S.PlanName>{selectedPlan.name} 플랜</S.PlanName>
            <S.PlanDescription>{selectedPlan.userRange}</S.PlanDescription>

            <S.PriceBox>
              <S.PriceLabel>월 구독료</S.PriceLabel>
              <S.PriceValue>₩{selectedPlan.price.toLocaleString('ko-KR')}</S.PriceValue>
              <S.PriceSub>월 사용자당, 연간 청구</S.PriceSub>
            </S.PriceBox>

            <S.DescriptionList>{selectedPlan.description}</S.DescriptionList>

            <S.SummaryBox>
              <S.SummaryItem>
                <span>총 결제 금액</span>
                <span>₩{total.toLocaleString('ko-KR')}</span>
              </S.SummaryItem>
            </S.SummaryBox>
          </S.PlanSection>

          <S.PaymentForm>
            <S.FormGroup>
              <label>카드 번호</label>
              <S.CardNumberWrapper>
                {cardParts.map((part, i) => (
                  <input
                    key={i}
                    ref={inputRefs[i]}
                    value={part}
                    onChange={e => handleCardChange(e.target.value, i)}
                    maxLength={4}
                    placeholder="0000"
                    style={{ width: '60px', textAlign: 'center' }}
                  />
                ))}
              </S.CardNumberWrapper>
            </S.FormGroup>

            <S.FormRow>
              <S.FormGroup>
                <label>만료월</label>
                <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
                  {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(
                    m => (
                      <option key={m}>{m}</option>
                    ),
                  )}
                </select>
              </S.FormGroup>
              <S.FormGroup>
                <label>만료년</label>
                <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                  {['2024', '2025', '2026', '2027', '2028'].map(y => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </S.FormGroup>
              <S.FormGroup>
                <label>CVC</label>
                <input
                  placeholder="123"
                  value={cvc}
                  onChange={e => {
                    if (!cvcTouched) setCvcTouched(true);
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 3) setCvc(val);
                  }}
                />
              </S.FormGroup>
            </S.FormRow>

            <S.FormGroup>
              <label>카드 소유자명</label>
              <input
                placeholder="홍길동"
                value={cardholderName}
                onChange={e => setCardholderName(e.target.value)}
              />
            </S.FormGroup>

            <S.FormGroup>
              <label>이메일 주소</label>
              <input
                placeholder="example@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </S.FormGroup>

            <S.InfoText>결제 정보는 안전하게 암호화됩니다</S.InfoText>

            <Button
              style={{ width: '100%', marginTop: '3px' }}
              $variant="tealFilled"
              size="md"
              disabled={!isFormValid}
              onClick={handlePayment}
            >
              ₩{total.toLocaleString('ko-KR')} 결제하기 →
            </Button>
          </S.PaymentForm>
        </S.Body>
      </S.Modal>
    </>
  );
};
