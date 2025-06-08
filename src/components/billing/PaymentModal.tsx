import * as S from './PaymentModal.Style';
import React, { useState, useRef } from 'react';
import { Button } from '@/components/common/button/Button';

interface PaymentModalProps {
  selectedPlan: {
    name: string;
    userRange: string;
    price: number;
    features: string[];
  };
  onClose: () => void;
  onConfirm: () => void;
}

export const PaymentModal = ({ selectedPlan, onClose, onConfirm }: PaymentModalProps) => {
  const tax = Math.round(selectedPlan.price * 0.1 * 100) / 100;
  const total = selectedPlan.price + tax;

  // 카드번호 4칸 분리
  const [cardParts, setCardParts] = useState(['', '', '', '']);
  const [cardTouched, setCardTouched] = useState(false);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef(null), useRef(null), useRef(null)];
  const [cvc, setCvc] = useState('');
  const [cvcTouched, setCvcTouched] = useState(false);
  const isCvcValid = /^\d{3}$/.test(cvc);

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

  return (
    <>
      <S.ModalBackground onClick={onClose} />
      <S.Modal>
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
              <S.PriceValue>${selectedPlan.price.toFixed(2)}</S.PriceValue>
              <S.PriceSub>월 사용자당, 연간 청구</S.PriceSub>
            </S.PriceBox>

            <S.FeatureList>
              {selectedPlan.features.map((f, i) => (
                <S.FeatureItem key={i}>✓ {f}</S.FeatureItem>
              ))}
            </S.FeatureList>

            <S.SummaryBox>
              <S.SummaryItem>
                <span>월 구독료</span>
                <span>${selectedPlan.price.toFixed(2)}</span>
              </S.SummaryItem>
              <S.SummaryItem>
                <span>부가세 (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </S.SummaryItem>
              <S.TotalAmount>
                <span>총 결제 금액</span>
                <span>${total.toFixed(2)}</span>
              </S.TotalAmount>
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
                    style={{
                      width: '60px',
                      textAlign: 'center',
                    }}
                  />
                ))}
              </S.CardNumberWrapper>
            </S.FormGroup>

            <S.FormRow>
              <S.FormGroup>
                <label>만료월</label>
                <select>
                  {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(
                    m => (
                      <option key={m}>{m}</option>
                    ),
                  )}
                </select>
              </S.FormGroup>
              <S.FormGroup>
                <label>만료년</label>
                <select>
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
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 3) setCvc(value);
                  }}
                />
              </S.FormGroup>
            </S.FormRow>

            <S.FormGroup>
              <label>카드 소유자명</label>
              <input placeholder="홍길동" />
            </S.FormGroup>

            <S.FormGroup>
              <label>이메일 주소</label>
              <input placeholder="example@company.com" />
            </S.FormGroup>

            <S.InfoText>결제 정보는 안전하게 암호화됩니다</S.InfoText>
            <Button
              style={{ width: '100%', marginTop: '3px' }}
              $variant="tealFilled"
              size="md"
              disabled={!isCardNumberValid || !isCvcValid}
              onClick={onConfirm}
            >
              ${total.toFixed(2)} 결제하기 →
            </Button>
          </S.PaymentForm>
        </S.Body>
      </S.Modal>
    </>
  );
};
