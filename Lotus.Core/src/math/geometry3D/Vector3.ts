import { XMath } from '../XMath';
import { Vector2 } from '../geometry2D';

/**
 * Интерфейс для описания трехмерного вектора
 */
export interface IVector3
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
export class Vector3 implements IVector3
{
  // #region Const
  /**
   * Единичный вектор.
   */
  public static readonly One: Vector3 = new Vector3(1, 1, 1);

  /**
   * Вектор - право.
   */
  public static readonly Right: Vector3 = new Vector3(1, 0, 0);

  /**
   * Вектор - влево.
   */
  public static readonly Left: Vector3 = new Vector3(-1, 0, 0);

  /**
   * Вектор - вверх.
   */
  public static readonly Up: Vector3 = new Vector3(0, 1, 0);

  /**
   * Вектор - вниз.
   */
  public static readonly Down: Vector3 = new Vector3(0, -1, 0);

  /**
   * Вектор - вперед.
   */
  public static readonly Forward: Vector3 = new Vector3(0, 0, 1);

  /**
   * Вектор - назад.
   */
  public static readonly Back: Vector3 = new Vector3(0, 0, -1);

  /**
   * Нулевой вектор.
   */
  public static readonly Zero: Vector3 = new Vector3(0, 0, 0);

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
   * @param {Vector3} a - Первый вектор.
   * @param {Vector3} b - Второй вектор.
   * @returns {Vector3} Результирующий вектор.
   */
  public static add(a: Vector3, b: Vector3): Vector3
  {
    return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
  }

  /**
   * Разность векторов.
   * @param {Vector3} a - Первый вектор.
   * @param {Vector3} b - Второй вектор.
   * @returns {Vector3} Результирующий вектор.
   */
  public static subtract(a: Vector3, b: Vector3): Vector3
  {
    return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
  }

  /**
   * Косинус угла между векторами.
   * @param {Vector3} from - Начальный вектор.
   * @param {Vector3} to - Конечный вектор.
   * @returns {number} Косинус угла.
   */
  public static cos(from: Vector3, to: Vector3): number
  {
    const dot = from.x * to.x + from.y * to.y + from.z * to.z;
    const ll = from.length * to.length;
    return dot / ll;
  }

  /**
   * Угол между двумя векторами (в градусах).
   * @param {Vector3} from - Начальный вектор.
   * @param {Vector3} to - Конечный вектор.
   * @returns {number} Угол в градусах.
   */
  public static angle(from: Vector3, to: Vector3): number
  {
    const dot = from.x * to.x + from.y * to.y + from.z * to.z;
    const ll = from.length * to.length;
    const csv = dot / ll;
    return Math.acos(csv) * (180 / Math.PI);
  }

