import { Vector2D } from '../geometry2D';
/**
 * Интерфейс для описания трехмерного вектора
 */
export interface IVector3D {
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
export declare class Vector3D implements IVector3D {
    /**
     * Единичный вектор.
     */
    static readonly One: Vector3D;
    /**
     * Вектор - право.
     */
    static readonly Right: Vector3D;
    /**
     * Вектор - влево.
     */
    static readonly Left: Vector3D;
    /**
     * Вектор - вверх.
     */
    static readonly Up: Vector3D;
    /**
     * Вектор - вниз.
     */
    static readonly Down: Vector3D;
    /**
     * Вектор - вперед.
     */
    static readonly Forward: Vector3D;
    /**
     * Вектор - назад.
     */
    static readonly Back: Vector3D;
    /**
     * Нулевой вектор.
     */
    static readonly Zero: Vector3D;
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
     * @param {Vector3D} a - Первый вектор.
     * @param {Vector3D} b - Второй вектор.
     * @returns {Vector3D} Результирующий вектор.
     */
    static add(a: Vector3D, b: Vector3D): Vector3D;
    /**
     * Разность векторов.
     * @param {Vector3D} a - Первый вектор.
     * @param {Vector3D} b - Второй вектор.
     * @returns {Vector3D} Результирующий вектор.
     */
    static subtract(a: Vector3D, b: Vector3D): Vector3D;
    /**
     * Косинус угла между векторами.
     * @param {Vector3D} from - Начальный вектор.
     * @param {Vector3D} to - Конечный вектор.
     * @returns {number} Косинус угла.
     */
    static cos(from: Vector3D, to: Vector3D): number;
    /**
     * Угол между двумя векторами (в градусах).
     * @param {Vector3D} from - Начальный вектор.
     * @param {Vector3D} to - Конечный вектор.
     * @returns {number} Угол в градусах.
     */
    static angle(from: Vector3D, to: Vector3D): number;
    /**
     * Расстояние между двумя векторами.
     * @param {Vector3D} a - Первый вектор.
     * @param {Vector3D} b - Второй вектор.
     * @returns {number} Расстояние между двумя векторами.
     */
    static distance(a: Vector3D, b: Vector3D): number;
    /**
     * Скалярное произведение векторов.
     * @param {Vector3D} a - Первый вектор.
     * @param {Vector3D} b - Второй вектор.
     * @returns {number} Скаляр.
     */
    static dot(a: Vector3D, b: Vector3D): number;
    /**
     * Векторное произведение векторов.
     * @param {Vector3D} left - Левый вектор.
     * @param {Vector3D} right - Правый вектор.
     * @returns {Vector3D} Вектор, перпендикулярный обоим векторам.
     */
    static cross(left: Vector3D, right: Vector3D): Vector3D;
    /**
     * Линейная интерполяция векторов.
     * @param {Vector3D} from - Начальный вектор.
     * @param {Vector3D} to - Конечный вектор.
     * @param {number} time - Время от 0 до 1.
     * @returns {Vector3D} Интерполированный вектор.
     */
    static lerp(from: Vector3D, to: Vector3D, time: number): Vector3D;
    /**
     * Десериализация трехмерного вектора из строки.
     * @param {string} data - Строка данных.
     * @returns {Vector3D} Трехмерный вектор.
     */
    static deserializeFromString(data: string): Vector3D;
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
    get normalized(): Vector3D;
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
    /**
     * Проверка равенства векторов по значению.
     * @param {Vector3D} other - Сравниваемый вектор.
     * @returns {boolean} Статус равенства векторов.
     */
    equals(other: Vector3D): boolean;
    /**
     * Сравнение векторов для упорядочивания.
     * @param {Vector3D} other - Вектор.
     * @returns {number} Статус сравнения векторов.
     */
    compareTo(other: Vector3D): number;
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
     * @param {Vector3D} other - Второй вектор.
     * @returns {Vector3D} Сумма векторов.
     */
    add(other: Vector3D): Vector3D;
    /**
     * Вычитание векторов.
     * @param {Vector3D} other - Второй вектор.
     * @returns {Vector3D} Разность векторов.
     */
    subtract(other: Vector3D): Vector3D;
    /**
     * Умножение вектора на скаляр.
     * @param {number} scalar - Скаляр.
     * @returns {Vector3D} Масштабированный вектор.
     */
    multiply(scalar: number): Vector3D;
    /**
     * Деление вектора на скаляр.
     * @param {number} scalar - Скаляр.
     * @returns {Vector3D} Масштабированный вектор.
     */
    divide(scalar: number): Vector3D;
    /**
     * Скалярное произведение векторов.
     * @param {Vector3D} other - Второй вектор.
     * @returns {number} Скаляр.
     */
    dot(other: Vector3D): number;
    /**
     * Векторное произведение векторов.
     * @param {Vector3D} other - Второй вектор.
     * @returns {Vector3D} Вектор, перпендикулярный обоим векторам.
     */
    cross(other: Vector3D): Vector3D;
    /**
     * Сравнение векторов на равенство.
     * @param {Vector3D} other - Второй вектор.
     * @returns {boolean} Статус равенства векторов.
     */
    isEqual(other: Vector3D): boolean;
    /**
     * Сравнение векторов на неравенство.
     * @param {Vector3D} other - Второй вектор.
     * @returns {boolean} Статус неравенства векторов.
     */
    isNotEqual(other: Vector3D): boolean;
    /**
     * Реализация лексикографического порядка отношений векторов (меньше).
     * @param {Vector3D} other - Второй вектор.
     * @returns {boolean} Статус меньше.
     */
    isLessThan(other: Vector3D): boolean;
    /**
     * Реализация лексикографического порядка отношений векторов (больше).
     * @param {Vector3D} other - Второй вектор.
     * @returns {boolean} Статус больше.
     */
    isGreaterThan(other: Vector3D): boolean;
    /**
     * Обратный вектор.
     * @returns {Vector3D} Обратный вектор.
     */
    negate(): Vector3D;
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
     * @param {Vector3D} vector - Вектор.
     * @returns {number} Расстояние до вектора.
     */
    distance(vector: Vector3D): number;
    /**
     * Установка компонентов вектора из наибольших компонентов двух векторов.
     * @param {Vector3D} a - Первый вектор.
     * @param {Vector3D} b - Второй вектор.
     */
    setMaximize(a: Vector3D, b: Vector3D): void;
    /**
     * Установка компонентов вектора из наименьших компонентов двух векторов.
     * @param {Vector3D} a - Первый вектор.
     * @param {Vector3D} b - Второй вектор.
     */
    setMinimize(a: Vector3D, b: Vector3D): void;
    /**
     * Векторное произведение с нормализацией результата.
     * @param {Vector3D} left - Левый вектор.
     * @param {Vector3D} right - Правый вектор.
     */
    crossNormalize(left: Vector3D, right: Vector3D): void;
    /**
     * Сериализация вектора в строку.
     * @returns {string} Строка данных.
     */
    serializeToString(): string;
    /**
     * Преобразование в вектор с нулевой X-компонентой.
     * @returns {Vector2D} Вектор.
     */
    toVector2X(): Vector2D;
    /**
     * Преобразование в вектор с нулевой Y-компонентой.
     * @returns {Vector2D} Вектор.
     */
    toVector2Y(): Vector2D;
    /**
     * Преобразование в двухмерный вектор плоскости XY.
     * @returns {Vector2D} Вектор.
     */
    toVector2XY(): Vector2D;
    /**
     * Преобразование в двухмерный вектор плоскости XZ.
     * @returns {Vector2D} Вектор.
     */
    toVector2XZ(): Vector2D;
    /**
     * Преобразование в двухмерный вектор плоскости YZ.
     * @returns {Vector2D} Вектор.
     */
    toVector2YZ(): Vector2D;
    /**
     * Преобразование в трехмерный вектор только с компонентой X.
     * @returns {Vector3D} Вектор.
     */
    toVector3X(): Vector3D;
    /**
     * Преобразование в трехмерный вектор только с компонентой Y.
     * @returns {Vector3D} Вектор.
     */
    toVector3Y(): Vector3D;
    /**
     * Преобразование в трехмерный вектор только с компонентой Z.
     * @returns {Vector3D} Вектор.
     */
    toVector3Z(): Vector3D;
    /**
     * Преобразование в трехмерный вектор плоскости XY.
     * @returns {Vector3D} Вектор.
     */
    toVector3XY(): Vector3D;
    /**
     * Преобразование в трехмерный вектор плоскости XZ.
     * @returns {Vector3D} Вектор.
     */
    toVector3XZ(): Vector3D;
    /**
     * Преобразование в трехмерный вектор плоскости YZ.
     * @returns {Vector3D} Вектор.
     */
    toVector3YZ(): Vector3D;
}
//# sourceMappingURL=Vector3.d.ts.map