/**
 * Класс реализующий методы генерации шума в двухмерном пространстве.
 */
export abstract class GenerationNoise2D
{
  /** 
   * Случайное число источника. 
   */
  public static seed: number = 16;

  /**
   * Линейная интерполяция (аналог XMathInterpolation.Lerp).
   */
  private static lerp(a: number, b: number, t: number): number
  {
    return a + (b - a) * t;
  }

  /**
   * Целочисленная шумовая функция V2 (наиболее стабильная).
   */
  public static noiseInteger2DV2(x: number, y: number): number
  {
    const generatorNoiseX = 1619;
    const generatorNoiseY = 31337;

    // Используем Math.imul для корректной имитации 32-битного умножения C#
    let n = (Math.imul(generatorNoiseX, x) + Math.imul(generatorNoiseY, y) + GenerationNoise2D.seed) & 0x7fffffff;
    n = (n >> 13) ^ n;

    const part1 = Math.imul(n, n);
    const part2 = Math.imul(part1, 60493);
    const part3 = (part2 + 19990303) | 0;
    const part4 = Math.imul(n, part3);

    return (part4 + 1376312589) & 0x7fffffff;
  }

  /**
   * Вещественная шумовая функция в диапазоне [0.0, 1.0].
   */
  public static noiseSingle2DV2(x: number, y: number): number
  {
    return GenerationNoise2D.noiseInteger2DV2(x | 0, y | 0) / 2147483647.0;
  }

  /**
   * Вычисление значения сглаженного шума.
   * Использует фильтр окрестностей 3x3 для устранения резких артефактов.
   */
  public static smoothNoiseSingle2D(x: number, y: number): number
  {
    const corners =
      (GenerationNoise2D.noiseSingle2DV2(x - 1, y - 1) +
        GenerationNoise2D.noiseSingle2DV2(x + 1, y - 1) +
        GenerationNoise2D.noiseSingle2DV2(x - 1, y + 1) +
        GenerationNoise2D.noiseSingle2DV2(x + 1, y + 1)) /
      16;

    const sides =
      (GenerationNoise2D.noiseSingle2DV2(x - 1, y) +
        GenerationNoise2D.noiseSingle2DV2(x + 1, y) +
        GenerationNoise2D.noiseSingle2DV2(x, y - 1) +
        GenerationNoise2D.noiseSingle2DV2(x, y + 1)) /
      8;

    const center = GenerationNoise2D.noiseSingle2DV2(x, y) / 4;

    return corners + sides + center;
  }

  /**
   * Вычисление интерполированного шума.
   * Реализует билинейную интерполяцию для получения плавных переходов.
   */
  public static interpolatedNoiseSingle2D(x: number, y: number): number
  {
    const integerX = Math.floor(x);
    const fractionalX = x - integerX;

    const integerY = Math.floor(y);
    const fractionalY = y - integerY;

    const v1 = GenerationNoise2D.smoothNoiseSingle2D(integerX, integerY);
    const v2 = GenerationNoise2D.smoothNoiseSingle2D(integerX + 1, integerY);
    const v3 = GenerationNoise2D.smoothNoiseSingle2D(integerX, integerY + 1);
    const v4 = GenerationNoise2D.smoothNoiseSingle2D(integerX + 1, integerY + 1);

    const i1 = GenerationNoise2D.lerp(v1, v2, fractionalX);
    const i2 = GenerationNoise2D.lerp(v3, v4, fractionalX);

    return GenerationNoise2D.lerp(i1, i2, fractionalY);
  }
}
