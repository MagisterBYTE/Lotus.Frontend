/**
 * Единый модуль для генерации шума и фрактальных поверхностей (fBm).
 */
export abstract class Noise
{
  public static seed: number = 16;

  // --- Базовые операции ---

  private static lerp(a: number, b: number, t: number): number
  {
    return a + (b - a) * t;
  }

  private static cosineInterpolate(a: number, b: number, t: number): number
  {
    const f = (1 - Math.cos(t * Math.PI)) * 0.5;
    return a * (1 - f) + b * f;
  }

  /** 32-битный хеш для 1D */
  public static noise1D(x: number): number
  {
    let n = (Math.floor(x) + this.seed) | 0;
    n = (n >> 13) ^ n;
    const res = (Math.imul(n, Math.imul(n, n) * 60493 + 19990303) + 1376312589) & 0x7fffffff;
    return res / 2147483647.0;
  }

  /** 32-битный хеш для 2D */
  public static noise2D(x: number, y: number): number
  {
    const n = (Math.imul(1619, Math.floor(x)) + Math.imul(31337, Math.floor(y)) + this.seed) & 0x7fffffff;
    const m = (n >> 13) ^ n;
    const res = (Math.imul(m, Math.imul(m, m) * 60493 + 19990303) + 1376312589) & 0x7fffffff;
    return res / 2147483647.0;
  }

  // --- Интерполированный (гладкий) шум ---

  public static smoothNoise1D(x: number): number
  {
    const ix = Math.floor(x);
    const fx = x - ix;
    return this.cosineInterpolate(this.noise1D(ix), this.noise1D(ix + 1), fx);
  }

  public static smoothNoise2D(x: number, y: number): number
  {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;

    const v1 = this.noise2D(ix, iy);
    const v2 = this.noise2D(ix + 1, iy);
    const v3 = this.noise2D(ix, iy + 1);
    const v4 = this.noise2D(ix + 1, iy + 1);

    const i1 = this.lerp(v1, v2, fx);
    const i2 = this.lerp(v3, v4, fx);
    return this.lerp(i1, i2, fy);
  }

  // --- Fractal Brownian Motion (fBm) ---

  /**
   * Генерация фрактального шума в 1D.
   * @param x Координата.
   * @param octaves Количество слоев (детализация).
   * @param persistence Насколько быстро убывает влияние каждой следующей октавы (0.5 - классика).
   * @param lacunarity Насколько быстро растет частота (2.0 - классика).
   */
  public static fBm1D(x: number, octaves: number = 4, persistence: number = 0.5, lacunarity: number = 2.0): number
  {
    let total = 0;
    let freq = 1.0;
    let amp = 1.0;
    let maxValue = 0; // Для нормализации результата

    for (let i = 0; i < octaves; i++)
    {
      total += this.smoothNoise1D(x * freq) * amp;
      maxValue += amp;
      amp *= persistence;
      freq *= lacunarity;
    }

    return total / maxValue;
  }

  /**
   * Генерация фрактального шума в 2D (Карта высот).
   */
  public static fBm2D(x: number, y: number, octaves: number = 4, persistence: number = 0.5, lacunarity: number = 2.0): number
  {
    let total = 0;
    let freq = 1.0;
    let amp = 1.0;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++)
    {
      total += this.smoothNoise2D(x * freq, y * freq) * amp;
      maxValue += amp;
      amp *= persistence;
      freq *= lacunarity;
    }

    return total / maxValue;
  }

  /**
   * Искривление области (Domain Warping).
   * Создает эффекты завихрений, жидкостей или сложного рельефа.
   * @example
   * Текстура мрамора - sin(x + domainWarp2D(x, y) * 10).
   * Эффект пламени/лавы - (x, y + time)
   * @param x Координата X.
   * @param y Координата Y.
   * @param intensity Сила искривления (сдвига).
   */
  public static domainWarp2D(x: number, y: number, intensity: number = 4.0): number
  {
    // 1. Создаем вектор смещения (q) с помощью двух слоев шума
    // Используем разные константы смещения, чтобы шумы для X и Y не совпадали
    const qx = this.fBm2D(x, y, 4);
    const qy = this.fBm2D(x + 5.2, y + 1.3, 4);

    // 2. Создаем второй уровень смещения (r), зависящий от первого (q)
    const rx = this.fBm2D(x + intensity * qx + 1.7, y + intensity * qy + 9.2, 4);
    const ry = this.fBm2D(x + intensity * qx + 8.3, y + intensity * qy + 2.8, 4);

    // 3. Возвращаем итоговый шум, координаты которого искривлены вектором r
    return this.fBm2D(x + intensity * rx, y + intensity * ry, 4);
  }

  /**
   * Генерация клеточного шума (Voronoi / Worley).
   * @example
   * Каменная кладка / Плитка: Используйте id для окраски каждой клетки в свой цвет. Так как id постоянен внутри одной клетки, вся "плитка" будет одного цвета
   * Трещины / Вода: Используйте dist. Близко к 0 — центр клетки, близко к 1.0 — границы. Если взять 1.0 - dist, получатся выпуклые формы (как чешуя)
   * Эффект витража: Комбинируйте dist и id. Например, залейте клетку цветом id, но нарисуйте черную линию, если dist > 0.9
   * @param x Координата X.
   * @param y Координата Y.
   * @returns Объект с расстоянием до ближайшей точки (dist) и ID этой точки (id).
   */
  public static cellular2D(x: number, y: number): { dist: number; id: number }
  {
    const ix = Math.floor(x);
    const iy = Math.floor(y);

    let minDist = 1e10;
    let cellId = 0;

    // Проверяем соседние ячейки (сетка 3x3), чтобы найти ближайшую точку
    for (let v = -1; v <= 1; v++)
    {
      for (let u = -1; u <= 1; u++)
      {
        const cx = ix + u;
        const cy = iy + v;

        // Генерируем "случайную" позицию точки внутри этой ячейки
        // Используем разные множители для X и Y, чтобы точки не были на диагонали
        const xOffset = this.noise2D(cx, cy);
        const yOffset = this.noise2D(cx + 12, cy + 34);

        const pointX = cx + xOffset;
        const pointY = cy + yOffset;

        const dx = pointX - x;
        const dy = pointY - y;

        // Евклидово расстояние (квадрат расстояния быстрее для расчетов)
        const dist = dx * dx + dy * dy;

        if (dist < minDist)
        {
          minDist = dist;
          // Генерируем уникальный ID для этой клетки на основе её координат
          cellId = (this.noise2D(cx, cy) * 1000000) | 0;
        }
      }
    }

    return {
      dist: Math.sqrt(minDist), // Возвращаем реальное расстояние [0, ~1.41]
      id: cellId
    };
  }
}
