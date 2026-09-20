/**
 * Интерфейс для описания двухмерного вектора
 */
export interface IVector2 
{
  /**
   * Координата X
   */
  x: number;

  /**
   * Координата Y
   */
  y: number;
}

/**
 * Константы для двухмерных векторов.
 */
export const Vector2Constants =
{
  /**
   * Единичный вектор.
   */
  One: { x: 1, y: 1 } as const,
  /**
   * Вектор "право".
   */
  Right: { x: 1, y: 0 } as const,
  /**
   * Вектор "влево".
   */
  Left: { x: -1, y: 0 } as const,
  /**
   * Вектор "вверх".
   */
  Up: { x: 0, y: 1 } as const,
  /**
   * Вектор "вниз".
   */
  Down: { x: 0, y: -1 } as const,
  /**
   * Нулевой вектор.
   */
  Zero: { x: 0, y: 0 } as const
} as const satisfies Record<string, IVector2>;

/**
 * Двухмерный вектор.
 * Реализация двухмерного вектора, представляющего собой базовую математическую сущность в двухмерном пространстве.
 */
export class Vector2 implements IVector2
{
  // #region Const
  /**
   * Единичный вектор.
   */
  public static readonly One: Vector2 = new Vector2(1, 1);

  /**
   * Вектор "право".
   */
  public static readonly Right: Vector2 = new Vector2(1, 0);

  /**
   * Вектор "влево".
   */
  public static readonly Left: Vector2 = new Vector2(-1, 0);

  /**
   * Вектор "вверх".
   */
  public static readonly Up: Vector2 = new Vector2(0, 1);

  /**
   * Вектор "вниз".
   */
  public static readonly Down: Vector2 = new Vector2(0, -1);

  /**
   * Нулевой вектор.
   */
  public static readonly Zero: Vector2 = new Vector2(0, 0);
  // #endregion

  // #region Static methods
  /**
   * Косинус угла между векторами.
   * @param {Vector2} from - Начальный вектор.
   * @param {Vector2} to - Конечный вектор.
   * @returns {number} Косинус угла.
   */
  public static cos(from: Vector2, to: Vector2): number 
  {
    const dot = from.x * to.x + from.y * to.y;
    const ll = from.length * to.length;
    return dot / ll;
  }

  /**
   * Угол между двумя векторами (в градусах).
   * @param {Vector2} from - Начальный вектор.
   * @param {Vector2} to - Конечный вектор.
   * @returns {number} Угол в градусах.
   */
  public static angle(from: Vector2, to: Vector2): number 
  {
    const dot = from.x * to.x + from.y * to.y;
    const ll = from.length * to.length;
    const csv = dot / ll;
    return Math.acos(csv) * (180 / Math.PI);
  }

  /**
   * Расстояние между двумя векторами.
   * @param {Vector2} a - Первый вектор.
   * @param {Vector2} b - Второй вектор.
   * @returns {number} Расстояние между двумя векторами.
   */
  public static distance(a: Vector2, b: Vector2): number 
  {
    const x = b.x - a.x;
    const y = b.y - a.y;
    return Math.sqrt(x * x + y * y);
  }

  /**
   * Скалярное произведение векторов.
   * @param {Vector2} a - Первый вектор.
   * @param {Vector2} b - Второй вектор.
   * @returns {number} Скаляр.
   */
  public static dot(a: Vector2, b: Vector2): number 
  {
    return a.x * b.x + a.y * b.y;
  }

  /**
   * Линейная интерполяция векторов.
   * @param {Vector2} from - Начальный вектор.
   * @param {Vector2} to - Конечный вектор.
   * @param {number} time - Время от 0 до 1.
   * @returns {Vector2} Интерполированный вектор.
   */
  public static lerp(from: Vector2, to: Vector2, time: number): Vector2 
  {
    return new Vector2(from.x + (to.x - from.x) * time, from.y + (to.y - from.y) * time);
  }

  /**
   * Негативное значение для вектора.
   * @param {Vector2} value - Исходный вектор.
   * @returns {Vector2} Негативный вектор.
   */
  public static negate(value: Vector2): Vector2 
  {
    return new Vector2(-value.x, -value.y);
  }

