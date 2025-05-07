import React, { useState, useCallback, useRef, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import * as S from './ImageUpload.Style';
import { Button } from '@/components/common/button/Button';
import { getCroppedImg } from '@/utils/image/getCroppedImg';
import DropdownIcon from '@/assets/icons/DropdownIcon.svg?react';

interface ImageUploadProps {
    onClose: () => void;
    onImageSelect: (file: File) => void;
}

export const ImageUpload = ({ onClose, onImageSelect }: ImageUploadProps) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const onCropComplete = useCallback((_: any, area: any) => {
        setCroppedAreaPixels(area);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setImageSrc(url);
        setZoom(1); // reset zoom
    };

    const generatePreview = async () => {
        if (imageSrc && croppedAreaPixels) {
            const file = await getCroppedImg(imageSrc, croppedAreaPixels);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    useEffect(() => {
        generatePreview();
    }, [croppedAreaPixels]);

    const handleUpload = async () => {
        if (!imageSrc || !croppedAreaPixels) return;

        try {
            const file = await getCroppedImg(imageSrc, croppedAreaPixels);
            onImageSelect(file);
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <S.Container>
            <S.Modal>
                <S.Title>대표 이미지 설정</S.Title>

                <S.ImageCropRow>
                    <S.ImageBox onClick={() => fileInputRef.current?.click()}>
                        {imageSrc ? (
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropSize={{ width: 120, height: 120 }}
                                minZoom={0.4} // 자유롭게 축소 가능
                                restrictPosition={false}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        ) : (
                            <S.Placeholder />
                        )}
                    </S.ImageBox>

                    <S.PreviewGroup>
                        <S.PreviewLabel>미리보기</S.PreviewLabel>

                        <S.PreviewWrapper>
                            {previewUrl ? (
                                <img src={previewUrl} alt="미리보기" width={120} height={120} />
                            ) : (
                                <S.PreviewPlaceholder><DropdownIcon /></S.PreviewPlaceholder>
                            )}
                        </S.PreviewWrapper>
                    </S.PreviewGroup>
                </S.ImageCropRow>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />

                <S.ButtonWrapper>
                    <Button variant="neutralOutlined" size="md" onClick={onClose}>취소</Button>
                    <Button
                        variant={imageSrc ? "tealFilled" : "neutralOutlined"}
                        size="md"
                        onClick={handleUpload}
                        disabled={!imageSrc}
                    >
                        등록
                    </Button>
                </S.ButtonWrapper>
            </S.Modal>
        </S.Container>
    );
};
