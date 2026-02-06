/**
 * Интерфейс для описания двухмерного вектора
 */
export interface IVector2D 
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
 * Двухмерный вектор.
 * Реализация двухмерного вектора, представляющего собой базовую математическую сущность в двухмерном пространстве.
 */
export class Vector2D implements IVector2D
{
  // #region Const
  /**
   * Единичный вектор.
   */
  public static readonly One: Vector2D = new Vector2D(1, 1);

  /**
   * Вектор "право".
   */
  public static readonly Right: Vector2D = new Vector2D(1, 0);

  /**
   * Вектор "влево".
   */
  public static readonly Left: Vector2D = new Vector2D(-1, 0);

  /**
   * Вектор "вверх".
   */
  public static readonly Up: Vector2D = new Vector2D(0, 1);

  /**
   * Вектор "вниз".
   */
  public static readonly Down: Vector2D = new Vector2D(0, -1);

  /**
   * Нулевой вектор.
   */
  public static readonly Zero: Vector2D = new Vector2D(0, 0);
  // #endregion

  // #region Static methods
  /**
   * Косинус угла между векторами.
   * @param {Vector2D} from - Начальный вектор.
   * @param {Vector2D} to - Конечный вектор.
   * @returns {number} Косинус угла.
   */
  public static cos(from: Vector2D, to: Vector2D): number 
  {
    const dot = from.x * to.x + from.y * to.y;
    const ll = from.length * to.length;
    return dot / ll;
  }

  /**
   * Угол между двумя векторами (в градусах).
   * @param {Vector2D} from - Начальный вектор.
   * @param {Vector2D} to - Конечный вектор.
   * @returns {number} Угол в градусах.
   */
  public static angle(from: Vector2D, to: Vector2D): number 
  {
    const dot = from.x * to.x + from.y * to.y;
    const ll = from.length * to.length;
    const csv = dot / ll;
    return Math.acos(csv) * (180 / Math.PI);
  }

  /**
   * Расстояние между двумя векторами.
   * @param {Vector2D} a - Первый вектор.
   * @param {Vector2D} b - Второй вектор.
   * @returns {number} Расстояние между двумя векторами.
   */
  public static distance(a: Vector2D, b: Vector2D): number 
  {
    const x = b.x - a.x;
    const y = b.y - a.y;
    return Math.sqrt(x * x + y * y);
  }

  /**
   * Скалярное произведение векторов.
   * @param {Vector2D} a - Первый вектор.
   * @param {Vector2D} b - Второй вектор.
   * @returns {number} Скаляр.
   */
  public static dot(a: Vector2D, b: Vector2D): number 
  {
    return a.x * b.x + a.y * b.y;
  }

  /**
   * Линейная интерполяция векторов.
   * @param {Vector2D} from - Начальный вектор.
   * @param {Vector2D} to - Конечный вектор.
   * @param {number} time - Время от 0 до 1.
   * @returns {Vector2D} Интерполированный вектор.
   */
  public static lerp(from: Vector2D, to: Vector2D, time: number): Vector2D 
  {
    return new Vector2D(from.x + (to.x - from.x) * time, from.y + (to.y - from.y) * time);
  }

  /**
   * Негативное значение для вектора.
   * @param {Vector2D} value - Исходный вектор.
   * @returns {Vector2D} Негативный вектор.
   */
  public static negate(value: Vector2D): Vector2D 
  {
    return new Vector2D(-value.x, -value.y);
  }

  /**
   * Максимальное значение из компонентов векторов.
   * @param {Vector2D} a - Первый вектор.
   * @param {Vector2D} b - Второй вектор.
   * @returns {Vector2D} Результирующий вектор.
   */
  public static max(a: Vector2D, b: Vector2D): Vector2D 
  {
    return new Vector2D(a.x > b.x ? a.x : b.x, a.y > b.y ? a.y : b.y);
  }

  /**
   * Минимальное значение из компонентов векторов.
   * @param {Vector2D} a - Первый вектор.
   * @param {Vector2D} b - Второй вектор.
   * @returns {Vector2D} Результирующий вектор.
   */
  public static min(a: Vector2D, b: Vector2D): Vector2D 
  {
    return new Vector2D(a.x < b.x ? a.x : b.x, a.y < b.y ? a.y : b.y);
  }

  /**
   * Отражение вектора относительно нормали.
   * @param {Vector2D} vector - Исходный вектор.
   * @param {Vector2D} normal - Вектор нормали.
   * @returns {Vector2D} Результирующий вектор.
   */
  public static reflect(vector: Vector2D, normal: Vector2D): Vector2D 
  {
    const dot = vector.x * normal.x + vector.y * normal.y;
    return new Vector2D(vector.x - 2.0 * dot * normal.x, vector.y - 2.0 * dot * normal.y);
  }

  /**
   * Аппроксимация равенства значений векторов.
   * @param {Vector2D} a - Первый вектор.
   * @param {Vector2D} b - Второй вектор.
   * @param {number} epsilon - Погрешность.
   * @returns {boolean} Статус равенства значений.
   */
  public static approximately(a: Vector2D, b: Vector2D, epsilon: number = 0.001): boolean 
  {
    return Math.abs(a.x - b.x) < epsilon && Math.abs(a.y - b.y) < epsilon;
  }

