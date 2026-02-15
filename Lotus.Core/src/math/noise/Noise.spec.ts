import { Noise } from './Noise';

describe('Noise Fractal Tests', () => 
{
  test('fBm2D возвращает значения в диапазоне [0, 1]', () => 
  {
    for (let i = 0; i < 10; i++) 
    {
      const val = Noise.fBm2D(i * 0.5, i * 0.7, 6);
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThanOrEqual(1);
    }
  });

  test('Больше октав дают больше мелких деталей', () => 
  {
    const x = 10.5, y = 10.5;
    const simple = Noise.fBm2D(x, y, 1);
    const complex = Noise.fBm2D(x, y, 8);
        
    // Значения будут разными из-за наложения мелких слоев
    expect(simple).not.toBe(complex);
  });

  test('fBm1D сохраняет непрерывность', () => 
  {
    const v1 = Noise.fBm1D(1.0);
    const v2 = Noise.fBm1D(1.0001);
    // Разница должна быть минимальной
    expect(Math.abs(v1 - v2)).toBeLessThan(0.01);
  });
});

describe('Noise Domain Warping', () => 
{
  test('domainWarp2D должен возвращать детерминированные значения', () => 
  {
    const x = 1.23, y = 4.56;
    const r1 = Noise.domainWarp2D(x, y);
    const r2 = Noise.domainWarp2D(x, y);
    expect(r1).toBe(r2);
  });

  test('Результат искривления находится в диапазоне [0, 1]', () => 
  {
    for (let i = 0; i < 5; i++) 
    {
      const val = Noise.domainWarp2D(i * 0.1, i * 0.2);
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThanOrEqual(1);
    }
  });

  test('Высокая интенсивность значительно меняет структуру шума', () => 
  {
    const x = 10, y = 10;
    const lowWarp = Noise.domainWarp2D(x, y, 1.0);
    const highWarp = Noise.domainWarp2D(x, y, 10.0);
    expect(lowWarp).not.toBe(highWarp);
  });
});


describe('Noise Cellular (Voronoi)', () => 
{
  test('cellular2D возвращает стабильные данные', () => 
  {
    const res1 = Noise.cellular2D(5.5, 5.5);
    const res2 = Noise.cellular2D(5.5, 5.5);
    expect(res1.dist).toBe(res2.dist);
    expect(res1.id).toBe(res2.id);
  });

  test('Расстояние увеличивается при удалении от центра клетки', () => 
  {
    const center = Noise.cellular2D(10, 10);
    const edge = Noise.cellular2D(15, 15);
    expect(edge.dist).toBeGreaterThan(center.dist);
  });

  test('Разные точки имеют разные ID клеток', () => 
  {
    const c1 = Noise.cellular2D(0, 0);
    const c2 = Noise.cellular2D(100, 100);
    expect(c1.id).not.toBe(c2.id);
  });
});