import { GenerationNoise2D } from './GenerationNoise2D';

describe('GenerationNoise2D', () => 
{
  test('interpolatedNoiseSingle2D возвращает стабильное значение для координат', () => 
  {
    const x = 10.5, y = 20.5;
    const res1 = GenerationNoise2D.interpolatedNoiseSingle2D(x, y);
    const res2 = GenerationNoise2D.interpolatedNoiseSingle2D(x, y);
    expect(res1).toBeCloseTo(res2, 10);
  });

  test('Значение шума находится в диапазоне [0, 1]', () => 
  {
    const res = GenerationNoise2D.interpolatedNoiseSingle2D(5.7, 8.2);
    expect(res).toBeGreaterThanOrEqual(0);
    expect(res).toBeLessThanOrEqual(1);
  });

  test('Изменение Seed меняет результат генерации', () => 
  {
    const x = 5, y = 5;
    GenerationNoise2D.seed = 16;
    const res1 = GenerationNoise2D.interpolatedNoiseSingle2D(x, y);
        
    GenerationNoise2D.seed = 99;
    const res2 = GenerationNoise2D.interpolatedNoiseSingle2D(x, y);
        
    expect(res1).not.toBe(res2);
  });
});
