
/**
 * Вспомогательный класс для работы с канвой 
 */
export abstract class CanvasHelper 
{
  /**
   * Рисует настраиваемую сетку на холсте.
   * Реализована как "чистая" процедура: восстанавливает состояние контекста после выполнения.
   * 
   * @param ctx - Контекст 2D холста.
   * @param x - Координата X начала сетки.
   * @param y - Координата Y начала сетки.
   * @param width - Общая ширина сетки.
   * @param height - Общая высота сетки.
   * @param divisions - Количество ячеек по горизонтали и вертикали (для правила третей — 3).
   * @param strokeWidth - Толщина линий в пикселях.
   * @param gridColor - Цвет линий.
   */
  // eslint-disable-next-line max-params
  public static drawGrid(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    divisions: number = 3,
    strokeWidth: number = 1,
    gridColor: string = '#000000'
  ): void
  {
    if (divisions <= 1) return; // Смысла в сетке из 1 деления нет

    ctx.save();
    ctx.fillStyle = gridColor;

    const stepX = width / divisions;
    const stepY = height / divisions;

    // Рисуем внутренние линии (не рисуем границы, так как они обычно есть у контейнера)
    for (let i = 1; i < divisions; i++) 
    {
    // Вертикальные
      const posX = x + stepX * i - strokeWidth / 2;
      ctx.fillRect(posX, y, strokeWidth, height);

      // Горизонтальные
      const posY = y + stepY * i - strokeWidth / 2;
      ctx.fillRect(x, posY, width, strokeWidth);
    }

    ctx.restore();
  }

  /**
   * Применяет скругление к целевому холсту на основе исходного.
   * Оптимизирована для частого вызова: позволяет переиспользовать существующий Canvas.
   * 
   * @param source - Исходный холст с изображением.
   * @param borderRadius - Радиус скругления.
   * @param targetCanvas - (Опционально) Холст, в который нужно отрисовать результат. 
   *                       Если не передан, создается новый.
   * @returns Холст с примененным скруглением.
   */
  public static clipCanvasRounded(
    source: HTMLCanvasElement,
    borderRadius: number,
    targetCanvas?: HTMLCanvasElement
  ): HTMLCanvasElement
  {
    const { width, height } = source;
  
    // Переиспользуем переданный canvas или создаем новый только один раз
    const canvas = targetCanvas ?? document.createElement('canvas');
  
    // Синхронизируем размеры, если они изменились
    if (canvas.width !== width) canvas.width = width;
    if (canvas.height !== height) canvas.height = height;
  
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return source;

    // Очищаем целевой холст перед новой отрисовкой (важно для прозрачности)
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (borderRadius > 0) 
    {
      const safeRadius = Math.min(borderRadius, width / 2, height / 2);
      ctx.beginPath();
      ctx.roundRect(0, 0, width, height, safeRadius);
      ctx.clip();
    }

    ctx.drawImage(source, 0, 0);
    ctx.restore();

    return canvas;
  }

