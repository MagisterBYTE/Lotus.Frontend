import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef } from 'react';
export function ImageEditor(props) {
    const { initialImage, size, onSave } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState(initialImage);
    const [width, setWidth] = useState(128);
    const [height, setHeight] = useState(128);
    const [border, setBorder] = useState(10);
    const [borderRadius, setBorderRadius] = useState(5);
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const fileInputRef = useRef(null);
    // Обработчик выбора файла
    const handleFileSelect = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            setIsEditing(true);
        }
    };
    // Обработчик изменения масштаба
    const handleScaleChange = (event) => {
        // setEditorState(prev => ({
        //   ...prev,
        //   scale: parseFloat(event.target.value)
        // }));
    };
    // Обработчик изменения поворота
    const handleRotateChange = (event) => {
        // setEditorState(prev => ({
        //   ...prev,
        //   rotate: parseInt(event.target.value, 10)
        // }));
    };
    // Сохранение изображения
    const handleSave = () => {
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
    const handleCancel = () => {
        if (initialImage) {
            setImage(initialImage);
        }
        setIsEditing(false);
    };
    // Открытие диалога выбора файла
    const handleEditClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return (_jsx("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' } }));
}
//# sourceMappingURL=AvatarEditorBox.js.map