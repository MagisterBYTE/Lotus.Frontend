import { Button, Checkbox } from '@mantine/core';
import { CanvasHelper } from 'lotus-core/graphics';
import { ImageHelper } from 'lotus-core/helpers';
import { LocalizationCore } from 'lotus-core/localization';
import { IPoint } from 'lotus-core/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Slider } from '#components/Controls';
import { HorizontalStack, IHorizontalStackProps, IVerticalStackProps, VerticalStack } from '#components/Layout';
import { TCssHeight, TCssWidth, TSizeType } from '#types';

interface IBaseImageEditorProps
{
  /**
   * Размер элемента
   */
  size?: TSizeType;

  /**
   * Источник изображения
   */
  sourceImage?: File | string;

  /**
   * Настройки CORS запросов для данных получаемых элементом
   */
  crossOrigin?: '' | 'anonymous' | 'use-credentials';

  /**
   * Максимальная ширина Canvas (по умолчанию 350 px)
   */
  maxCanvasWidth?: TCssWidth;

  /**
   * Максимальная высота Canvas (по умолчанию 350 px)
   */
  maxCanvasHeight?: TCssHeight;

  /**
   * Обработчик сохранения
   * @param blob
   * @returns
   */
  onSavePreview: (blob: Blob) => void;
}

interface IVerticalImageEditorProps extends IBaseImageEditorProps, IVerticalStackProps
{
  orientation: 'vertical';
}

interface IHorizontalImageEditorProps extends IBaseImageEditorProps, IHorizontalStackProps
{
  orientation: 'horizontal';
}

export type IImageEditorProps = IVerticalImageEditorProps | IHorizontalImageEditorProps;

/**
 * Компонент редактор изображения
 * @param props 
 * @returns 
 */
