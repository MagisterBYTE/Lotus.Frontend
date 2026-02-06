import { Vector2D } from '../geometry2D';

/**
 * Интерфейс для описания трехмерного вектора
 */
export interface IVector3D
{
  /**
   * Координата X
   */
  x: number;

  /**
   * Координата Y
   */
  y: number;

  /**
   * Координата Z
   */
  z: number;
}

/**
 * Трехмерный вектор.
 * Реализация трехмерного вектора, представляющего собой базовую математическую сущность в трехмерном пространстве.
 */
export class Vector3D implements IVector3D
{
  // #region Const
  /**
   * Единичный вектор.
   */
  public static readonly One: Vector3D = new Vector3D(1, 1, 1);

  /**
   * Вектор - право.
   */
  public static readonly Right: Vector3D = new Vector3D(1, 0, 0);

  /**
   * Вектор - влево.
   */
  public static readonly Left: Vector3D = new Vector3D(-1, 0, 0);

  /**
   * Вектор - вверх.
   */
  public static readonly Up: Vector3D = new Vector3D(0, 1, 0);

  /**
   * Вектор - вниз.
   */
  public static readonly Down: Vector3D = new Vector3D(0, -1, 0);

  /**
   * Вектор - вперед.
   */
  public static readonly Forward: Vector3D = new Vector3D(0, 0, 1);

  /**
   * Вектор - назад.
   */
  public static readonly Back: Vector3D = new Vector3D(0, 0, -1);

  /**
   * Нулевой вектор.
   */
  public static readonly Zero: Vector3D = new Vector3D(0, 0, 0);

  /**
   * Текстовый формат отображения параметров вектора.
   */
  public static toStringFormat: string = 'X = {0}; Y = {1}; Z = {2}';

  /**
   * Текстовый формат отображения только значений параметров вектора.
   */
  public static toStringFormatValue: string = '{0}; {1}; {2}';
  // #endregion

  // #region Static methods
  /**
   * Сложение векторов.
   * @param {Vector3D} a - Первый вектор.
   * @param {Vector3D} b - Второй вектор.
   * @returns {Vector3D} Результирующий вектор.
   */
  public static add(a: Vector3D, b: Vector3D): Vector3D
  {
    return new Vector3D(a.x + b.x, a.y + b.y, a.z + b.z);
  }

  /**
   * Разность векторов.
   * @param {Vector3D} a - Первый вектор.
   * @param {Vector3D} b - Второй вектор.
   * @returns {Vector3D} Результирующий вектор.
   */
  public static subtract(a: Vector3D, b: Vector3D): Vector3D
  {
    return new Vector3D(a.x - b.x, a.y - b.y, a.z - b.z);
  }

  /**
   * Косинус угла между векторами.
   * @param {Vector3D} from - Начальный вектор.
   * @param {Vector3D} to - Конечный вектор.
   * @returns {number} Косинус угла.
   */
  public static cos(from: Vector3D, to: Vector3D): number
  {
    const dot = from.x * to.x + from.y * to.y + from.z * to.z;
    const ll = from.length * to.length;
    return dot / ll;
  }

  /**
   * Угол между двумя векторами (в градусах).
   * @param {Vector3D} from - Начальный вектор.
   * @param {Vector3D} to - Конечный вектор.
   * @returns {number} Угол в градусах.
   */
  public static angle(from: Vector3D, to: Vector3D): number
  {
    const dot = from.x * to.x + from.y * to.y + from.z * to.z;
    const ll = from.length * to.length;
    const csv = dot / ll;
    return Math.acos(csv) * (180 / Math.PI);
  }

  /**
   * Расстояние между двумя векторами.
   * @param {Vector3D} a - Первый вектор.
   * @param {Vector3D} b - Второй вектор.
   * @returns {number} Расстояние между двумя векторами.
   */
  public static distance(a: Vector3D, b: Vector3D): number
  {
    const x = b.x - a.x;
    const y = b.y - a.y;
    const z = b.z - a.z;
    return Math.sqrt(x * x + y * y + z * z);
  }

