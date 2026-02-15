import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, useCallback } from 'react';
import './AvatarEditorBox.css';
import { AvatarEditor } from '#external/react-avatar-editor';
export function AvatarEditorBox() {
    // Состояния для компонента
    const [image, setImage] = useState(undefined);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
    const [rotate, setRotate] = useState(0);
    const [borderRadius, setBorderRadius] = useState(0);
    const [showGrid, setShowGrid] = useState(false);
    // Ref для получения изображения
    const editorRef = useRef(null);
    const fileInputRef = useRef(null);
    // Обработчики событий
    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
        }
        // Сбрасываем значение input
        event.target.value = '';
    };
    const handleImageUrl = () => {
        const url = prompt('Введите URL изображения:');
        if (url) {
            setImage(url);
        }
    };
    const handleScaleChange = (event) => {
        setScale(parseFloat(event.target.value));
    };
    const handleRotateLeft = () => {
        setRotate(prev => prev - 90);
    };
    const handleRotateRight = () => {
        setRotate(prev => prev + 90);
    };
    const handleBorderRadiusChange = (event) => {
        setBorderRadius(parseInt(event.target.value));
    };
    const handleSaveImage = () => {
        if (editorRef.current && 'getImageScaledToCanvas' in editorRef.current) {
            // Используем метод для сохранения превью размером 128x128
            const canvas = editorRef.current.getImageScaledToCanvas();
            // Создаем ссылку для скачивания
            const link = document.createElement('a');
            link.download = 'avatar.png';
            // Используем PNG для поддержки прозрачности
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };
    const handleGetImageScaledToCanvas = useCallback(() => {
        if (editorRef.current && 'getImageScaledToCanvas' in editorRef.current) {
            const canvas = (editorRef.current).getImageScaledToCanvas();
            // Показываем превью
            const preview = document.getElementById('preview');
            if (preview) {
                preview.innerHTML = '';
                preview.appendChild(canvas);
            }
        }
    }, []);
    // Обработчики событий AvatarEditor
    const handleLoadSuccess = (imageState) => {
        console.log('Изображение успешно загружено:', imageState);
    };
    const handleLoadFailure = () => {
        alert('Не удалось загрузить изображение');
    };
    const handleImageReady = () => {
        console.log('Изображение готово к редактированию');
    };
    const handlePositionChange = (newPosition) => {
        setPosition(newPosition);
        console.log('Позиция изменена:', newPosition);
    };
    // Автоматическое обновление превью при изменении параметров
    // Превью обновляется всегда, даже если изображение не загружено (чтобы показать рамку)
    useEffect(() => {
        if (editorRef.current) {
            handleGetImageScaledToCanvas();
        }
    }, [image, scale, rotate, position, borderRadius, handleGetImageScaledToCanvas]);
    const handleClearImage = () => {
        setImage(undefined);
        setScale(1);
        setPosition({ x: 0.5, y: 0.5 });
        setRotate(0);
        setBorderRadius(0);
        // Очищаем превью
        const preview = document.getElementById('preview');
        if (preview) {
            preview.innerHTML = '';
        }
    };
    const handleResetAll = () => {
        // Сбрасываем все параметры редактирования
        setScale(1);
        setRotate(0);
        setBorderRadius(0);
        // Сбрасываем позицию с новым объектом для гарантии обновления
        setPosition({ x: 0.5, y: 0.5 });
    };
    return (_jsxs("div", { className: "app", children: [_jsx("header", { className: "app-header", children: _jsx("h1", { children: "\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u0430\u0432\u0430\u0442\u0430\u0440\u0430" }) }), _jsxs("div", { className: "app-container", children: [_jsxs("div", { className: "control-panel", children: [_jsx("h2", { children: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435" }), _jsxs("div", { className: "control-group", children: [_jsx("h3", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F" }), _jsx("input", { ref: fileInputRef, accept: "image/*", style: { display: 'none' }, type: "file", onChange: handleImageUpload }), _jsxs("div", { className: "button-group", children: [_jsx("button", { className: "btn btn-primary", onClick: () => fileInputRef.current?.click(), children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u0430\u0439\u043B" }), _jsx("button", { className: "btn btn-secondary", onClick: handleImageUrl, children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043F\u043E URL" }), _jsx("button", { className: "btn btn-danger", onClick: handleClearImage, children: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C" })] })] }), _jsxs("div", { className: "control-group", children: [_jsxs("h3", { children: ["\u041C\u0430\u0441\u0448\u0442\u0430\u0431: ", scale.toFixed(2)] }), _jsx("input", { className: "slider", max: "10", min: "0.2", step: "0.1", type: "range", value: scale, onChange: handleScaleChange })] }), _jsxs("div", { className: "control-group", children: [_jsx("h3", { children: "\u041F\u043E\u0432\u043E\u0440\u043E\u0442" }), _jsxs("div", { className: "button-group", children: [_jsx("button", { className: "btn btn-secondary", onClick: handleRotateLeft, children: "\u21B6 90\u00B0" }), _jsx("button", { className: "btn btn-secondary", onClick: handleRotateRight, children: "\u21B7 90\u00B0" }), _jsx("button", { className: "btn btn-danger", onClick: handleResetAll, children: "\u0421\u0431\u0440\u043E\u0441" })] }), _jsxs("div", { className: "rotate-display", children: ["\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0443\u0433\u043E\u043B: ", rotate, "\u00B0"] })] }), _jsxs("div", { className: "control-group", children: [_jsxs("h3", { children: ["\u0421\u043A\u0440\u0443\u0433\u043B\u0435\u043D\u0438\u0435: ", borderRadius, "px"] }), _jsx("input", { className: "slider", max: "100", min: "0", type: "range", value: borderRadius, onChange: handleBorderRadiusChange })] }), _jsxs("div", { className: "control-group", children: [_jsx("h3", { children: "\u0421\u0435\u0442\u043A\u0430" }), _jsxs("label", { className: "checkbox-label", children: [_jsx("input", { checked: showGrid, type: "checkbox", onChange: (e) => setShowGrid(e.target.checked) }), "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0441\u0435\u0442\u043A\u0443"] })] }), _jsxs("div", { className: "control-group", children: [_jsx("h3", { children: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F" }), _jsxs("div", { className: "button-group", children: [_jsx("button", { className: "btn btn-success", onClick: handleSaveImage, children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0430\u0432\u0430\u0442\u0430\u0440" }), _jsx("button", { className: "btn btn-info", onClick: handleGetImageScaledToCanvas, children: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u0440\u0435\u0432\u044C\u044E" })] })] })] }), _jsxs("div", { className: "editor-container", children: [_jsxs("div", { className: "editor-wrapper", children: [_jsx(AvatarEditor, { ref: editorRef, backgroundColor: "#f0f0f0", border: 50, borderColor: [255, 255, 255, 0.8], borderRadius: 0, previewBorderRadius: borderRadius, removeBackground: true, previewSize: 128, color: [0, 0, 0, 0.6], gridColor: "rgba(255, 255, 255, 0.5)", height: 400, position: position, rotate: rotate, scale: scale, showGrid: showGrid, sourceImage: image, style: {
                                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                            borderRadius: '8px'
                                        }, width: 400, onImageReady: handleImageReady, onLoadFailure: handleLoadFailure, onLoadSuccess: handleLoadSuccess, onPositionChange: handlePositionChange }), !image && (_jsx("div", { className: "empty-state", children: _jsx("p", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F" }) }))] }), _jsxs("div", { className: "preview-section", children: [_jsx("h3", { children: "\u041F\u0440\u0435\u0432\u044C\u044E" }), _jsx("div", { className: "preview-container", id: "preview", style: {
                                            border: '2px dashed #999',
                                            borderRadius: `${borderRadius}px`
                                        } })] })] }), _jsxs("div", { className: "info-panel", children: [_jsx("h2", { children: "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F" }), _jsxs("div", { className: "info-group", children: [_jsx("h3", { children: "\u0422\u0435\u043A\u0443\u0449\u0438\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B:" }), _jsxs("ul", { children: [_jsxs("li", { children: ["\u041C\u0430\u0441\u0448\u0442\u0430\u0431: ", scale.toFixed(2)] }), _jsxs("li", { children: ["\u041F\u043E\u0432\u043E\u0440\u043E\u0442: ", rotate, "\u00B0"] }), _jsxs("li", { children: ["\u0421\u043A\u0440\u0443\u0433\u043B\u0435\u043D\u0438\u0435: ", borderRadius, "px"] }), _jsxs("li", { children: ["\u041F\u043E\u0437\u0438\u0446\u0438\u044F X: ", position.x.toFixed(2)] }), _jsxs("li", { children: ["\u041F\u043E\u0437\u0438\u0446\u0438\u044F Y: ", position.y.toFixed(2)] }), _jsxs("li", { children: ["\u0421\u0435\u0442\u043A\u0430: ", showGrid ? 'Включена' : 'Выключена'] })] })] }), _jsxs("div", { className: "info-group", children: [_jsx("h3", { children: "\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0438:" }), _jsxs("ul", { children: [_jsx("li", { children: "\u0417\u0430\u0445\u0432\u0430\u0442\u0438\u0442\u0435 \u0438 \u043F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043F\u043E\u0437\u0438\u0446\u0438\u0438" }), _jsx("li", { children: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0441\u043B\u0430\u0439\u0434\u0435\u0440 \u0434\u043B\u044F \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0430" }), _jsx("li", { children: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \u043F\u043E\u0432\u043E\u0440\u043E\u0442\u0430 \u0434\u043B\u044F \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0443\u0433\u043B\u0430" }), _jsx("li", { children: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u0441\u0435\u0442\u043A\u0443 \u0434\u043B\u044F \u043F\u043E\u043C\u043E\u0449\u0438 \u0432 \u043A\u043E\u043C\u043F\u043E\u0437\u0438\u0446\u0438\u0438" })] })] })] })] })] }));
}
//# sourceMappingURL=AvatarEditorBox.js.map