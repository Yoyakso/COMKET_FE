export interface CropArea {
  width: number;
  height: number;
  x: number;
  y: number;
}

/**
 * @param imageSrc - 크롭될 이미지의 원본 url
 * @param crop - 크롭 영역의 좌표 및 크기
 * @returns - 크롭된 이미지의 Blob 객체
 */

export const getCroppedImg = async (
  imageSrc: string,
  crop: CropArea
): Promise<File> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Canvas context not found');

  canvas.width = crop.width;
  canvas.height = crop.height;
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject(new Error('Canvas is empty'));
      const file = new File([blob], 'cropped_image.jpg', { type: 'image/jpeg' });
      resolve(file);
    }, 'image/jpeg');
  });
};

const createImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (err) => reject(err));
    image.src = url;
    image.crossOrigin = 'anonymous';
  });
};