import { Vector2 } from '../geometry2D';
/**
 * Интерфейс для описания трехмерного вектора
 */
export interface IVector3 {
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
export declare class Vector3 implements IVector3 {
    /**
     * Единичный вектор.
     */
    static readonly One: Vector3;
    /**
     * Вектор - право.
     */
    static readonly Right: Vector3;
    /**
     * Вектор - влево.
     */
    static readonly Left: Vector3;
    /**
     * Вектор - вверх.
     */
    static readonly Up: Vector3;
    /**
     * Вектор - вниз.
     */
    static readonly Down: Vector3;
    /**
     * Вектор - вперед.
     */
    static readonly Forward: Vector3;
    /**
     * Вектор - назад.
     */
    static readonly Back: Vector3;
    /**
     * Нулевой вектор.
     */
    static readonly Zero: Vector3;
    /**
     * Текстовый формат отображения параметров вектора.
     */
    static toStringFormat: string;
    /**
     * Текстовый формат отображения только значений параметров вектора.
     */
    static toStringFormatValue: string;
    /**
     * Сложение векторов.
     * @param {Vector3} a - Первый вектор.
     * @param {Vector3} b - Второй вектор.
     * @returns {Vector3} Результирующий вектор.
     */
    static add(a: Vector3, b: Vector3): Vector3;
    /**
     * Разность векторов.
     * @param {Vector3} a - Первый вектор.
     * @param {Vector3} b - Второй вектор.
     * @returns {Vector3} Результирующий вектор.
     */
    static subtract(a: Vector3, b: Vector3): Vector3;
    /**
     * Косинус угла между векторами.
     * @param {Vector3} from - Начальный вектор.
     * @param {Vector3} to - Конечный вектор.
     * @returns {number} Косинус угла.
     */
    static cos(from: Vector3, to: Vector3): number;
    /**
     * Угол между двумя векторами (в градусах).
     * @param {Vector3} from - Начальный вектор.
     * @param {Vector3} to - Конечный вектор.
     * @returns {number} Угол в градусах.
     */
    static angle(from: Vector3, to: Vector3): number;
    /**
     * Поворот вектора вокруг оси Y.
     * @param {Vector3} vector - Вектор.
     * @param {number} degrees - Угол поворота в градусах.
     * @returns {Vector3} Повернутый вектор.
     */
    static rotateY(vector: IVector3, degrees: number): IVector3;
    /**
     * Расстояние между двумя векторами.
     * @param {Vector3} a - Первый вектор.
     * @param {Vector3} b - Второй вектор.
     * @returns {number} Расстояние между двумя векторами.
     */
    static distance(a: Vector3, b: Vector3): number;
    /**
     * Скалярное произведение векторов.
     * @param {Vector3} a - Первый вектор.
     * @param {Vector3} b - Второй вектор.
     * @returns {number} Скаляр.
     */
    static dot(a: Vector3, b: Vector3): number;
    /**
     * Векторное произведение векторов.
     * @param {Vector3} left - Левый вектор.
     * @param {Vector3} right - Правый вектор.
     * @returns {Vector3} Вектор, перпендикулярный обоим векторам.
     */
    static cross(left: Vector3, right: Vector3): Vector3;
    /**
     * Линейная интерполяция векторов.
     * @param {Vector3} from - Начальный вектор.
     * @param {Vector3} to - Конечный вектор.
     * @param {number} time - Время от 0 до 1.
     * @returns {Vector3} Интерполированный вектор.
     */
    static lerp(from: Vector3, to: Vector3, time: number): Vector3;
    /**
     * Десериализация трехмерного вектора из строки.
     * @param {string} data - Строка данных.
     * @returns {Vector3} Трехмерный вектор.
     */
    static deserializeFromString(data: string): Vector3;
    x: number;
    y: number;
    z: number;
    /**
     * Квадрат длины вектора.
     */
    get sqrLength(): number;
    /**
     * Длина вектора.
     */
    get length(): number;
    /**
     * Нормализованный вектор.
     */
    get normalized(): Vector3;
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
    /**
     * Проверка равенства векторов по значению.
     * @param {Vector3} other - Сравниваемый вектор.
     * @returns {boolean} Статус равенства векторов.
     */
    equals(other: Vector3): boolean;
    /**
     * Сравнение векторов для упорядочивания.
     * @param {Vector3} other - Вектор.
     * @returns {number} Статус сравнения векторов.
     */
    compareTo(other: Vector3): number;
    /**
     * Преобразование к текстовому представлению.
     * @returns {string} Текстовое представление вектора с указанием значений координат.
     */
    toString(): string;
    /**
     * Преобразование к текстовому представлению с заданным форматом.
     * @param {string} format - Формат отображения компонентов вектора.
     * @returns {string} Текстовое представление вектора с указанием значений координат.
     */
    toStringWithFormat(format: string): string;
    /**
     * Преобразование к текстовому представлению только значений.
     * @returns {string} Текстовое представление вектора с указанием значений координат.
     */
    toStringValue(): string;
    /**
     * Преобразование к текстовому представлению только значений с заданным форматом.
     * @param {string} format - Формат отображения компонентов вектора.
     * @returns {string} Текстовое представление вектора с указанием значений координат.
     */
    toStringValueWithFormat(format: string): string;
    /**
     * Сложение векторов.
     * @param {Vector3} other - Второй вектор.
     * @returns {Vector3} Сумма векторов.
     */
    add(other: Vector3): Vector3;
    /**
     * Вычитание векторов.
     * @param {Vector3} other - Второй вектор.
     * @returns {Vector3} Разность векторов.
     */
    subtract(other: Vector3): Vector3;
    /**
     * Умножение вектора на скаляр.
     * @param {number} scalar - Скаляр.
     * @returns {Vector3} Масштабированный вектор.
     */
    multiply(scalar: number): Vector3;
    /**
     * Деление вектора на скаляр.
     * @param {number} scalar - Скаляр.
     * @returns {Vector3} Масштабированный вектор.
     */
    divide(scalar: number): Vector3;
    /**
     * Скалярное произведение векторов.
     * @param {Vector3} other - Второй вектор.
     * @returns {number} Скаляр.
     */
    dot(other: Vector3): number;
    /**
     * Векторное произведение векторов.
     * @param {Vector3} other - Второй вектор.
     * @returns {Vector3} Вектор, перпендикулярный обоим векторам.
     */
    cross(other: Vector3): Vector3;
    /**
     * Сравнение векторов на равенство.
     * @param {Vector3} other - Второй вектор.
     * @returns {boolean} Статус равенства векторов.
     */
    isEqual(other: Vector3): boolean;
    /**
     * Сравнение векторов на неравенство.
     * @param {Vector3} other - Второй вектор.
     * @returns {boolean} Статус неравенства векторов.
     */
    isNotEqual(other: Vector3): boolean;
    /**
     * Реализация лексикографического порядка отношений векторов (меньше).
     * @param {Vector3} other - Второй вектор.
     * @returns {boolean} Статус меньше.
     */
    isLessThan(other: Vector3): boolean;
    /**
     * Реализация лексикографического порядка отношений векторов (больше).
     * @param {Vector3} other - Второй вектор.
     * @returns {boolean} Статус больше.
     */
    isGreaterThan(other: Vector3): boolean;
    /**
     * Обратный вектор.
     * @returns {Vector3} Обратный вектор.
     */
    negate(): Vector3;
    /**
     * Индексация компонентов вектора на основе индекса.
     * @param {number} index - Индекс компонента.
     * @returns {number} Компонента вектора.
     */
    getComponent(index: number): number;
    /**
     * Установка компонента вектора по индексу.
     * @param {number} index - Индекс компонента.
     * @param {number} value - Значение компонента.
     */
    setComponent(index: number, value: number): void;
    /**
     * Нормализация вектора.
     */
    normalize(): void;
    /**
     * Вычисление расстояния до вектора.
     * @param {Vector3} vector - Вектор.
     * @returns {number} Расстояние до вектора.
     */
    distance(vector: Vector3): number;
    /**
     * Установка компонентов вектора из наибольших компонентов двух векторов.
     * @param {Vector3} a - Первый вектор.
     * @param {Vector3} b - Второй вектор.
     */
    setMaximize(a: Vector3, b: Vector3): void;
    /**
     * Установка компонентов вектора из наименьших компонентов двух векторов.
     * @param {Vector3} a - Первый вектор.
     * @param {Vector3} b - Второй вектор.
     */
    setMinimize(a: Vector3, b: Vector3): void;
    /**
     * Векторное произведение с нормализацией результата.
     * @param {Vector3} left - Левый вектор.
     * @param {Vector3} right - Правый вектор.
     */
    crossNormalize(left: Vector3, right: Vector3): void;
    /**
     * Сериализация вектора в строку.
     * @returns {string} Строка данных.
     */
    serializeToString(): string;
    /**
     * Преобразование в вектор с нулевой X-компонентой.
     * @returns {Vector2} Вектор.
     */
    toVector2X(): Vector2;
    /**
     * Преобразование в вектор с нулевой Y-компонентой.
     * @returns {Vector2} Вектор.
     */
    toVector2Y(): Vector2;
    /**
     * Преобразование в двухмерный вектор плоскости XY.
     * @returns {Vector2} Вектор.
     */
    toVector2XY(): Vector2;
    /**
     * Преобразование в двухмерный вектор плоскости XZ.
     * @returns {Vector2} Вектор.
     */
    toVector2XZ(): Vector2;
    /**
     * Преобразование в двухмерный вектор плоскости YZ.
     * @returns {Vector2} Вектор.
     */
    toVector2YZ(): Vector2;
    /**
     * Преобразование в трехмерный вектор только с компонентой X.
     * @returns {Vector3} Вектор.
     */
    toVector3X(): Vector3;
    /**
     * Преобразование в трехмерный вектор только с компонентой Y.
     * @returns {Vector3} Вектор.
     */
    toVector3Y(): Vector3;
    /**
     * Преобразование в трехмерный вектор только с компонентой Z.
     * @returns {Vector3} Вектор.
     */
    toVector3Z(): Vector3;
    /**
     * Преобразование в трехмерный вектор плоскости XY.
     * @returns {Vector3} Вектор.
     */
    toVector3XY(): Vector3;
    /**
     * Преобразование в трехмерный вектор плоскости XZ.
     * @returns {Vector3} Вектор.
     */
    toVector3XZ(): Vector3;
    /**
     * Преобразование в трехмерный вектор плоскости YZ.
     * @returns {Vector3} Вектор.
     */
    toVector3YZ(): Vector3;
}
//# sourceMappingURL=Vector3.d.ts.map