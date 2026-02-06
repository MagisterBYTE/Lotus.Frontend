import { GenerationNoise1D } from './GenerationNoise1D';

describe('GenerationNoise1D', () => 
{
  test('Детерминированность: одно и то же число дает одинаковый шум', () => 
  {
    const val = 42;
    const result1 = GenerationNoise1D.noiseInteger1DV1(val);
    const result2 = GenerationNoise1D.noiseInteger1DV1(val);
    expect(result1).toBe(result2);
  });

  test('V2 дает разные значения для последовательных чисел', () => 
  {
    const r1 = GenerationNoise1D.noiseInteger1DV2(100);
    const r2 = GenerationNoise1D.noiseInteger1DV2(101);
    expect(r1).not.toBe(r2);
  });

  test('V1 корректно работает с отрицательными числами', () => 
  {
    expect(() => GenerationNoise1D.noiseInteger1DV1(-500)).not.toThrow();
  });
});

describe('GenerationNoise1D Smooth Noise', () => 
{
  test('noiseSingle1D возвращает значения в диапазоне [0, 1]', () => 
  {
    for (let i = 0; i < 100; i++) 
    {
      const res = GenerationNoise1D.noiseSingle1D(i);
      expect(res).toBeGreaterThanOrEqual(0);
      expect(res).toBeLessThanOrEqual(1);
    }
  });

  test('smoothNoise1D дает плавный переход между точками', () => 
  {
    const start = GenerationNoise1D.smoothNoise1D(10.0);
    const mid = GenerationNoise1D.smoothNoise1D(10.5);
    const end = GenerationNoise1D.smoothNoise1D(11.0);

    // В косинусной интерполяции середина обычно находится между краями
    if (start < end) 
    {
      expect(mid).toBeGreaterThan(start);
      expect(mid).toBeLessThan(end);
    }
    else 
    {
      expect(mid).toBeLessThan(start);
      expect(mid).toBeGreaterThan(end);
    }
  });

  test('Интерполяция в целой точке совпадает с базовым шумом', () => 
  {
    const x = 5.0;
    const noiseRaw = GenerationNoise1D.noiseSingle1D(x);
    const noiseSmooth = GenerationNoise1D.smoothNoise1D(x);
        
    // Разница должна быть ничтожной (погрешность float)
    expect(Math.abs(noiseRaw - noiseSmooth)).toBeLessThan(0.000001);
  });
});