import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AvatarEditor } from '#external/react-avatar-editor';
import { useState, useRef, useCallback } from 'react';
export const AvatarEditorBox = ({ initialImage, name = 'User', size = 150, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState(initialImage);
    const [editorState, setEditorState] = useState({
        scale: 1,
        rotate: 0,
        position: { x: 0.5, y: 0.5 }
    });
    const editorRef = useRef(null);
    const fileInputRef = useRef(null);
    // Генерация инициалов
    const getInitials = useCallback((userName) => {
        return userName
            .split(' ')
            .map(part => part.charAt(0).toUpperCase())
            .join('')
            .slice(0, 2);
    }, []);
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
        setEditorState(prev => ({
            ...prev,
            scale: parseFloat(event.target.value)
        }));
    };
    // Обработчик изменения поворота
    const handleRotateChange = (event) => {
        setEditorState(prev => ({
            ...prev,
            rotate: parseInt(event.target.value, 10)
        }));
    };
    // Сохранение изображения
    const handleSave = () => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImageScaledToCanvas();
            const imageData = canvas.toDataURL('image/png');
            setImage(imageData);
            setIsEditing(false);
            if (onSave) {
                onSave(imageData);
            }
        }
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
    return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }, children: [!isEditing && (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }, children: [image ? (_jsx("img", { src: typeof image === 'string' ? image : URL.createObjectURL(image), alt: "Avatar", style: {
                            width: size,
                            height: size,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid #e0e0e0'
                        } })) : (_jsx("div", { style: {
                            width: size,
                            height: size,
                            borderRadius: '50%',
                            backgroundColor: '#007bff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: size * 0.4,
                            fontWeight: 'bold',
                            border: '2px solid #e0e0e0'
                        }, children: getInitials(name) })), _jsx("button", { onClick: handleEditClick, style: {
                            padding: '8px 16px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }, children: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C" })] })), isEditing && image && (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }, children: [_jsx(AvatarEditor, { ref: editorRef, image: image, width: size, height: size, border: 25, borderRadius: size / 2, color: [255, 255, 255, 0.6], scale: editorState.scale, rotate: editorState.rotate, position: editorState.position, onPositionChange: (position) => setEditorState(prev => ({ ...prev, position })) }), _jsxs("div", { style: { width: '100%', maxWidth: '300px' }, children: [_jsxs("div", { style: { marginBottom: '12px' }, children: [_jsxs("label", { style: { display: 'block', marginBottom: '4px', fontSize: '14px' }, children: ["\u041C\u0430\u0441\u0448\u0442\u0430\u0431: ", editorState.scale.toFixed(2)] }), _jsx("input", { type: "range", min: "1", max: "2", step: "0.01", value: editorState.scale, onChange: handleScaleChange, style: { width: '100%' } })] }), _jsxs("div", { style: { marginBottom: '16px' }, children: [_jsxs("label", { style: { display: 'block', marginBottom: '4px', fontSize: '14px' }, children: ["\u041F\u043E\u0432\u043E\u0440\u043E\u0442: ", editorState.rotate, "\u00B0"] }), _jsx("input", { type: "range", min: "0", max: "360", step: "1", value: editorState.rotate, onChange: handleRotateChange, style: { width: '100%' } })] })] }), _jsxs("div", { style: { display: 'flex', gap: '12px' }, children: [_jsx("button", { onClick: handleSave, style: {
                                    padding: '8px 16px',
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }, children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" }), _jsx("button", { onClick: handleCancel, style: {
                                    padding: '8px 16px',
                                    backgroundColor: '#6c757d',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }, children: "\u041E\u0442\u043C\u0435\u043D\u0430" })] })] })), _jsx("input", { type: "file", ref: fileInputRef, onChange: handleFileSelect, accept: "image/*", style: { display: 'none' } })] }));
};
//# sourceMappingURL=AvatarEditorBox.js.map