  /**
   * Скалярное произведение векторов.
   * @param {Vector3D} a - Первый вектор.
   * @param {Vector3D} b - Второй вектор.
   * @returns {number} Скаляр.
   */
  public static dot(a: Vector3D, b: Vector3D): number
  {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  /**
   * Векторное произведение векторов.
   * @param {Vector3D} left - Левый вектор.
   * @param {Vector3D} right - Правый вектор.
   * @returns {Vector3D} Вектор, перпендикулярный обоим векторам.
   */
  public static cross(left: Vector3D, right: Vector3D): Vector3D
  {
    return new Vector3D(left.y * right.z - left.z * right.y, left.z * right.x - left.x * right.z, left.x * right.y - left.y * right.x);
  }

  /**
   * Линейная интерполяция векторов.
   * @param {Vector3D} from - Начальный вектор.
   * @param {Vector3D} to - Конечный вектор.
   * @param {number} time - Время от 0 до 1.
   * @returns {Vector3D} Интерполированный вектор.
   */
  public static lerp(from: Vector3D, to: Vector3D, time: number): Vector3D
  {
    return new Vector3D(from.x + (to.x - from.x) * time, from.y + (to.y - from.y) * time, from.z + (to.z - from.z) * time);
  }

  /**
   * Десериализация трехмерного вектора из строки.
   * @param {string} data - Строка данных.
   * @returns {Vector3D} Трехмерный вектор.
   */
  public static deserializeFromString(data: string): Vector3D
  {
    const vectorData = data.split(';');
    return new Vector3D(parseFloat(vectorData[0]), parseFloat(vectorData[1]), parseFloat(vectorData[2]));
  }
  // #endregion

  // #region Fields
  public x: number;
  public y: number;
  public z: number;
  // #endregion

  // #region Properties
  /**
   * Квадрат длины вектора.
   */
  public get sqrLength(): number
  {
    return this.x * this.x + this.y * this.y + this.z * this.z;
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
  public get normalized(): Vector3D
  {
    const invLength = 1 / this.length;
    return new Vector3D(this.x * invLength, this.y * invLength, this.z * invLength);
  }
  // #endregion

  // #region Constructors
  /**
   * Конструктор инициализирует вектор указанными параметрами.
   * @param {number} x - X-координата.
   * @param {number} y - Y-координата.
   * @param {number} z - Z-координата.
   */
  constructor(x: number, y: number, z: number);

  /**
   * Конструктор инициализирует вектор указанным вектором.
   * @param {Vector3D} source - Вектор.
   */
  constructor(source: Vector3D);

  constructor(arg1: number | Vector3D, arg2?: number, arg3?: number)
  {
    if (arg1 instanceof Vector3D)
    {
      this.x = arg1.x;
      this.y = arg1.y;
      this.z = arg1.z;
    }
    else if (typeof arg1 === 'number' && typeof arg2 === 'number' && typeof arg3 === 'number')
    {
      this.x = arg1;
      this.y = arg2;
      this.z = arg3;
    }
    else
    {
      throw new Error('Invalid arguments for Vector3D constructor');
    }
  }
  // #endregion

  // #region System methods
  /**
   * Проверка равенства векторов по значению.
   * @param {Vector3D} other - Сравниваемый вектор.
   * @returns {boolean} Статус равенства векторов.
   */
  public equals(other: Vector3D): boolean
  {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }

  /**
   * Сравнение векторов для упорядочивания.
   * @param {Vector3D} other - Вектор.
   * @returns {number} Статус сравнения векторов.
   */
  public compareTo(other: Vector3D): number
  {
    if (this.x > other.x)
    {
      return 1;
    }
    else if (this.x === other.x && this.y > other.y)
    {
      return 1;
    }
    else if (this.x === other.x && this.y === other.y && this.z > other.z)
    {
      return 1;
    }
    else if (this.x === other.x && this.y === other.y && this.z === other.z)
    {
      return 0;
    }
    else
    {
      return -1;
    }
  }

  /**
   * Преобразование к текстовому представлению.
   * @returns {string} Текстовое представление вектора с указанием значений координат.
   */
  public toString(): string
  {
    return `X = ${this.x.toFixed(2)}; Y = ${this.y.toFixed(2)}; Z = ${this.z.toFixed(2)}`;
  }

  /**
   * Преобразование к текстовому представлению с заданным форматом.
   * @param {string} format - Формат отображения компонентов вектора.
   * @returns {string} Текстовое представление вектора с указанием значений координат.
   */
  public toStringWithFormat(format: string): string
  {
    const formattedFormat = Vector3D.toStringFormat.replace('{0}', format).replace('{1}', format).replace('{2}', format);
    return formattedFormat.replace('{0}', this.x.toFixed(2)).replace('{1}', this.y.toFixed(2)).replace('{2}', this.z.toFixed(2));
  }

  /**
   * Преобразование к текстовому представлению только значений.
   * @returns {string} Текстовое представление вектора с указанием значений координат.
   */
  public toStringValue(): string
  {
    return `${this.x.toFixed(2)}; ${this.y.toFixed(2)}; ${this.z.toFixed(2)}`;
  }

  /**
   * Преобразование к текстовому представлению только значений с заданным форматом.
   * @param {string} format - Формат отображения компонентов вектора.
   * @returns {string} Текстовое представление вектора с указанием значений координат.
   */
  public toStringValueWithFormat(format: string): string
  {
    const formattedFormat = Vector3D.toStringFormatValue.replace('{0}', format).replace('{1}', format).replace('{2}', format);
    return formattedFormat.replace('{0}', this.x.toFixed(2)).replace('{1}', this.y.toFixed(2)).replace('{2}', this.z.toFixed(2));
  }
  // #endregion

  // #region Operators
  /**
   * Сложение векторов.
   * @param {Vector3D} other - Второй вектор.
   * @returns {Vector3D} Сумма векторов.
   */
  public add(other: Vector3D): Vector3D
  {
    return Vector3D.add(this, other);
  }

  /**
   * Вычитание векторов.
   * @param {Vector3D} other - Второй вектор.
   * @returns {Vector3D} Разность векторов.
   */
  public subtract(other: Vector3D): Vector3D
  {
    return Vector3D.subtract(this, other);
  }

  /**
   * Умножение вектора на скаляр.
   * @param {number} scalar - Скаляр.
   * @returns {Vector3D} Масштабированный вектор.
   */
  public multiply(scalar: number): Vector3D
  {
    return new Vector3D(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  /**
   * Деление вектора на скаляр.
   * @param {number} scalar - Скаляр.
   * @returns {Vector3D} Масштабированный вектор.
   */
  public divide(scalar: number): Vector3D
  {
    const invScalar = 1 / scalar;
    return new Vector3D(this.x * invScalar, this.y * invScalar, this.z * invScalar);
  }

  /**
   * Скалярное произведение векторов.
   * @param {Vector3D} other - Второй вектор.
   * @returns {number} Скаляр.
   */
  public dot(other: Vector3D): number
  {
    return Vector3D.dot(this, other);
  }

  /**
   * Векторное произведение векторов.
   * @param {Vector3D} other - Второй вектор.
   * @returns {Vector3D} Вектор, перпендикулярный обоим векторам.
   */
  public cross(other: Vector3D): Vector3D
  {
    return Vector3D.cross(this, other);
  }

  /**
   * Сравнение векторов на равенство.
   * @param {Vector3D} other - Второй вектор.
   * @returns {boolean} Статус равенства векторов.
   */
  public isEqual(other: Vector3D): boolean
  {
    return this.equals(other);
  }

  /**
   * Сравнение векторов на неравенство.
   * @param {Vector3D} other - Второй вектор.
   * @returns {boolean} Статус неравенства векторов.
   */
  public isNotEqual(other: Vector3D): boolean
  {
    return !this.equals(other);
  }

  /**
   * Реализация лексикографического порядка отношений векторов (меньше).
   * @param {Vector3D} other - Второй вектор.
   * @returns {boolean} Статус меньше.
   */
  public isLessThan(other: Vector3D): boolean
  {
    return this.x < other.x || (this.x === other.x && this.y < other.y) || (this.x === other.x && this.y === other.y && this.z < other.z);
  }

  /**
   * Реализация лексикографического порядка отношений векторов (больше).
   * @param {Vector3D} other - Второй вектор.
   * @returns {boolean} Статус больше.
   */
  public isGreaterThan(other: Vector3D): boolean
  {
    return this.x > other.x || (this.x === other.x && this.y > other.y) || (this.x === other.x && this.y === other.y && this.z > other.z);
  }

  /**
   * Обратный вектор.
   * @returns {Vector3D} Обратный вектор.
   */
  public negate(): Vector3D
  {
    return new Vector3D(-this.x, -this.y, -this.z);
  }
  // #endregion

  // #region Indexer
  /**
   * Индексация компонентов вектора на основе индекса.
   * @param {number} index - Индекс компонента.
   * @returns {number} Компонента вектора.
   */
  public getComponent(index: number): number
  {
    switch (index)
    {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error('Invalid index for Vector3D component');
    }
  }

  /**
   * Установка компонента вектора по индексу.
   * @param {number} index - Индекс компонента.
   * @param {number} value - Значение компонента.
   */
  public setComponent(index: number, value: number): void
  {
    switch (index)
    {
      case 0:
        this.x = value;
        break;
      case 1:
        this.y = value;
        break;
      case 2:
        this.z = value;
        break;
      default:
        throw new Error('Invalid index for Vector3D component');
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
    this.z *= invLength;
  }

  /**
   * Вычисление расстояния до вектора.
   * @param {Vector3D} vector - Вектор.
   * @returns {number} Расстояние до вектора.
   */
  public distance(vector: Vector3D): number
  {
    return Vector3D.distance(this, vector);
  }

  /**
   * Установка компонентов вектора из наибольших компонентов двух векторов.
   * @param {Vector3D} a - Первый вектор.
   * @param {Vector3D} b - Второй вектор.
   */
  public setMaximize(a: Vector3D, b: Vector3D): void
  {
    this.x = a.x > b.x ? a.x : b.x;
    this.y = a.y > b.y ? a.y : b.y;
    this.z = a.z > b.z ? a.z : b.z;
  }

  /**
   * Установка компонентов вектора из наименьших компонентов двух векторов.
   * @param {Vector3D} a - Первый вектор.
   * @param {Vector3D} b - Второй вектор.
   */
  public setMinimize(a: Vector3D, b: Vector3D): void
  {
    this.x = a.x < b.x ? a.x : b.x;
    this.y = a.y < b.y ? a.y : b.y;
    this.z = a.z < b.z ? a.z : b.z;
  }

  /**
   * Векторное произведение с нормализацией результата.
   * @param {Vector3D} left - Левый вектор.
   * @param {Vector3D} right - Правый вектор.
   */
  public crossNormalize(left: Vector3D, right: Vector3D): void
  {
    this.x = left.y * right.z - left.z * right.y;
    this.y = left.z * right.x - left.x * right.z;
    this.z = left.x * right.y - left.y * right.x;
    const invLength = 1 / this.length;
    this.x *= invLength;
    this.y *= invLength;
    this.z *= invLength;
  }

  /**
   * Сериализация вектора в строку.
   * @returns {string} Строка данных.
   */
  public serializeToString(): string
  {
    return `${this.x};${this.y};${this.z}`;
  }
  // #endregion

  // #region Convert methods
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

  /**
   * Преобразование в двухмерный вектор плоскости XY.
   * @returns {Vector2D} Вектор.
   */
  public toVector2XY(): Vector2D
  {
    return new Vector2D(this.x, this.y);
  }

  /**
   * Преобразование в двухмерный вектор плоскости XZ.
   * @returns {Vector2D} Вектор.
   */
  public toVector2XZ(): Vector2D
  {
    return new Vector2D(this.x, this.z);
  }

  /**
   * Преобразование в двухмерный вектор плоскости YZ.
   * @returns {Vector2D} Вектор.
   */
  public toVector2YZ(): Vector2D
  {
    return new Vector2D(this.y, this.z);
  }

  /**
   * Преобразование в трехмерный вектор только с компонентой X.
   * @returns {Vector3D} Вектор.
   */
  public toVector3X(): Vector3D
  {
    return new Vector3D(this.x, 0, 0);
  }

  /**
   * Преобразование в трехмерный вектор только с компонентой Y.
   * @returns {Vector3D} Вектор.
   */
  public toVector3Y(): Vector3D
  {
    return new Vector3D(0, this.y, 0);
  }

  /**
   * Преобразование в трехмерный вектор только с компонентой Z.
   * @returns {Vector3D} Вектор.
   */
  public toVector3Z(): Vector3D
  {
    return new Vector3D(0, 0, this.z);
  }

  /**
   * Преобразование в трехмерный вектор плоскости XY.
   * @returns {Vector3D} Вектор.
   */
  public toVector3XY(): Vector3D
  {
    return new Vector3D(this.x, this.y, 0);
  }

  /**
   * Преобразование в трехмерный вектор плоскости XZ.
   * @returns {Vector3D} Вектор.
   */
  public toVector3XZ(): Vector3D
  {
    return new Vector3D(this.x, 0, this.z);
  }

  /**
   * Преобразование в трехмерный вектор плоскости YZ.
   * @returns {Vector3D} Вектор.
   */
  public toVector3YZ(): Vector3D
  {
    return new Vector3D(0, this.y, this.z);
  }
  // #endregion
}