export function ImageEditor(props: IImageEditorProps)
{
  const { size, orientation, crossOrigin, sourceImage, maxCanvasWidth = '350px', maxCanvasHeight = '350px', onSavePreview, ...stackProps } = props;

  const [image, setImage] = useState<string | File | undefined>(sourceImage);
  const [rawImage, setRawImage] = useState<HTMLImageElement | undefined>();
  const [rotate, setRotate] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [borderRadius, setBorderRadius] = useState<number>(120);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isBoundsClip, setBoundsClip] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  // Для перетаскивания
  const [offset, setOffset] = useState<IPoint>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState<IPoint>({ x: 0, y: 0 });

  // Для превью
  const previewSize = 128;
  const [previewRadius, setPreviewRadius] = useState(false);
  const [previewTransparent, setPreviewTransparent] = useState(true);
  const [previewTransparentThreshold, setPreviewTransparentThreshold] = useState(0.1);
  const [previewSmooth, setPreviewSmooth] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const padding: TSizeType = 'xxs';
  const margin: TSizeType = 'xxs';

  // #region Actions
  // 1. Загрузка изображения с очисткой памяти
  const loadImageAsync = useCallback(
    async (file: File | string) =>
    {
      if (isLoading) return;
      setIsLoading(true);
      try
      {
        let loadedImage: HTMLImageElement;
        if (file instanceof File)
        {
          // Если ImageHelper создает URL.createObjectURL, не забудьте revoke!
          loadedImage = await ImageHelper.loadImageFile(file);
        }
        else
        {
          loadedImage = await ImageHelper.loadImageURL(file, crossOrigin);
        }
        setRawImage(loadedImage);
      }
      catch (error)
      {
        console.error(error);
      }
      finally
      {
        setIsLoading(false);
      }
    },
    [crossOrigin]
  );

  const drawToCanvas = useCallback(
    (targetCanvas: HTMLCanvasElement) =>
    {
      const ctx = targetCanvas.getContext('2d', { willReadFrequently: true });
      if (!ctx || !rawImage) return;

      // Устанавливаем размер буфера (для превью можно умножить на DPR, если нужно супер-качество)
      targetCanvas.width = previewSize;
      targetCanvas.height = previewSize;

      ctx.clearRect(0, 0, previewSize, previewSize);
      ctx.save();

      // 1. Клиппинг (скругление углов)
      if (previewRadius && borderRadius > 0)
      {
        ctx.beginPath();
        ctx.roundRect(0, 0, previewSize, previewSize, borderRadius);
        ctx.clip();
      }

      // 2. Трансформации
      ctx.translate(previewSize / 2, previewSize / 2);
      ctx.rotate((rotate * Math.PI) / 180);

      // Расчет размеров (такой же как в redraw)
      const rect = canvasRef.current?.getBoundingClientRect() || { width: previewSize, height: previewSize };
      const imgRatio = rawImage.width / rawImage.height;
      const canvasRatio = rect.width / rect.height;

      let baseWidth, baseHeight;
      if (imgRatio > canvasRatio)
      {
        baseHeight = rect.height;
        baseWidth = rect.height * imgRatio;
      }
      else
      {
        baseWidth = rect.width;
        baseHeight = rect.width / imgRatio;
      }

      const drawWidth = baseWidth * scale;
      const drawHeight = baseHeight * scale;

      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(rawImage, -drawWidth / 2 + offset.x, -drawHeight / 2 + offset.y, drawWidth, drawHeight);

      ctx.restore();

      if (previewTransparent)
      {
        CanvasHelper.removeSpriteBackgroundFromContext(ctx, previewTransparentThreshold);
      }
      if (previewSmooth)
      {
        CanvasHelper.smoothCanvasEdgesFromContext(ctx);
      }
    },
    [rawImage, rotate, scale, offset, borderRadius, previewTransparent, previewSmooth, previewRadius, previewTransparentThreshold]
  );

  const redraw = useCallback(() =>
  {
    const canvas = canvasRef.current;
    if (!canvas || !rawImage) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // 1. Настройка четкости (DPI / Retina)
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    context.save();
    context.scale(dpr, dpr); // Работаем в логических пикселях

    const logicalWidth = rect.width;
    const logicalHeight = rect.height;

    // Параметры окна обрезки
    const cropSize = 128;
    const cropX = (logicalWidth - cropSize) / 2;
    const cropY = (logicalHeight - cropSize) / 2;

    // --- ЭТАП 1: Отрисовка фонового изображения ---
    context.save();
    // Переносим центр в середину канваса для корректного вращения и сдвига
    context.translate(logicalWidth / 2, logicalHeight / 2);
    context.rotate((rotate * Math.PI) / 180);
    context.translate(-logicalWidth / 2, -logicalHeight / 2);

    const imgRatio = rawImage.width / rawImage.height;
    const canvasRatio = logicalWidth / logicalHeight;
    let baseWidth = logicalWidth,
      baseHeight = logicalHeight;

    if (imgRatio > canvasRatio)
    {
      baseWidth = logicalHeight * imgRatio;
    }
    else
    {
      baseHeight = logicalWidth / imgRatio;
    }

    const drawWidth = baseWidth * scale;
    const drawHeight = baseHeight * scale;

    // Координаты отрисовки с учетом смещения (offset)
    const x = (logicalWidth - drawWidth) / 2 + offset.x;
    const y = (logicalHeight - drawHeight) / 2 + offset.y;

    context.imageSmoothingQuality = 'high';
    context.drawImage(rawImage, x, y, drawWidth, drawHeight);
    context.restore();

    // --- ЭТАП 2: Создание маски с "дыркой" (Окно просмотра) ---
    context.save();
    context.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Цвет затемнения вокруг окна

    context.beginPath();
    // ВАЖНО: В одном пути рисуем внешний прямоугольник...
    context.rect(0, 0, logicalWidth, logicalHeight);

    // ...и внутреннее скругленное окно.
    // Мы не вызываем CanvasHelper.drawRoundedRect, т.к. он внутри делает beginPath()
    context.roundRect(cropX, cropY, cropSize, cropSize, 0);

    // Правило 'evenodd' сделает область внутри roundRect прозрачной
    context.fill('evenodd');
    context.restore();

    // --- ЭТАП 3: Отрисовка пунктирной рамки окна ---
    context.save();
    context.setLineDash([5, 5]); // Штрих 5px, пробел 5px
    context.strokeStyle = 'rgba(255, 255, 255, 0.8)'; // Белая полупрозрачная линия
    context.lineWidth = 2;

    context.beginPath();
    context.roundRect(cropX, cropY, cropSize, cropSize, borderRadius);
    context.stroke();
    context.restore();

    // --- ЭТАП 4: Сетка ---
    if (showGrid)
    {
      context.save();
      CanvasHelper.drawGrid(context, 0, 0, baseWidth, baseHeight, 20);
      context.restore();
    }

    context.restore(); // Конец общей трансформации dpr
  }, [rawImage, rotate, scale, borderRadius, offset, showGrid]);

  const resetTransform = useCallback(() =>
  {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setRotate(0);
    // Если вы используете начальную позицию из пропсов, можно поставить её:
    // setPosition(defaultPosition);
  }, []);
  // #endregion

  // #region Effects
  useEffect(() =>
  {
    if (image) void loadImageAsync(image);
  }, [image, loadImageAsync]);

  useEffect(() =>
  {
    // Перерисовываем при изменении размеров или параметров
    redraw();
    window.addEventListener('resize', redraw);
    return () => window.removeEventListener('resize', redraw);
  }, [rawImage, rotate, scale, borderRadius, redraw]);

  useEffect(() =>
  {
    const canvas = canvasRef.current;
    const preventDefault = (e: WheelEvent) => e.preventDefault();

    if (canvas)
    {
      canvas.addEventListener('wheel', preventDefault, { passive: false });
    }
    return () => canvas?.removeEventListener('wheel', preventDefault);
  }, []);

  useEffect(() =>
  {
    redraw(); // Основной канвас с рамками
    if (previewCanvasRef.current)
    {
      drawToCanvas(previewCanvasRef.current); // Маленькое превью
    }
  }, [redraw, drawToCanvas]);
  // #endregion

  // #region Handlers
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    const file = event.target.files?.[0];
    if (file) setImage(file);
    event.target.value = '';
  };

  const handleMouseDown = (e: React.MouseEvent) =>
  {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) =>
  {
    if (!isDragging) return;
    if (!isDragging) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    const logicalWidth = rect.width;
    const logicalHeight = rect.height;

    // Разница движения мыши
    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;

    // Переводим угол в радианы
    const rad = (rotate * Math.PI) / 180;

    // Трансформируем дельту мыши с учетом поворота
    // Чтобы картинка всегда шла "за мышкой" независимо от вращения
    const rotatedDx = dx * Math.cos(rad) + dy * Math.sin(rad);
    const rotatedDy = dy * Math.cos(rad) - dx * Math.sin(rad);

    let newX = offset.x + rotatedDx;
    let newY = offset.y + rotatedDy;

    // Ограничение границ (Bounds Clip)
    if (isBoundsClip && rawImage)
    {
      // Здесь упрощенная логика: не даем центру уйти слишком далеко
      // Для идеального Clip нужно учитывать drawWidth/Height относительно центра
      const limitX = (logicalWidth * scale) / 4;
      const limitY = (logicalHeight * scale) / 4;
      newX = Math.max(-limitX, Math.min(limitX, newX));
      newY = Math.max(-limitY, Math.min(limitY, newY));
    }

    setOffset({ x: newX, y: newY });

    // Обновляем стартовую точку для следующего шага
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () =>
  {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) =>
  {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) =>
  {
    if (!isDragging || e.touches.length !== 1) return;

    const touch = e.touches[0];
    const dx = touch.clientX - startPos.x;
    const dy = touch.clientY - startPos.y;

    const rad = (rotate * Math.PI) / 180;

    // Учитываем поворот, чтобы картинка шла за пальцем
    const rotatedDx = dx * Math.cos(rad) + dy * Math.sin(rad);
    const rotatedDy = dy * Math.cos(rad) - dx * Math.sin(rad);

    setOffset((prev) => ({
      x: prev.x + rotatedDx,
      y: prev.y + rotatedDy
    }));

    setStartPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () =>
  {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) =>
  {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    // Координаты курсора относительно центра канваса
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    // Направление зума (инвертируем для привычного поведения)
    const zoomStep = 0.1;
    const delta = e.deltaY < 0 ? 1 + zoomStep : 1 - zoomStep;

    const newScale = Math.max(0.1, Math.min(10, scale * delta));

    // Вычисляем, насколько нужно сдвинуть offset, чтобы зум был в точку курсора
    // Формула: новый_офсет = офсет - (точка_курсора / старый_зум * (новый_зум - старый_зум))
    // С учетом того, что offset у нас в локальных осях, для простоты здесь считаем дельту масштаба:
    const ratio = newScale / scale;

    setOffset((prev) => ({
      x: prev.x * ratio + (mouseX - mouseX * ratio),
      y: prev.y * ratio + (mouseY - mouseY * ratio)
    }));

    setScale(newScale);
  };

  const handleSave = () =>
  {
    if (!previewCanvasRef.current) return;
    previewCanvasRef.current.toBlob((blob) =>
    {
      if (blob) onSavePreview(blob);
    }, 'image/png');
  };
  // #endregion

  // #region Render
  const renderCanvas = () =>
  {
    {
      /* ВАЖНО: CSS размеры управляют отображением, а JS — качеством */
    }
    return (
      <canvas
        ref={canvasRef}
        style={{
          width: maxCanvasWidth,
          height: maxCanvasHeight,
          marginTop: '1rem',
          marginLeft: orientation === 'vertical' ? 'auto' : '1rem',
          marginRight: 'auto',
          display: 'block',
          touchAction: 'none', // Обязательно: отключает стандартный скролл браузера
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onWheel={handleWheel}
      />
    );
  };

  const renderBlockButtons = () =>
  {
    return (
      <HorizontalStack hAlign="space-between" m={margin} p={padding} spacing={'md'} vAlign="center" w={'100%'}>
        <input ref={fileInputRef} accept="image/*" style={{ display: 'none' }} type="file" onChange={handleImageUpload} />
        <Button size={size} onClick={() => fileInputRef.current?.click()}>
          {LocalizationCore.data.actions.load}
        </Button>
        <Button disabled={!rawImage} size={size} variant="outline" onClick={resetTransform}>
          {LocalizationCore.data.actions.reset}
        </Button>
        <Checkbox
          checked={showGrid}
          label={LocalizationCore.data.controls.grid}
          size={size}
          onChange={(event) =>
          {
            setShowGrid(event.target.checked);
          }}
        />
      </HorizontalStack>
    );
  };

  const renderSliderRotation = () =>
  {
    return (
      <Slider
        inlinePlace={true}
        label={LocalizationCore.data.controls.rotation}
        labelProps={{ w: '120px' }}
        m={margin}
        max={355}
        min={5}
        p={padding}
        size={size}
        step={5}
        value={rotate}
        onChange={setRotate}
      />
    );
  };

  const renderSliderRadius = () =>
  {
    return (
      <Slider
        inlinePlace={true}
        label={LocalizationCore.data.controls.cornerRounding}
        labelProps={{ w: '120px' }}
        m={margin}
        max={64}
        min={0}
        p={padding}
        size={size}
        value={borderRadius}
        onChange={setBorderRadius}
      />
    );
  };

  const renderSliderScale = () =>
  {
    return (
      <Slider
        inlinePlace={true}
        label={LocalizationCore.data.controls.scale}
        labelProps={{ w: '120px' }}
        m={margin}
        max={10}
        min={0.1}
        p={padding}
        size={size}
        step={0.1}
        value={scale}
        onChange={setScale}
      />
    );
  };

  const renderBlockPreview = () =>
  {
    return (
      <HorizontalStack hAlign="flex-start" m={margin} p={padding} spacing={'md'}>
        {/* Секция превью */}
        <VerticalStack hAlign="center" mr={'xl'}>
          <canvas
            ref={previewCanvasRef}
            style={{
              width: `${previewSize}px`,
              height: `${previewSize}px`,
              border: '1px solid #ccc',
              backgroundColor: 'transparent' // Чтобы видеть прозрачные углы
            }}
          />
        </VerticalStack>

        {/* Кнопки управления */}
        <VerticalStack hAlign="flex-start" spacing={'md'}>
          <Checkbox
            checked={previewRadius}
            label={LocalizationCore.data.controls.cornerRounding}
            labelPosition="right"
            mb={'xs'}
            size={size}
            onChange={(event) =>
            {
              setPreviewRadius(event.target.checked);
            }}
          />
          <Checkbox
            checked={previewTransparent}
            label={LocalizationCore.data.controls.transparentBackground}
            labelPosition="right"
            mb={'xs'}
            size={size}
            onChange={(event) =>
            {
              setPreviewTransparent(event.target.checked);
            }}
          />
          {previewTransparent && (
            <Slider max={0.5} mb={'xs'} min={0.01} step={0.01} value={previewTransparentThreshold} w={'100%'} onChange={setPreviewTransparentThreshold} />
          )}
          <Checkbox
            checked={previewSmooth}
            label={LocalizationCore.data.controls.smoothingEdges}
            labelPosition="right"
            size={size}
            onChange={(event) =>
            {
              setPreviewSmooth(event.target.checked);
            }}
          />
          <Button size={size} onClick={handleSave}>
            {LocalizationCore.data.actions.save}
          </Button>
        </VerticalStack>
      </HorizontalStack>
    );
  };
  // #endregion

  if (orientation === 'vertical')
  {
    return (
      <VerticalStack {...stackProps}>
        {renderCanvas()}
        {renderBlockButtons()}
        {renderSliderRotation()}
        {renderSliderRadius()}
        {renderSliderScale()}
        {renderBlockPreview()}
      </VerticalStack>
    );
  }
  else
  {
    return (<HorizontalStack {...stackProps}>
      <VerticalStack p={padding}>
        {renderCanvas()}
        {renderBlockButtons()}
      </VerticalStack>
      <VerticalStack p={padding}>
        {renderSliderRotation()}
        {renderSliderRadius()}
        {renderSliderScale()}
        {renderBlockPreview()}
      </VerticalStack>
    </HorizontalStack>);
  }

  return null;
}