  /**
   * Максимальное значение из компонентов векторов.
   * @param {Vector2} a - Первый вектор.
   * @param {Vector2} b - Второй вектор.
   * @returns {Vector2} Результирующий вектор.
   */
  public static max(a: Vector2, b: Vector2): Vector2 
  {
    return new Vector2(a.x > b.x ? a.x : b.x, a.y > b.y ? a.y : b.y);
  }

  /**
   * Минимальное значение из компонентов векторов.
   * @param {Vector2} a - Первый вектор.
   * @param {Vector2} b - Второй вектор.
   * @returns {Vector2} Результирующий вектор.
   */
  public static min(a: Vector2, b: Vector2): Vector2 
  {
    return new Vector2(a.x < b.x ? a.x : b.x, a.y < b.y ? a.y : b.y);
  }

  /**
   * Отражение вектора относительно нормали.
   * @param {Vector2} vector - Исходный вектор.
   * @param {Vector2} normal - Вектор нормали.
   * @returns {Vector2} Результирующий вектор.
   */
  public static reflect(vector: Vector2, normal: Vector2): Vector2 
  {
    const dot = vector.x * normal.x + vector.y * normal.y;
    return new Vector2(vector.x - 2.0 * dot * normal.x, vector.y - 2.0 * dot * normal.y);
  }

  /**
   * Аппроксимация равенства значений векторов.
   * @param {Vector2} a - Первый вектор.
   * @param {Vector2} b - Второй вектор.
   * @param {number} epsilon - Погрешность.
   * @returns {boolean} Статус равенства значений.
   */
  public static approximately(a: Vector2, b: Vector2, epsilon: number = 0.001): boolean 
  {
    return Math.abs(a.x - b.x) < epsilon && Math.abs(a.y - b.y) < epsilon;
  }

  /**
   * Десериализация двухмерного вектора из строки.
   * @param {string} data - Строка данных.
   * @returns {Vector2} Двухмерный вектор.
   */
  public static deserializeFromString(data: string): Vector2 
  {
    const vectorData = data.split(';');
    return new Vector2(parseFloat(vectorData[0]), parseFloat(vectorData[1]));
  }
  // #endregion

  // #region Fields
  public x: number;
  public y: number;
  // #endregion

