import React, { useRef, useState, useEffect, useCallback, useMemo, useImperativeHandle, } from 'react';
import { isPassiveSupported } from './utils/isPassiveSupported';
import { isFileAPISupported } from './utils/isFileAPISupported';
import { DeviceHelper, ImageHelper } from 'lotus-core/helpers';
import { CanvasHelper } from 'lotus-core/graphics';
// ============ ТИПЫ И ИНТЕРФЕЙСЫ ============
const defaultEmptyImage = {
    x: 0.5,
    y: 0.5,
};
const defaultProps = {
    scale: 1,
    rotate: 0,
    border: 25,
    borderRadius: 0,
    width: 200,
    height: 200,
    color: [0, 0, 0, 0.5],
    showGrid: false,
    gridColor: '#666',
    disableBoundaryChecks: false,
    disableHiDPIScaling: false,
    disableCanvasRotation: true,
    previewSize: 128,
};
// ============ ОСНОВНОЙ КОМПОНЕНТ ============
export const AvatarEditor = React.forwardRef((props, ref) => {
    // Объединяем props с значениями по умолчанию
    const { scale = defaultProps.scale, rotate = defaultProps.rotate, border = defaultProps.border, borderRadius = defaultProps.borderRadius, width = defaultProps.width, height = defaultProps.height, color = defaultProps.color, showGrid = defaultProps.showGrid, gridColor = defaultProps.gridColor, disableBoundaryChecks = defaultProps.disableBoundaryChecks, disableHiDPIScaling = defaultProps.disableHiDPIScaling, disableCanvasRotation = defaultProps.disableCanvasRotation, 
    // Кастомные пропсы, которые НЕ должны попасть в canvas
    sourceImage, position, crossOrigin, previewBorderRadius, previewSize = defaultProps.previewSize, removeBackground = false, backgroundRemovalThreshold = 0.1, onLoadFailure, onLoadSuccess, onImageReady, onImageChange, onMouseUp, onMouseMove, onPositionChange, backgroundColor, borderColor, 
    // Остальные пропсы, которые могут быть HTML атрибутами
    ...canvasProps } = props;
    const canvasRef = useRef(null);
    // Получаем пиксельное соотношение устройства
    const pixelRatio = useMemo(() => {
        if (disableHiDPIScaling || typeof window === 'undefined')
            return 1;
        return window.devicePixelRatio || 1;
    }, [disableHiDPIScaling]);
    // Управление состоянием изображения и перетаскивания
    const [imageState, setImageState] = useState(defaultEmptyImage);
    const [drag, setDrag] = useState(false);
    const [lastMousePosition, setLastMousePosition] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // Ref для отслеживания предыдущей позиции из пропсов, чтобы избежать бесконечных циклов
    const prevPositionRef = useRef(position);
    // Ref для отслеживания загруженного изображения, чтобы избежать повторных вызовов onImageReady
    const loadedImageRef = useRef(undefined);
    // Ref для отслеживания того, было ли уже вызвано onImageReady для текущего изображения
    const imageReadyCalledRef = useRef(false);
    // Ref для хранения стабильных ссылок на колбэки
    const onImageReadyRef = useRef(onImageReady);
    const onLoadSuccessRef = useRef(onLoadSuccess);
    const onLoadFailureRef = useRef(onLoadFailure);
    // Обновляем refs при изменении колбэков
    useEffect(() => {
        onImageReadyRef.current = onImageReady;
        onLoadSuccessRef.current = onLoadSuccess;
        onLoadFailureRef.current = onLoadFailure;
    }, [onImageReady, onLoadSuccess, onLoadFailure]);
    // ============ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ============
    /**
     * Получает элемент canvas
     */
    const getCanvas = useCallback(() => {
        if (!canvasRef.current) {
            throw new Error('No canvas found, please report this to: https://github.com/mosch/react-avatar-editor/issues');
        }
        return canvasRef.current;
    }, []);
    /**
     * Получает контекст рисования canvas
     */
    const getContext = useCallback(() => {
        const context = getCanvas().getContext('2d');
        if (!context) {
            throw new Error('No context found, please report this to: https://github.com/mosch/react-avatar-editor/issues');
        }
        return context;
    }, [getCanvas]);
    /**
     * Проверяет вертикальную ориентацию
     */
    const isVertical = useCallback(() => {
        return !disableCanvasRotation && rotate % 180 !== 0;
    }, [disableCanvasRotation, rotate]);
    /**
     * Получает границы как массив [x, y]
     */
    const getBorders = useCallback((borderValue = border) => {
        return Array.isArray(borderValue) ? borderValue : [borderValue, borderValue];
    }, [border]);
    /**
     * Вычисляет размеры canvas
     */
    const getDimensions = useMemo(() => {
        const canvas = { width: 0, height: 0 };
        const [borderX, borderY] = getBorders();
        if (isVertical()) {
            canvas.width = height;
            canvas.height = width;
        }
        else {
            canvas.width = width;
            canvas.height = height;
        }
        canvas.width += borderX * 2;
        canvas.height += borderY * 2;
        return {
            canvas,
            rotate,
            width,
            height,
            border,
        };
    }, [width, height, rotate, border, getBorders, isVertical]);
    /**
     * Вычисляет масштаб по X
     */
    const getXScale = useCallback(() => {
        if (!imageState.width || !imageState.height) {
            return 1;
        }
        const canvasAspect = width / height;
        const imageAspect = imageState.width / imageState.height;
        return Math.min(1, canvasAspect / imageAspect);
    }, [width, height, imageState.width, imageState.height]);
    /**
     * Вычисляет масштаб по Y
     */
    const getYScale = useCallback(() => {
        if (!imageState.width || !imageState.height) {
            return 1;
        }
        const canvasAspect = height / width;
        const imageAspect = imageState.height / imageState.width;
        return Math.min(1, canvasAspect / imageAspect);
    }, [width, height, imageState.width, imageState.height]);
    /**
     * Получает область обрезки
     */
    const getCroppingRect = useCallback(() => {
        const currentPosition = position || {
            x: imageState.x,
            y: imageState.y,
        };
        const widthScale = getXScale();
        const heightScale = getYScale();
        const width = (1 / scale) * widthScale;
        const height = (1 / scale) * heightScale;
        const croppingRect = {
            x: currentPosition.x - width / 2,
            y: currentPosition.y - height / 2,
            width,
            height,
        };
        let xMin;
        let xMax;
        let yMin;
        let yMax;
        // Если область обрезки больше изображения
        const isLargerThanImage = disableBoundaryChecks || width > 1 || height > 1;
        if (isLargerThanImage) {
            // Если область обрезки больше изображения, можно перемещать в любую сторону
            xMin = -croppingRect.width;
            xMax = 1;
            yMin = -croppingRect.height;
            yMax = 1;
        }
        else {
            // Если область обрезки меньше изображения, ограничиваем так, чтобы края не выходили за [0, 1]
            xMin = 0;
            xMax = 1 - croppingRect.width;
            yMin = 0;
            yMax = 1 - croppingRect.height;
        }
        return {
            ...croppingRect,
            x: Math.max(xMin, Math.min(croppingRect.x, xMax)),
            y: Math.max(yMin, Math.min(croppingRect.y, yMax)),
        };
    }, [position, imageState, scale, disableBoundaryChecks, getXScale, getYScale]);
    /**
     * Вычисляет позицию изображения
     */
    const calculatePosition = useCallback((borderValue) => {
        const [borderX, borderY] = getBorders(borderValue);
        if (!imageState.width || !imageState.height) {
            return { x: 0, y: 0, width: 0, height: 0 };
        }
        const croppingRect = getCroppingRect();
        const imgWidth = imageState.width * scale;
        const imgHeight = imageState.height * scale;
        let x = -croppingRect.x * imgWidth;
        let y = -croppingRect.y * imgHeight;
        if (isVertical()) {
            x += borderY;
            y += borderX;
        }
        else {
            x += borderX;
            y += borderY;
        }
        return { x, y, height: imgHeight, width: imgWidth };
    }, [imageState, scale, getBorders, getCroppingRect, isVertical]);
    /**
     * Получает начальный размер изображения
     */
    const getInitialSize = useCallback((imgWidth, imgHeight) => {
        let newHeight;
        let newWidth;
        const canvasRatio = getDimensions.height / getDimensions.width;
        const imageRatio = imgHeight / imgWidth;
        if (canvasRatio > imageRatio) {
            newHeight = getDimensions.height;
            newWidth = Math.round(imgWidth * (newHeight / imgHeight));
        }
        else {
            newWidth = getDimensions.width;
            newHeight = Math.round(imgHeight * (newWidth / imgWidth));
        }
        return {
            height: newHeight,
            width: newWidth,
        };
    }, [getDimensions]);
    // ============ ОБРАБОТКА ИЗОБРАЖЕНИЙ ============
    /**
     * Загружает изображение
     */
    const loadImage = useCallback(async (file) => {
        // Проверяем, не загружаем ли мы то же изображение
        const isSameImage = loadedImageRef.current === file ||
            (file instanceof File && loadedImageRef.current instanceof File &&
                file.name === loadedImageRef.current.name &&
                file.size === loadedImageRef.current.size &&
                file.lastModified === loadedImageRef.current.lastModified);
        if (isSameImage && imageState.resource && imageReadyCalledRef.current) {
            return; // Изображение уже загружено и onImageReady уже вызван
        }
        if (isLoading)
            return;
        setIsLoading(true);
        loadedImageRef.current = file;
        imageReadyCalledRef.current = false; // Сбрасываем флаг при загрузке нового изображения
        try {
            let loadedImage;
            if (isFileAPISupported && file instanceof File) {
                loadedImage = await ImageHelper.loadImageFile(file);
            }
            else if (typeof file === 'string') {
                loadedImage = await ImageHelper.loadImageURL(file, crossOrigin);
            }
            else {
                throw new Error('Unsupported image type');
            }
            // Применяем удаление фона, если включено
            let processedImage = loadedImage;
            // if (removeBackground) {
            //   const canvasWithoutBackground = removeImageBackground(loadedImage, backgroundRemovalThreshold);
            //   // Создаем новое изображение из canvas
            //   processedImage = new Image();
            //   processedImage.src = canvasWithoutBackground.toDataURL('image/png');
            //   await new Promise<void>((resolve, reject) => {
            //     processedImage.onload = () => resolve();
            //     processedImage.onerror = reject;
            //   });
            // }
            const initialSize = getInitialSize(processedImage.width, processedImage.height);
            const newImageState = {
                ...initialSize,
                resource: processedImage,
                x: position?.x ?? 0.5,
                y: position?.y ?? 0.5,
            };
            setImageState(newImageState);
            setIsLoading(false);
            // Вызываем колбэки только один раз при загрузке, используя refs для стабильности
            if (!imageReadyCalledRef.current) {
                imageReadyCalledRef.current = true;
                onImageReadyRef.current?.();
                onLoadSuccessRef.current?.(newImageState);
            }
        }
        catch (error) {
            setIsLoading(false);
            loadedImageRef.current = undefined;
            imageReadyCalledRef.current = false;
            console.error('Failed to load image:', error);
            onLoadFailureRef.current?.();
        }
    }, [isLoading, crossOrigin, getInitialSize, position, imageState.resource, removeBackground, backgroundRemovalThreshold]);
    // ============ ОТРИСОВКА ============
    /**
     * Рисует изображение на canvas
     */
    const paintImage = useCallback((context, imageState, borderValue, scaleFactor = pixelRatio) => {
        if (!imageState.resource)
            return;
        const position = calculatePosition(borderValue);
        context.save();
        context.translate(context.canvas.width / 2, context.canvas.height / 2);
        context.rotate((rotate * Math.PI) / 180);
        context.translate(-(context.canvas.width / 2), -(context.canvas.height / 2));
        if (isVertical()) {
            context.translate((context.canvas.width - context.canvas.height) / 2, (context.canvas.height - context.canvas.width) / 2);
        }
        context.scale(scaleFactor, scaleFactor);
        context.globalCompositeOperation = 'destination-over';
        context.drawImage(imageState.resource, position.x, position.y, position.width, position.height);
        if (backgroundColor) {
            context.fillStyle = backgroundColor;
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        }
        context.restore();
    }, [calculatePosition, rotate, isVertical, pixelRatio, backgroundColor]);
    /**
     * Рисует маску и сетку на canvas
     */
    const paint = useCallback((context) => {
        context.save();
        context.scale(pixelRatio, pixelRatio);
        context.translate(0, 0);
        context.fillStyle = `rgba(${color.slice(0, 4).join(',')})`;
        let currentBorderRadius = borderRadius;
        const [borderSizeX, borderSizeY] = getBorders(border);
        const canvasHeight = getDimensions.canvas.height;
        const canvasWidth = getDimensions.canvas.width;
        // Ограничиваем радиус скругления
        currentBorderRadius = Math.max(currentBorderRadius, 0);
        currentBorderRadius = Math.min(currentBorderRadius, canvasWidth / 2 - borderSizeX, canvasHeight / 2 - borderSizeY);
        CanvasHelper.drawRoundedRect(context, borderSizeX, borderSizeY, canvasWidth - borderSizeX * 2, canvasHeight - borderSizeY * 2, currentBorderRadius);
        context.rect(canvasWidth, 0, -canvasWidth, canvasHeight);
        context.fill('evenodd');
        // Рисуем границу если задан цвет
        if (borderColor) {
            context.strokeStyle = `rgba(${borderColor.slice(0, 4).join(',')})`;
            context.lineWidth = 1;
            CanvasHelper.drawRoundedRect(context, borderSizeX + 0.5, borderSizeY + 0.5, canvasWidth - borderSizeX * 2 - 1, canvasHeight - borderSizeY * 2 - 1, currentBorderRadius);
            context.stroke();
        }
        // Рисуем сетку если нужно
        if (showGrid) {
            CanvasHelper.drawGrid(context, borderSizeX, borderSizeY, canvasWidth - borderSizeX * 2, canvasHeight - borderSizeY * 2, 3, 1, gridColor);
        }
        context.restore();
    }, [
        pixelRatio,
        color,
        borderRadius,
        border,
        getBorders,
        getDimensions,
        borderColor,
        showGrid,
        gridColor,
    ]);
    /**
     * Перерисовывает canvas
     */
    const redraw = useCallback(() => {
        const context = getContext();
        const canvas = getCanvas();
        context.clearRect(0, 0, canvas.width, canvas.height);
        paint(context);
        paintImage(context, imageState, border);
        onImageChange?.();
    }, [getContext, getCanvas, paint, paintImage, imageState, border, onImageChange]);
    // ============ ОБРАБОТЧИКИ СОБЫТИЙ ============
    /**
     * Получает координаты мыши/тача относительно canvas в логических единицах (без pixelRatio)
     */
    const getCanvasCoordinates = useCallback((clientX, clientY) => {
        const canvas = getCanvas();
        const rect = canvas.getBoundingClientRect();
        // Используем логические размеры canvas (без pixelRatio)
        const logicalWidth = getDimensions.canvas.width;
        const logicalHeight = getDimensions.canvas.height;
        const scaleX = logicalWidth / rect.width;
        const scaleY = logicalHeight / rect.height;
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY,
        };
    }, [getCanvas, getDimensions]);
    /**
     * Обработчик нажатия мыши
     */
    const handleMouseDown = useCallback((e) => {
        e.preventDefault();
        const coords = getCanvasCoordinates(e.clientX, e.clientY);
        setDrag(true);
        setLastMousePosition(coords);
    }, [getCanvasCoordinates]);
    /**
     * Обработчик начала касания
     */
    const handleTouchStart = useCallback((e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const coords = getCanvasCoordinates(touch.clientX, touch.clientY);
        setDrag(true);
        setLastMousePosition(coords);
    }, [getCanvasCoordinates]);
    /**
     * Обработчик движения мыши/тача
     */
    const handleMouseMove = useCallback((e) => {
        if (!drag || !lastMousePosition)
            return;
        e.preventDefault();
        const clientX = 'targetTouches' in e ? e.targetTouches[0].clientX : e.clientX;
        const clientY = 'targetTouches' in e ? e.targetTouches[0].clientY : e.clientY;
        const currentCoords = getCanvasCoordinates(clientX, clientY);
        if (!imageState.width || !imageState.height || !imageState.resource) {
            return;
        }
        // Вычисляем дельту движения мыши (старая позиция - новая, как в оригинале)
        const deltaX = lastMousePosition.x - currentCoords.x;
        const deltaY = lastMousePosition.y - currentCoords.y;
        // Размеры изображения в логических единицах canvas с учетом масштаба
        const imgWidth = imageState.width * scale;
        const imgHeight = imageState.height * scale;
        let currentRotate = rotate;
        currentRotate %= 360;
        currentRotate = currentRotate < 0 ? currentRotate + 360 : currentRotate;
        // Получаем текущую позицию (используем position из пропсов или состояние)
        const currentPosition = position || {
            x: imageState.x,
            y: imageState.y,
        };
        // Вычисляем размеры области обрезки
        const widthScale = getXScale();
        const heightScale = getYScale();
        const relativeWidth = (1 / scale) * widthScale;
        const relativeHeight = (1 / scale) * heightScale;
        // Позиция центра обрезки в пикселях изображения (в логических единицах canvas)
        // croppingRect.x = currentPosition.x - relativeWidth / 2
        const croppingRectX = currentPosition.x - relativeWidth / 2;
        const croppingRectY = currentPosition.y - relativeHeight / 2;
        let lastX = croppingRectX * imgWidth;
        let lastY = croppingRectY * imgHeight;
        // Преобразуем дельту с учетом поворота (как в оригинале)
        const toRadians = (degree) => degree * (Math.PI / 180);
        const cos = Math.cos(toRadians(currentRotate));
        const sin = Math.sin(toRadians(currentRotate));
        // Применяем поворот к дельте движения мыши
        // Формула из оригинала: x = lastX + mx * cos + my * sin
        const rotatedX = lastX + deltaX * cos + deltaY * sin;
        const rotatedY = lastY + -deltaX * sin + deltaY * cos;
        // Преобразуем обратно в относительные координаты (0-1)
        // Вычисляем новую позицию центра обрезки
        const newPosition = {
            x: rotatedX / imgWidth + relativeWidth / 2,
            y: rotatedY / imgHeight + relativeHeight / 2,
        };
        // Ограничиваем позицию границами
        // Позиция - это центр области обрезки, поэтому границы должны учитывать размер области
        let xMin;
        let xMax;
        let yMin;
        let yMax;
        const isLargerThanImage = disableBoundaryChecks || relativeWidth > 1 || relativeHeight > 1;
        if (isLargerThanImage) {
            // Если область обрезки больше изображения, можно перемещать в любую сторону
            xMin = -relativeWidth;
            xMax = 1 + relativeWidth;
            yMin = -relativeHeight;
            yMax = 1 + relativeHeight;
        }
        else {
            // Если область обрезки меньше изображения, ограничиваем так, чтобы края не выходили за [0, 1]
            // Центр должен быть в диапазоне [relativeWidth/2, 1 - relativeWidth/2]
            xMin = relativeWidth / 2;
            xMax = 1 - relativeWidth / 2;
            yMin = relativeHeight / 2;
            yMax = 1 - relativeHeight / 2;
        }
        const clampedPosition = {
            x: Math.max(xMin, Math.min(newPosition.x, xMax)),
            y: Math.max(yMin, Math.min(newPosition.y, yMax)),
        };
        setImageState(prev => ({ ...prev, ...clampedPosition }));
        setLastMousePosition(currentCoords);
        onPositionChange?.(clampedPosition);
        onMouseMove?.(e);
    }, [
        drag,
        lastMousePosition,
        imageState,
        scale,
        rotate,
        position,
        pixelRatio,
        getCanvasCoordinates,
        getCroppingRect,
        getXScale,
        getYScale,
        disableBoundaryChecks,
        onPositionChange,
        onMouseMove,
    ]);
    const handleMouseUp = useCallback(() => {
        setDrag(false);
        setLastMousePosition(null);
        onMouseUp?.();
    }, [onMouseUp]);
    // ============ ЭФФЕКТЫ ============
    // Инициализация canvas
    useEffect(() => {
        const context = getContext();
        paint(context);
    }, [getContext, paint]);
    // Загрузка изображения при изменении sourceImage
    useEffect(() => {
        if (sourceImage) {
            // Загружаем только если это новое изображение
            // Для File сравниваем по имени и размеру, для string - по значению
            const isSameImage = loadedImageRef.current === sourceImage ||
                (sourceImage instanceof File && loadedImageRef.current instanceof File &&
                    sourceImage.name === loadedImageRef.current.name &&
                    sourceImage.size === loadedImageRef.current.size &&
                    sourceImage.lastModified === loadedImageRef.current.lastModified);
            if (!isSameImage || !imageState.resource) {
                loadImage(sourceImage);
            }
        }
        else {
            // Очищаем изображение
            setImageState(defaultEmptyImage);
            loadedImageRef.current = undefined;
            imageReadyCalledRef.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sourceImage]); // Убираем loadImage из зависимостей, используем только sourceImage
    // Очистка canvas при удалении изображения
    useEffect(() => {
        if (!imageState.resource && !sourceImage) {
            const context = getContext();
            const canvas = getCanvas();
            context.clearRect(0, 0, canvas.width, canvas.height);
            paint(context);
        }
    }, [imageState.resource, sourceImage, getContext, getCanvas, paint]);
    // Обработка событий перетаскивания
    useEffect(() => {
        if (!drag)
            return;
        const options = isPassiveSupported() ? { passive: false } : false;
        document.addEventListener('mousemove', handleMouseMove, options);
        document.addEventListener('mouseup', handleMouseUp, options);
        if (DeviceHelper.isTouchDevice()) {
            document.addEventListener('touchmove', handleMouseMove, options);
            document.addEventListener('touchend', handleMouseUp, options);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove, false);
            document.removeEventListener('mouseup', handleMouseUp, false);
            if (DeviceHelper.isTouchDevice()) {
                document.removeEventListener('touchmove', handleMouseMove, false);
                document.removeEventListener('touchend', handleMouseUp, false);
            }
        };
    }, [drag, handleMouseMove, handleMouseUp]);
    // Синхронизация позиции из пропсов с состоянием и корректировка при изменении масштаба
    useEffect(() => {
        if (!imageState.resource || !imageState.width || !imageState.height) {
            return;
        }
        // Если позиция передается из пропсов и изменилась, синхронизируем её
        if (position !== undefined) {
            const prevPos = prevPositionRef.current;
            // Проверяем, изменилась ли позиция из пропсов (сравниваем с предыдущим значением)
            if (!prevPos ||
                Math.abs(position.x - prevPos.x) > 0.001 ||
                Math.abs(position.y - prevPos.y) > 0.001) {
                // Позиция из пропсов изменилась, обновляем состояние только если оно отличается
                setImageState(prev => {
                    if (Math.abs(position.x - prev.x) > 0.001 ||
                        Math.abs(position.y - prev.y) > 0.001) {
                        return { ...prev, x: position.x, y: position.y };
                    }
                    return prev;
                });
                prevPositionRef.current = position;
                return;
            }
        }
        else {
            prevPositionRef.current = undefined;
        }
        // Проверяем и корректируем позицию при изменении масштаба (только если позиция не задана из пропсов)
        if (position === undefined) {
            const currentPosition = {
                x: imageState.x,
                y: imageState.y,
            };
            const widthScale = getXScale();
            const heightScale = getYScale();
            const relativeWidth = (1 / scale) * widthScale;
            const relativeHeight = (1 / scale) * heightScale;
            let xMin = 0;
            let xMax = 1 - relativeWidth;
            let yMin = 0;
            let yMax = 1 - relativeHeight;
            const isLargerThanImage = disableBoundaryChecks || relativeWidth > 1 || relativeHeight > 1;
            if (isLargerThanImage) {
                xMin = -relativeWidth;
                xMax = 1;
                yMin = -relativeHeight;
                yMax = 1;
            }
            // Если позиция выходит за границы, корректируем её
            const clampedX = Math.max(xMin, Math.min(currentPosition.x, xMax));
            const clampedY = Math.max(yMin, Math.min(currentPosition.y, yMax));
            if (Math.abs(clampedX - currentPosition.x) > 0.001 ||
                Math.abs(clampedY - currentPosition.y) > 0.001) {
                setImageState(prev => ({ ...prev, x: clampedX, y: clampedY }));
                onPositionChange?.({ x: clampedX, y: clampedY });
            }
        }
    }, [scale, position, imageState.resource, imageState.width, imageState.height, getXScale, getYScale, disableBoundaryChecks, onPositionChange]);
    // Перерисовка при изменении параметров
    useEffect(() => {
        if (imageState.resource) {
            redraw();
        }
    }, [
        width,
        height,
        position,
        scale,
        rotate,
        borderRadius,
        backgroundColor,
        imageState.x,
        imageState.y,
        imageState.resource,
        redraw,
    ]);
    // ============ useImperativeHandle ============
    useImperativeHandle(ref, () => ({
        getImage: () => {
            const cropRect = getCroppingRect();
            if (!imageState.resource) {
                throw new Error('No image resource available');
            }
            const cropX = cropRect.x * imageState.resource.width;
            const cropY = cropRect.y * imageState.resource.height;
            const cropWidth = cropRect.width * imageState.resource.width;
            const cropHeight = cropRect.height * imageState.resource.height;
            const canvas = document.createElement('canvas');
            if (isVertical()) {
                canvas.width = cropHeight;
                canvas.height = cropWidth;
            }
            else {
                canvas.width = cropWidth;
                canvas.height = cropHeight;
            }
            const context = canvas.getContext('2d');
            if (!context) {
                throw new Error('No context found');
            }
            context.translate(canvas.width / 2, canvas.height / 2);
            context.rotate((rotate * Math.PI) / 180);
            context.translate(-(canvas.width / 2), -(canvas.height / 2));
            if (isVertical()) {
                context.translate((canvas.width - canvas.height) / 2, (canvas.height - canvas.width) / 2);
            }
            if (backgroundColor) {
                context.fillStyle = backgroundColor;
                context.fillRect(0, 0, canvas.width, canvas.height);
            }
            context.drawImage(imageState.resource, -cropX, -cropY);
            // Скругление не применяется здесь, только в getImageScaledToCanvas для превью
            return canvas;
        },
        getImageScaledToCanvas: () => {
            // Используем размер превью из пропсов
            const canvas = document.createElement('canvas');
            canvas.width = previewSize;
            canvas.height = previewSize;
            const ctx = canvas.getContext('2d', { alpha: true });
            if (!ctx) {
                return canvas;
            }
            // Очищаем canvas с прозрачным фоном для превью
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Рисуем изображение без фона (для превью фон не нужен)
            if (imageState.resource) {
                const { width, height } = getDimensions;
                const sourceWidth = isVertical() ? height : width;
                const sourceHeight = isVertical() ? width : height;
                // Масштабируем изображение для превью
                const scale = Math.min(previewSize / sourceWidth, previewSize / sourceHeight);
                const scaledWidth = sourceWidth * scale;
                const scaledHeight = sourceHeight * scale;
                const offsetX = (previewSize - scaledWidth) / 2;
                const offsetY = (previewSize - scaledHeight) / 2;
                const imgPosition = calculatePosition(0);
                ctx.save();
                ctx.translate(previewSize / 2, previewSize / 2);
                ctx.rotate((rotate * Math.PI) / 180);
                ctx.translate(-(previewSize / 2), -(previewSize / 2));
                if (isVertical()) {
                    ctx.translate((previewSize - previewSize) / 2, (previewSize - previewSize) / 2);
                }
                // Масштабируем и позиционируем изображение
                ctx.translate(offsetX, offsetY);
                ctx.scale(scale, scale);
                ctx.drawImage(imageState.resource, imgPosition.x, imgPosition.y, imgPosition.width, imgPosition.height);
                ctx.restore();
            }
            // Всегда применяем обработку для превью (скругление и рамка)
            // Используем previewBorderRadius если задан, иначе borderRadius
            const radiusToUse = previewBorderRadius !== undefined ? previewBorderRadius : borderRadius;
            // Масштабируем радиус скругления относительно размера превью
            // Радиус в пропсах - это значение в пикселях для основного редактора
            // Нужно масштабировать его для превью 128x128
            const { width, height } = getDimensions;
            const sourceSize = Math.max(width, height);
            const scaleFactor = previewSize / sourceSize;
            // Вычисляем радиус скругления для превью
            // Ограничиваем максимальным значением (половина размера)
            const canvasBorderRadius = radiusToUse > 0
                ? Math.min(Math.max(radiusToUse, 0), previewSize / 2)
                : 0;
            // Применяем скругление к изображению (без рамки, рамка через CSS)
            return CanvasHelper.clipCanvasRounded(canvas, canvasBorderRadius);
        },
        getCroppingRect: () => getCroppingRect(),
    }), [imageState, getCroppingRect, isVertical, rotate, backgroundColor, borderRadius, previewBorderRadius, previewSize, backgroundRemovalThreshold, getInitialSize, getDimensions, paintImage, calculatePosition, getXScale, getYScale, onImageChange]);
    // ============ RENDER ============
    const defaultStyle = {
        width: getDimensions.canvas.width,
        height: getDimensions.canvas.height,
        cursor: drag ? 'grabbing' : 'grab',
        touchAction: 'none',
    };
    const attributes = {
        width: getDimensions.canvas.width * pixelRatio,
        height: getDimensions.canvas.height * pixelRatio,
        onMouseDown: handleMouseDown,
        onTouchStart: handleTouchStart,
        style: { ...defaultStyle, ...canvasProps.style },
        ref: canvasRef,
        ...canvasProps,
    };
    return React.createElement('canvas', attributes);
});
AvatarEditor.displayName = 'AvatarEditor';
//# sourceMappingURL=AvatarEditor.js.map