  /**
   * Десериализация двухмерного вектора из строки.
   * @param {string} data - Строка данных.
   * @returns {Vector2D} Двухмерный вектор.
   */
  public static deserializeFromString(data: string): Vector2D 
  {
    const vectorData = data.split(';');
    return new Vector2D(parseFloat(vectorData[0]), parseFloat(vectorData[1]));
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
  public get normalized(): Vector2D 
  {
    const invLength = 1 / this.length;
    return new Vector2D(this.x * invLength, this.y * invLength);
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
   * @param {Vector2D} source - Вектор.
   */
  constructor(source: Vector2D);
  constructor(arg1: number | Vector2D, arg2?: number) 
  {
    if (typeof arg1 === 'number' && typeof arg2 === 'number') 
    {
      this.x = arg1;
      this.y = arg2;
    }
    else if (arg1 instanceof Vector2D) 
    {
      this.x = arg1.x;
      this.y = arg1.y;
    }
    else 
    {
      throw new Error('Invalid arguments for Vector2D constructor');
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
   * @param {Vector2D} vector - Вектор.
   * @returns {number} Расстояние до вектора.
   */
  public distance(vector: Vector2D): number 
  {
    const x = vector.x - this.x;
    const y = vector.y - this.y;
    return Math.sqrt(x * x + y * y);
  }

  /**
   * Вычисление скалярного произведения векторов.
   * @param {Vector2D} vector - Вектор.
   * @returns {number} Скалярное произведение векторов.
   */
  public dot(vector: Vector2D): number 
  {
    return this.x * vector.x + this.y * vector.y;
  }

  /**
   * Установка компонентов вектора из наибольших компонентов двух векторов.
   * @param {Vector2D} a - Первый вектор.
   * @param {Vector2D} b - Второй вектор.
   */
  public setMaximize(a: Vector2D, b: Vector2D): void 
  {
    this.x = a.x > b.x ? a.x : b.x;
    this.y = a.y > b.y ? a.y : b.y;
  }

  /**
   * Установка компонентов вектора из наименьших компонентов двух векторов.
   * @param {Vector2D} a - Первый вектор.
   * @param {Vector2D} b - Второй вектор.
   */
  public setMinimize(a: Vector2D, b: Vector2D): void 
  {
    this.x = a.x < b.x ? a.x : b.x;
    this.y = a.y < b.y ? a.y : b.y;
  }

  /**
   * Возвращение перпендикулярного вектора, расположенного против часовой стрелки.
   * @returns {Vector2D} Перпендикулярный вектор.
   */
  public perpToCCW(): Vector2D 
  {
    return new Vector2D(-this.y, this.x);
  }

  /**
   * Возвращение перпендикулярного вектора, расположенного по часовой стрелке.
   * @returns {Vector2D} Перпендикулярный вектор.
   */
  public perpToCW(): Vector2D 
  {
    return new Vector2D(this.y, -this.x);
  }

  /**
   * Возвращение единичного перпендикулярного вектора, расположенного против часовой стрелки.
   * @returns {Vector2D} Перпендикулярный вектор.
   */
  public unitPerpToCCW(): Vector2D 
  {
    return this.perpToCCW().normalized;
  }

  /**
   * Возвращение единичного перпендикулярного вектора, расположенного по часовой стрелке.
   * @returns {Vector2D} Перпендикулярный вектор.
   */
  public unitPerpToCW(): Vector2D 
  {
    return this.perpToCW().normalized;
  }

  /**
   * Возвращение скалярного произведения с перпендикулярным вектором.
   * @param {Vector2D} vector - Вектор.
   * @returns {number} Скалярное произведение с перпендикулярным вектором.
   */
  public dotPerp(vector: Vector2D): number 
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
   * @returns {Vector2D} Вектор.
   */
  public toVector2X(): Vector2D 
  {
    return new Vector2D(this.x, 0);
  }

  /**
   * Преобразование в вектор с нулевой Y-компонентой.
   * @returns {Vector2D} Вектор.
   */
  public toVector2Y(): Vector2D 
  {
    return new Vector2D(0, this.y);
  }

  // Перегрузка операторов (эмуляция)
  /**
   * Сложение векторов.
   * @param {Vector2D} other - Второй вектор.
   * @returns {Vector2D} Сумма векторов.
   */
  public add(other: Vector2D): Vector2D 
  {
    return new Vector2D(this.x + other.x, this.y + other.y);
  }

  /**
   * Вычитание векторов.
   * @param {Vector2D} other - Второй вектор.
   * @returns {Vector2D} Разность векторов.
   */
  public subtract(other: Vector2D): Vector2D 
  {
    return new Vector2D(this.x - other.x, this.y - other.y);
  }

  /**
   * Умножение вектора на скаляр.
   * @param {number} scalar - Скаляр.
   * @returns {Vector2D} Масштабированный вектор.
   */
  public multiply(scalar: number): Vector2D 
  {
    return new Vector2D(this.x * scalar, this.y * scalar);
  }

  /**
   * Деление вектора на скаляр.
   * @param {number} scalar - Скаляр.
   * @returns {Vector2D} Масштабированный вектор.
   */
  public divide(scalar: number): Vector2D 
  {
    return new Vector2D(this.x / scalar, this.y / scalar);
  }

  /**
   * Сравнение векторов на равенство.
   * @param {Vector2D} other - Второй вектор.
   * @returns {boolean} Статус равенства векторов.
   */
  public equals(other: Vector2D): boolean 
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
