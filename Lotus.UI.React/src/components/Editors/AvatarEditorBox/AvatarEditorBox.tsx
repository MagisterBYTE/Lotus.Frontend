import { Box, Grid } from '#components/Layout';
import { AvatarEditor, Position } from '#external/react-avatar-editor';
import React, { useState, useRef, useCallback } from 'react';

export interface IImageEditorProps
{
  initialImage?: string;
  size?: number;
  onSave?: (imageData: string) => void;
}

export function ImageEditor(props: IImageEditorProps)
{
  const { initialImage, size, onSave } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [image, setImage] = useState<string | File | undefined>(initialImage);
  const [width, setWidth] = useState<number>(128);
  const [height, setHeight] = useState<number>(128);
  const [border, setBorder] = useState<number>(10);
  const [borderRadius, setBorderRadius] = useState<number>(5);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Обработчик выбора файла
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    const file = event.target.files?.[0];
    if (file)
    {
      setImage(file);
      setIsEditing(true);
    }
  };

  // Обработчик изменения масштаба
  const handleScaleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    // setEditorState(prev => ({
    //   ...prev,
    //   scale: parseFloat(event.target.value)
    // }));
  };

  // Обработчик изменения поворота
  const handleRotateChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    // setEditorState(prev => ({
    //   ...prev,
    //   rotate: parseInt(event.target.value, 10)
    // }));
  };

  // Сохранение изображения
  const handleSave = () =>
  {
    // if (editorRef.current)
    // {
    //   const canvas = editorRef.current.getImageScaledToCanvas();
    //   const imageData = canvas.toDataURL('image/png');

    //   setImage(imageData);
    //   setIsEditing(false);

    //   if (onSave)
    //   {
    //     onSave(imageData);
    //   }
    // }
  };

  // Отмена редактирования
  const handleCancel = () =>
  {
    if (initialImage)
    {
      setImage(initialImage);
    }
    setIsEditing(false);
  };

  // Открытие диалога выбора файла
  const handleEditClick = () =>
  {
    if (fileInputRef.current)
    {
      fileInputRef.current.click();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
    </div>
  );
};