  /**
   * Удаляет фон, используя алгоритм заливки от краев (Flood Fill).
   * Это предотвращает удаление похожих цветов внутри самого объекта.
   * @param source - Исходный холст с изображением.
   * @param threshold - Чувствительность (0.0 - 1.0). Оптимально 0.1 - 0.15.
   */
  public static removeImageBackground(
    image: HTMLImageElement | HTMLCanvasElement,
    threshold: number = 0.1
  ): HTMLCanvasElement
  {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return canvas;
    
    ctx.drawImage(image, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imageData;
    
    // 1. Определяем максимальную дистанцию (диагональ куба RGB ~441.67)
    const maxDistance = threshold * 441.67;
    
    // 2. Собираем эталонные цвета фона из 4 углов
    const cornerIndices = [
      0,                                      // Топ-лево
      (width - 1) * 4,                        // Топ-право
      (width * (height - 1)) * 4,             // Бот-лево
      (width * height - 1) * 4                // Бот-право
    ];
    
    const bgColors = cornerIndices.map(idx => ({
      r: data[idx],
      g: data[idx + 1],
      b: data[idx + 2]
    }));
  
    // 3. Подготовка к Flood Fill
    const visited = new Uint8Array(width * height);
    // Начинаем заливку сразу из четырех углов
    const stack: [number, number][] = [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]];
  
    while (stack.length > 0) 
    {
      const [x, y] = stack.pop()!;
      const pos = y * width + x;
  
      if (visited[pos]) continue;
      visited[pos] = 1;
  
      const idx = pos * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
  
      // Проверяем, похож ли текущий пиксель на какой-либо из угловых
      const isBackground = bgColors.some(bg => 
      {
        const distance = Math.sqrt(
          (r - bg.r) ** 2 + 
          (g - bg.g) ** 2 + 
          (b - bg.b) ** 2
        );
        return distance <= maxDistance;
      });
  
      if (isBackground) 
      {
        data[idx + 3] = 0; // Делаем прозрачным
  
        // Проверяем соседей (4-связная область)
        if (x + 1 < width)  stack.push([x + 1, y]);
        if (x - 1 >= 0)     stack.push([x - 1, y]);
        if (y + 1 < height) stack.push([x, y + 1]);
        if (y - 1 >= 0)     stack.push([x, y - 1]);
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  /**
   * Удаляет фон, используя алгоритм заливки от краев (Flood Fill).
   * Это предотвращает удаление похожих цветов внутри самого объекта.
   * @param source - Контекст 2D рендеринга.
   * @param threshold - Чувствительность (0.0 - 1.0). Оптимально 0.1 - 0.15.
   */
  public static removeBackground(
    context: CanvasRenderingContext2D,
    threshold: number = 0.1
  )
  {
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    const { data, width, height } = imageData;
    
    // 1. Определяем максимальную дистанцию (диагональ куба RGB ~441.67)
    const maxDistance = threshold * 441.67;
    
    // 2. Собираем эталонные цвета фона из 4 углов
    const cornerIndices = [
      0,                                      // Топ-лево
      (width - 1) * 4,                        // Топ-право
      (width * (height - 1)) * 4,             // Бот-лево
      (width * height - 1) * 4                // Бот-право
    ];
    
    const bgColors = cornerIndices.map(idx => ({
      r: data[idx],
      g: data[idx + 1],
      b: data[idx + 2]
    }));
  
    // 3. Подготовка к Flood Fill
    const visited = new Uint8Array(width * height);
    // Начинаем заливку сразу из четырех углов
    const stack: [number, number][] = [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]];
  
    while (stack.length > 0) 
    {
      const [x, y] = stack.pop()!;
      const pos = y * width + x;
  
      if (visited[pos]) continue;
      visited[pos] = 1;
  
      const idx = pos * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
  
      // Проверяем, похож ли текущий пиксель на какой-либо из угловых
      const isBackground = bgColors.some(bg => 
      {
        const distance = Math.sqrt(
          (r - bg.r) ** 2 + 
          (g - bg.g) ** 2 + 
          (b - bg.b) ** 2
        );
        return distance <= maxDistance;
      });
  
      if (isBackground) 
      {
        data[idx + 3] = 0; // Делаем прозрачным
  
        // Проверяем соседей (4-связная область)
        if (x + 1 < width)  stack.push([x + 1, y]);
        if (x - 1 >= 0)     stack.push([x - 1, y]);
        if (y + 1 < height) stack.push([x, y + 1]);
        if (y - 1 >= 0)     stack.push([x, y - 1]);
      }
    }
    
    context.putImageData(imageData, 0, 0);
  }

  /**
   * Удаляет однородный фон со спрайтов, используя алгоритм связной заливки.
   * Идеально подходит для иконок с четкими границами.
   * @param source - Исходный холст с изображением.
   * @param threshold - Чувствительность (0.0 - 1.0). Оптимально 0.1 - 0.15.
   */
  public static removeSpriteBackground(
    image: HTMLImageElement | HTMLCanvasElement,
    threshold: number = 0.1
  ): HTMLCanvasElement
  {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
  
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return canvas;

    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imageData;

    const maxDist = threshold * 441.67;
    const visited = new Uint8Array(width * height);
  
    // Стартуем из всех четырех углов одновременно
    const stack: [number, number][] = [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]];

    // Цвета в углах (берем как эталоны фона)
    const getPixel = (x: number, y: number) => 
    {
      const i = (y * width + x) * 4;
      return [data[i], data[i + 1], data[i + 2]];
    };

    const seeds = stack.map(([x, y]) => getPixel(x, y));

    while (stack.length > 0) 
    {
      const [x, y] = stack.pop()!;
      const pos = y * width + x;

      if (visited[pos]) continue;
      visited[pos] = 1;

      const idx = pos * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];

      // Проверяем близость к любому из угловых эталонов
      const isBg = seeds.some(([sr, sg, sb]) => 
      {
        const d = Math.sqrt((r - sr) ** 2 + (g - sg) ** 2 + (b - sb) ** 2);
        return d <= maxDist;
      });

      if (isBg) 
      {
      // Вместо мгновенного обнуления, можно делать мягкое затухание, 
      // но для спрайтов обычно лучше полный прозрачный:
        data[idx + 3] = 0; 

        // Распространяем заливку (4-связная область)
        if (x > 0) stack.push([x - 1, y]);
        if (x < width - 1) stack.push([x + 1, y]);
        if (y > 0) stack.push([x, y - 1]);
        if (y < height - 1) stack.push([x, y + 1]);
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  /**
   * Удаляет однородный фон со спрайтов, используя алгоритм связной заливки.
   * Идеально подходит для иконок с четкими границами.
   * @param context - Контекст 2D рендеринга.
   * @param threshold - Чувствительность (0.0 - 1.0). Оптимально 0.1 - 0.15.
   */
  public static removeSpriteBackgroundFromContext(
    context: CanvasRenderingContext2D,
    threshold: number = 0.1
  )
  {
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    const { data, width, height } = imageData;

    const maxDist = threshold * 441.67;
    const visited = new Uint8Array(width * height);
  
    // Стартуем из всех четырех углов одновременно
    const stack: [number, number][] = [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]];

    // Цвета в углах (берем как эталоны фона)
    const getPixel = (x: number, y: number) => 
    {
      const i = (y * width + x) * 4;
      return [data[i], data[i + 1], data[i + 2]];
    };

    const seeds = stack.map(([x, y]) => getPixel(x, y));

    while (stack.length > 0) 
    {
      const [x, y] = stack.pop()!;
      const pos = y * width + x;

      if (visited[pos]) continue;
      visited[pos] = 1;

      const idx = pos * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];

      // Проверяем близость к любому из угловых эталонов
      const isBg = seeds.some(([sr, sg, sb]) => 
      {
        const d = Math.sqrt((r - sr) ** 2 + (g - sg) ** 2 + (b - sb) ** 2);
        return d <= maxDist;
      });

      if (isBg) 
      {
      // Вместо мгновенного обнуления, можно делать мягкое затухание, 
      // но для спрайтов обычно лучше полный прозрачный:
        data[idx + 3] = 0; 

        // Распространяем заливку (4-связная область)
        if (x > 0) stack.push([x - 1, y]);
        if (x < width - 1) stack.push([x + 1, y]);
        if (y > 0) stack.push([x, y - 1]);
        if (y < height - 1) stack.push([x, y + 1]);
      }
    }

    context.putImageData(imageData, 0, 0);
  }

  /**
   * Удаляет одиночные пиксели и мелкий "шум" (Despeckle).
   * Проверяет количество соседей у каждого пикселя.
   * 
   * @param canvas - Холст для очистки.
   * @param neighborThreshold - Минимальное кол-во соседей (1-8), чтобы пиксель выжил.
   * @returns Очищенный холст.
   */
  public static cleanupIsolatedPixels(
    canvas: HTMLCanvasElement,
    neighborThreshold: number = 2
  ): HTMLCanvasElement
  {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return canvas;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imageData;
  
    // Создаем копию альфа-канала, чтобы изменения не влияли на проверку соседей в процессе
    const alphaMap = new Uint8Array(width * height);
    for (let i = 0; i < data.length; i += 4) 
    {
      alphaMap[i / 4] = data[i + 3];
    }

    for (let y = 0; y < height; y++) 
    {
      for (let x = 0; x < width; x++) 
      {
        const idx = y * width + x;
      
        // Если пиксель уже прозрачный — пропускаем
        if (alphaMap[idx] === 0) continue;

        let neighbors = 0;

        // Проверяем сетку 3x3 вокруг пикселя
        for (let ny = -1; ny <= 1; ny++) 
        {
          for (let nx = -1; nx <= 1; nx++) 
          {
            // eslint-disable-next-line max-depth
            if (nx === 0 && ny === 0) continue; // Пропускаем сам пиксель

            const curX = x + nx;
            const curY = y + ny;

            // eslint-disable-next-line max-depth
            if (curX >= 0 && curX < width && curY >= 0 && curY < height) 
            {
              // eslint-disable-next-line max-depth
              if (alphaMap[curY * width + curX] > 0) 
              {
                neighbors++;
              }
            }
          }
        }

        // Если соседей слишком мало — удаляем пиксель
        if (neighbors < neighborThreshold) 
        {
          data[idx * 4 + 3] = 0;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  /**
   * Сглаживает края спрайта, используя технику Alpha Thresholding.
   * Убирает "лесенку" и делает контур обтекаемым.
   * 
   * @param canvas - Холст для обработки.
   * @param smoothness - Радиус размытия контура (1-3). Больше значение — сильнее сглаживание.
   * @param cutoff - Порог отсечения альфа-канала (0-255).
   * 
   * @example
   * // 📝 Советы по настройке:
   * // 1. Если край "рваный" — увеличь smoothness до 2.
   * // 2. Если спрайт теряет детали (худеет) — уменьши cutoff до 80-100.
   * // 3. Если виден ободок старого фона — увеличь cutoff до 160-200.
   * 
   * @returns Обработанный холст с четким сглаженным краем.
   */
  public static smoothCanvasEdges(
    canvas: HTMLCanvasElement,
    smoothness: number = 1,
    cutoff: number = 128
  ): HTMLCanvasElement
  {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return canvas;

    // 1. Применяем легкий блюр только для визуального смягчения альфы
    // Мы используем фильтр контекста, это быстрее ручного перебора
    ctx.save();
    ctx.filter = `blur(${smoothness}px)`;
  
    // Рисуем canvas сам на себя с фильтром
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx?.drawImage(canvas, 0, 0);
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);
    ctx.restore();

    // 2. Усиливаем края (Thresholding)
    // Блюр сделал края "ватными", теперь мы делаем их четкими по порогу
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) 
    {
      const alpha = data[i + 3];
      if (alpha > 0) 
      {
      // Если прозрачность выше порога — делаем пиксель полностью видимым,
      // если ниже — полностью прозрачным.
        data[i + 3] = alpha > cutoff ? 255 : 0;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  /**
   * Сглаживает края спрайта, используя технику Alpha Thresholding.
   * Убирает "лесенку" и делает контур обтекаемым.
   * 
   * @param context - Контекст 2D рендеринга.
   * @param smoothness - Радиус размытия контура (1-3). Больше значение — сильнее сглаживание.
   * @param cutoff - Порог отсечения альфа-канала (0-255).
   * 
   * @example
   * // 📝 Советы по настройке:
   * // 1. Если край "рваный" — увеличь smoothness до 2.
   * // 2. Если спрайт теряет детали (худеет) — уменьши cutoff до 80-100.
   * // 3. Если виден ободок старого фона — увеличь cutoff до 160-200.
   * 
   * @returns Обработанный холст с четким сглаженным краем.
   */
  public static smoothCanvasEdgesFromContext(
    context: CanvasRenderingContext2D,
    smoothness: number = 1,
    cutoff: number = 128
  )
  {
    // 1. Применяем легкий блюр только для визуального смягчения альфы
    // Мы используем фильтр контекста, это быстрее ручного перебора
    context.save();
    context.filter = `blur(${smoothness}px)`;
  
    // Рисуем canvas сам на себя с фильтром
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = context.canvas.width;
    tempCanvas.height = context.canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx?.drawImage(context.canvas, 0, 0);
  
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(tempCanvas, 0, 0);
    context.restore();

    // 2. Усиливаем края (Thresholding)
    // Блюр сделал края "ватными", теперь мы делаем их четкими по порогу
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) 
    {
      const alpha = data[i + 3];
      if (alpha > 0) 
      {
      // Если прозрачность выше порога — делаем пиксель полностью видимым,
      // если ниже — полностью прозрачным.
        data[i + 3] = alpha > cutoff ? 255 : 0;
      }
    }

    context.putImageData(imageData, 0, 0);
  }
}