  // #region Properties
  /**
   * Квадрат длины вектора.
   */
  public get sqrLength(): number 
  {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Длина вектора.
   */
  public get length(): number 
  {
    return Math.sqrt(this.sqrLength);
  }

  /**
   * Нормализованный вектор.
   */
  public get normalized(): Vector2 
  {
    const invLength = 1 / this.length;
    return new Vector2(this.x * invLength, this.y * invLength);
  }
  // #endregion

  // #region Constructor
  /**
   * Конструктор инициализирует вектор указанными параметрами.
   * @param {number} x - X-координата.
   * @param {number} y - Y-координата.
   */
  constructor(x: number, y: number);
  /**
   * Конструктор инициализирует вектор указанным вектором.
   * @param {Vector2} source - Вектор.
   */
  constructor(source: Vector2);
  constructor(arg1: number | Vector2, arg2?: number) 
  {
    if (typeof arg1 === 'number' && typeof arg2 === 'number') 
    {
      this.x = arg1;
      this.y = arg2;
    }
    else if (arg1 instanceof Vector2) 
    {
      this.x = arg1.x;
      this.y = arg1.y;
    }
    else 
    {
      throw new Error('Invalid arguments for Vector2 constructor');
    }
  }
  // #endregion

  // #region Main methods
  /**
   * Нормализация вектора.
   */
  public normalize(): void 
  {
    const invLength = 1 / this.length;
    this.x *= invLength;
    this.y *= invLength;
  }

  /**
   * Вычисление расстояния до вектора.
   * @param {Vector2} vector - Вектор.
   * @returns {number} Расстояние до вектора.
   */
  public distance(vector: Vector2): number 
  {
    const x = vector.x - this.x;
    const y = vector.y - this.y;
    return Math.sqrt(x * x + y * y);
  }

  /**
   * Вычисление скалярного произведения векторов.
   * @param {Vector2} vector - Вектор.
   * @returns {number} Скалярное произведение векторов.
   */
  public dot(vector: Vector2): number 
  {
    return this.x * vector.x + this.y * vector.y;
  }

  /**
   * Установка компонентов вектора из наибольших компонентов двух векторов.
   * @param {Vector2} a - Первый вектор.
   * @param {Vector2} b - Второй вектор.
   */
  public setMaximize(a: Vector2, b: Vector2): void 
  {
    this.x = a.x > b.x ? a.x : b.x;
    this.y = a.y > b.y ? a.y : b.y;
  }

  /**
   * Установка компонентов вектора из наименьших компонентов двух векторов.
   * @param {Vector2} a - Первый вектор.
   * @param {Vector2} b - Второй вектор.
   */
  public setMinimize(a: Vector2, b: Vector2): void 
  {
    this.x = a.x < b.x ? a.x : b.x;
    this.y = a.y < b.y ? a.y : b.y;
  }

  /**
   * Возвращение перпендикулярного вектора, расположенного против часовой стрелки.
   * @returns {Vector2} Перпендикулярный вектор.
   */
  public perpToCCW(): Vector2 
  {
    return new Vector2(-this.y, this.x);
  }

  /**
   * Возвращение перпендикулярного вектора, расположенного по часовой стрелке.
   * @returns {Vector2} Перпендикулярный вектор.
   */
  public perpToCW(): Vector2 
  {
    return new Vector2(this.y, -this.x);
  }

  /**
   * Возвращение единичного перпендикулярного вектора, расположенного против часовой стрелки.
   * @returns {Vector2} Перпендикулярный вектор.
   */
  public unitPerpToCCW(): Vector2 
  {
    return this.perpToCCW().normalized;
  }

  /**
   * Возвращение единичного перпендикулярного вектора, расположенного по часовой стрелке.
   * @returns {Vector2} Перпендикулярный вектор.
   */
  public unitPerpToCW(): Vector2 
  {
    return this.perpToCW().normalized;
  }

  /**
   * Возвращение скалярного произведения с перпендикулярным вектором.
   * @param {Vector2} vector - Вектор.
   * @returns {number} Скалярное произведение с перпендикулярным вектором.
   */
  public dotPerp(vector: Vector2): number 
  {
    return this.x * vector.y - this.y * vector.x;
  }

  /**
   * Сериализация вектора в строку.
   * @returns {string} Строка данных.
   */
  public serializeToString(): string 
  {
    return `${this.x};${this.y}`;
  }

  /**
   * Преобразование в вектор с нулевой X-компонентой.
   * @returns {Vector2} Вектор.
   */
  public toVector2X(): Vector2 
  {
    return new Vector2(this.x, 0);
  }

  /**
   * Преобразование в вектор с нулевой Y-компонентой.
   * @returns {Vector2} Вектор.
   */
  public toVector2Y(): Vector2 
  {
    return new Vector2(0, this.y);
  }

  // Перегрузка операторов (эмуляция)
  /**
   * Сложение векторов.
   * @param {Vector2} other - Второй вектор.
   * @returns {Vector2} Сумма векторов.
   */
  public add(other: Vector2): Vector2 
  {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  /**
   * Вычитание векторов.
   * @param {Vector2} other - Второй вектор.
   * @returns {Vector2} Разность векторов.
   */
  public subtract(other: Vector2): Vector2 
  {
    return new Vector2(this.x - other.x, this.y - other.y);
  }

  /**
   * Умножение вектора на скаляр.
   * @param {number} scalar - Скаляр.
   * @returns {Vector2} Масштабированный вектор.
   */
  public multiply(scalar: number): Vector2 
  {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  /**
   * Деление вектора на скаляр.
   * @param {number} scalar - Скаляр.
   * @returns {Vector2} Масштабированный вектор.
   */
  public divide(scalar: number): Vector2 
  {
    return new Vector2(this.x / scalar, this.y / scalar);
  }

  /**
   * Сравнение векторов на равенство.
   * @param {Vector2} other - Второй вектор.
   * @returns {boolean} Статус равенства векторов.
   */
  public equals(other: Vector2): boolean 
  {
    return this.x === other.x && this.y === other.y;
  }

  /**
   * Преобразование к текстовому представлению.
   * @returns {string} Текстовое представление вектора.
   */
  public toString(): string 
  {
    return `X = ${this.x.toFixed(2)}; Y = ${this.y.toFixed(2)}`;
  }
  // #endregion
}