  /**
   * Поворот вектора вокруг оси Y.
   * @param {Vector3} vector - Вектор.
   * @param {number} degrees - Угол поворота в градусах.
   * @returns {Vector3} Повернутый вектор.
   */
  public static rotateY(vector: IVector3, degrees: number): IVector3
  {
    const angle = XMath.toRadians(degrees);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: vector.x * cos + vector.z * sin,
      y: vector.y,
      z: -vector.x * sin + vector.z * cos
    };
  }

  /**
   * Расстояние между двумя векторами.
   * @param {Vector3} a - Первый вектор.
   * @param {Vector3} b - Второй вектор.
   * @returns {number} Расстояние между двумя векторами.
   */
  public static distance(a: Vector3, b: Vector3): number
  {
    const x = b.x - a.x;
    const y = b.y - a.y;
    const z = b.z - a.z;
    return Math.sqrt(x * x + y * y + z * z);
  }

  /**
   * Скалярное произведение векторов.
   * @param {Vector3} a - Первый вектор.
   * @param {Vector3} b - Второй вектор.
   * @returns {number} Скаляр.
   */
  public static dot(a: Vector3, b: Vector3): number
  {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  /**
   * Векторное произведение векторов.
   * @param {Vector3} left - Левый вектор.
   * @param {Vector3} right - Правый вектор.
   * @returns {Vector3} Вектор, перпендикулярный обоим векторам.
   */
  public static cross(left: Vector3, right: Vector3): Vector3
  {
    return new Vector3(left.y * right.z - left.z * right.y, left.z * right.x - left.x * right.z, left.x * right.y - left.y * right.x);
  }

  /**
   * Линейная интерполяция векторов.
   * @param {Vector3} from - Начальный вектор.
   * @param {Vector3} to - Конечный вектор.
   * @param {number} time - Время от 0 до 1.
   * @returns {Vector3} Интерполированный вектор.
   */
  public static lerp(from: Vector3, to: Vector3, time: number): Vector3
  {
    return new Vector3(from.x + (to.x - from.x) * time, from.y + (to.y - from.y) * time, from.z + (to.z - from.z) * time);
  }

  /**
   * Десериализация трехмерного вектора из строки.
   * @param {string} data - Строка данных.
   * @returns {Vector3} Трехмерный вектор.
   */
  public static deserializeFromString(data: string): Vector3
  {
    const vectorData = data.split(';');
    return new Vector3(parseFloat(vectorData[0]), parseFloat(vectorData[1]), parseFloat(vectorData[2]));
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
  public get normalized(): Vector3
  {
    const invLength = 1 / this.length;
    return new Vector3(this.x * invLength, this.y * invLength, this.z * invLength);
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
   * @param {Vector3} source - Вектор.
   */
  constructor(source: Vector3);

  constructor(arg1: number | Vector3, arg2?: number, arg3?: number)
  {
    if (arg1 instanceof Vector3)
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
      throw new Error('Invalid arguments for Vector3 constructor');
    }
  }
  // #endregion

  // #region System methods
  /**
   * Проверка равенства векторов по значению.
   * @param {Vector3} other - Сравниваемый вектор.
   * @returns {boolean} Статус равенства векторов.
   */
  public equals(other: Vector3): boolean
  {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }

  /**
   * Сравнение векторов для упорядочивания.
   * @param {Vector3} other - Вектор.
   * @returns {number} Статус сравнения векторов.
   */
  public compareTo(other: Vector3): number
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
    const formattedFormat = Vector3.toStringFormat.replace('{0}', format).replace('{1}', format).replace('{2}', format);
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
    const formattedFormat = Vector3.toStringFormatValue.replace('{0}', format).replace('{1}', format).replace('{2}', format);
    return formattedFormat.replace('{0}', this.x.toFixed(2)).replace('{1}', this.y.toFixed(2)).replace('{2}', this.z.toFixed(2));
  }
  // #endregion

  // #region Operators
  /**
   * Сложение векторов.
   * @param {Vector3} other - Второй вектор.
   * @returns {Vector3} Сумма векторов.
   */
  public add(other: Vector3): Vector3
  {
    return Vector3.add(this, other);
  }

  /**
   * Вычитание векторов.
   * @param {Vector3} other - Второй вектор.
   * @returns {Vector3} Разность векторов.
   */
  public subtract(other: Vector3): Vector3
  {
    return Vector3.subtract(this, other);
  }

  /**
   * Умножение вектора на скаляр.
   * @param {number} scalar - Скаляр.
   * @returns {Vector3} Масштабированный вектор.
   */
  public multiply(scalar: number): Vector3
  {
    return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  /**
   * Деление вектора на скаляр.
   * @param {number} scalar - Скаляр.
   * @returns {Vector3} Масштабированный вектор.
   */
  public divide(scalar: number): Vector3
  {
    const invScalar = 1 / scalar;
    return new Vector3(this.x * invScalar, this.y * invScalar, this.z * invScalar);
  }

  /**
   * Скалярное произведение векторов.
   * @param {Vector3} other - Второй вектор.
   * @returns {number} Скаляр.
   */
  public dot(other: Vector3): number
  {
    return Vector3.dot(this, other);
  }

  /**
   * Векторное произведение векторов.
   * @param {Vector3} other - Второй вектор.
   * @returns {Vector3} Вектор, перпендикулярный обоим векторам.
   */
  public cross(other: Vector3): Vector3
  {
    return Vector3.cross(this, other);
  }

  /**
   * Сравнение векторов на равенство.
   * @param {Vector3} other - Второй вектор.
   * @returns {boolean} Статус равенства векторов.
   */
  public isEqual(other: Vector3): boolean
  {
    return this.equals(other);
  }

  /**
   * Сравнение векторов на неравенство.
   * @param {Vector3} other - Второй вектор.
   * @returns {boolean} Статус неравенства векторов.
   */
  public isNotEqual(other: Vector3): boolean
  {
    return !this.equals(other);
  }

  /**
   * Реализация лексикографического порядка отношений векторов (меньше).
   * @param {Vector3} other - Второй вектор.
   * @returns {boolean} Статус меньше.
   */
  public isLessThan(other: Vector3): boolean
  {
    return this.x < other.x || (this.x === other.x && this.y < other.y) || (this.x === other.x && this.y === other.y && this.z < other.z);
  }

  /**
   * Реализация лексикографического порядка отношений векторов (больше).
   * @param {Vector3} other - Второй вектор.
   * @returns {boolean} Статус больше.
   */
  public isGreaterThan(other: Vector3): boolean
  {
    return this.x > other.x || (this.x === other.x && this.y > other.y) || (this.x === other.x && this.y === other.y && this.z > other.z);
  }

  /**
   * Обратный вектор.
   * @returns {Vector3} Обратный вектор.
   */
  public negate(): Vector3
  {
    return new Vector3(-this.x, -this.y, -this.z);
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
        throw new Error('Invalid index for Vector3 component');
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
        throw new Error('Invalid index for Vector3 component');
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
   * @param {Vector3} vector - Вектор.
   * @returns {number} Расстояние до вектора.
   */
  public distance(vector: Vector3): number
  {
    return Vector3.distance(this, vector);
  }

  /**
   * Установка компонентов вектора из наибольших компонентов двух векторов.
   * @param {Vector3} a - Первый вектор.
   * @param {Vector3} b - Второй вектор.
   */
  public setMaximize(a: Vector3, b: Vector3): void
  {
    this.x = a.x > b.x ? a.x : b.x;
    this.y = a.y > b.y ? a.y : b.y;
    this.z = a.z > b.z ? a.z : b.z;
  }

  /**
   * Установка компонентов вектора из наименьших компонентов двух векторов.
   * @param {Vector3} a - Первый вектор.
   * @param {Vector3} b - Второй вектор.
   */
  public setMinimize(a: Vector3, b: Vector3): void
  {
    this.x = a.x < b.x ? a.x : b.x;
    this.y = a.y < b.y ? a.y : b.y;
    this.z = a.z < b.z ? a.z : b.z;
  }

  /**
   * Векторное произведение с нормализацией результата.
   * @param {Vector3} left - Левый вектор.
   * @param {Vector3} right - Правый вектор.
   */
  public crossNormalize(left: Vector3, right: Vector3): void
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

  /**
   * Преобразование в двухмерный вектор плоскости XY.
   * @returns {Vector2} Вектор.
   */
  public toVector2XY(): Vector2
  {
    return new Vector2(this.x, this.y);
  }

  /**
   * Преобразование в двухмерный вектор плоскости XZ.
   * @returns {Vector2} Вектор.
   */
  public toVector2XZ(): Vector2
  {
    return new Vector2(this.x, this.z);
  }

  /**
   * Преобразование в двухмерный вектор плоскости YZ.
   * @returns {Vector2} Вектор.
   */
  public toVector2YZ(): Vector2
  {
    return new Vector2(this.y, this.z);
  }

  /**
   * Преобразование в трехмерный вектор только с компонентой X.
   * @returns {Vector3} Вектор.
   */
  public toVector3X(): Vector3
  {
    return new Vector3(this.x, 0, 0);
  }

  /**
   * Преобразование в трехмерный вектор только с компонентой Y.
   * @returns {Vector3} Вектор.
   */
  public toVector3Y(): Vector3
  {
    return new Vector3(0, this.y, 0);
  }

  /**
   * Преобразование в трехмерный вектор только с компонентой Z.
   * @returns {Vector3} Вектор.
   */
  public toVector3Z(): Vector3
  {
    return new Vector3(0, 0, this.z);
  }

  /**
   * Преобразование в трехмерный вектор плоскости XY.
   * @returns {Vector3} Вектор.
   */
  public toVector3XY(): Vector3
  {
    return new Vector3(this.x, this.y, 0);
  }

  /**
   * Преобразование в трехмерный вектор плоскости XZ.
   * @returns {Vector3} Вектор.
   */
  public toVector3XZ(): Vector3
  {
    return new Vector3(this.x, 0, this.z);
  }

  /**
   * Преобразование в трехмерный вектор плоскости YZ.
   * @returns {Vector3} Вектор.
   */
  public toVector3YZ(): Vector3
  {
    return new Vector3(0, this.y, this.z);
  }
  // #endregion
}

