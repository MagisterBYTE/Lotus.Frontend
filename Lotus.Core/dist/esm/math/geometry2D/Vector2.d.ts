/**
 * Интерфейс для описания двухмерного вектора
 */
export interface IVector2D {
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
export declare class Vector2D implements IVector2D {
    /**
     * Единичный вектор.
     */
    static readonly One: Vector2D;
    /**
     * Вектор "право".
     */
    static readonly Right: Vector2D;
    /**
     * Вектор "влево".
     */
    static readonly Left: Vector2D;
    /**
     * Вектор "вверх".
     */
    static readonly Up: Vector2D;
    /**
     * Вектор "вниз".
     */
    static readonly Down: Vector2D;
    /**
     * Нулевой вектор.
     */
    static readonly Zero: Vector2D;
    /**
     * Косинус угла между векторами.
     * @param {Vector2D} from - Начальный вектор.
     * @param {Vector2D} to - Конечный вектор.
     * @returns {number} Косинус угла.
     */
    static cos(from: Vector2D, to: Vector2D): number;
    /**
     * Угол между двумя векторами (в градусах).
     * @param {Vector2D} from - Начальный вектор.
     * @param {Vector2D} to - Конечный вектор.
     * @returns {number} Угол в градусах.
     */
    static angle(from: Vector2D, to: Vector2D): number;
    /**
     * Расстояние между двумя векторами.
     * @param {Vector2D} a - Первый вектор.
     * @param {Vector2D} b - Второй вектор.
     * @returns {number} Расстояние между двумя векторами.
     */
    static distance(a: Vector2D, b: Vector2D): number;
    /**
     * Скалярное произведение векторов.
     * @param {Vector2D} a - Первый вектор.
     * @param {Vector2D} b - Второй вектор.
     * @returns {number} Скаляр.
     */
    static dot(a: Vector2D, b: Vector2D): number;
    /**
     * Линейная интерполяция векторов.
     * @param {Vector2D} from - Начальный вектор.
     * @param {Vector2D} to - Конечный вектор.
     * @param {number} time - Время от 0 до 1.
     * @returns {Vector2D} Интерполированный вектор.
     */
    static lerp(from: Vector2D, to: Vector2D, time: number): Vector2D;
    /**
     * Негативное значение для вектора.
     * @param {Vector2D} value - Исходный вектор.
     * @returns {Vector2D} Негативный вектор.
     */
    static negate(value: Vector2D): Vector2D;
    /**
     * Максимальное значение из компонентов векторов.
     * @param {Vector2D} a - Первый вектор.
     * @param {Vector2D} b - Второй вектор.
     * @returns {Vector2D} Результирующий вектор.
     */
    static max(a: Vector2D, b: Vector2D): Vector2D;
    /**
     * Минимальное значение из компонентов векторов.
     * @param {Vector2D} a - Первый вектор.
     * @param {Vector2D} b - Второй вектор.
     * @returns {Vector2D} Результирующий вектор.
     */
    static min(a: Vector2D, b: Vector2D): Vector2D;
    /**
     * Отражение вектора относительно нормали.
     * @param {Vector2D} vector - Исходный вектор.
     * @param {Vector2D} normal - Вектор нормали.
     * @returns {Vector2D} Результирующий вектор.
     */
    static reflect(vector: Vector2D, normal: Vector2D): Vector2D;
    /**
     * Аппроксимация равенства значений векторов.
     * @param {Vector2D} a - Первый вектор.
     * @param {Vector2D} b - Второй вектор.
     * @param {number} epsilon - Погрешность.
     * @returns {boolean} Статус равенства значений.
     */
    static approximately(a: Vector2D, b: Vector2D, epsilon?: number): boolean;
    /**
     * Десериализация двухмерного вектора из строки.
     * @param {string} data - Строка данных.
     * @returns {Vector2D} Двухмерный вектор.
     */
    static deserializeFromString(data: string): Vector2D;
    x: number;
    y: number;
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
    get normalized(): Vector2D;
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
    /**
     * Нормализация вектора.
     */
    normalize(): void;
    /**
     * Вычисление расстояния до вектора.
     * @param {Vector2D} vector - Вектор.
     * @returns {number} Расстояние до вектора.
     */
    distance(vector: Vector2D): number;
    /**
     * Вычисление скалярного произведения векторов.
     * @param {Vector2D} vector - Вектор.
     * @returns {number} Скалярное произведение векторов.
     */
    dot(vector: Vector2D): number;
    /**
     * Установка компонентов вектора из наибольших компонентов двух векторов.
     * @param {Vector2D} a - Первый вектор.
     * @param {Vector2D} b - Второй вектор.
     */
    setMaximize(a: Vector2D, b: Vector2D): void;
    /**
     * Установка компонентов вектора из наименьших компонентов двух векторов.
     * @param {Vector2D} a - Первый вектор.
     * @param {Vector2D} b - Второй вектор.
     */
    setMinimize(a: Vector2D, b: Vector2D): void;
    /**
     * Возвращение перпендикулярного вектора, расположенного против часовой стрелки.
     * @returns {Vector2D} Перпендикулярный вектор.
     */
    perpToCCW(): Vector2D;
    /**
     * Возвращение перпендикулярного вектора, расположенного по часовой стрелке.
     * @returns {Vector2D} Перпендикулярный вектор.
     */
    perpToCW(): Vector2D;
    /**
     * Возвращение единичного перпендикулярного вектора, расположенного против часовой стрелки.
     * @returns {Vector2D} Перпендикулярный вектор.
     */
    unitPerpToCCW(): Vector2D;
    /**
     * Возвращение единичного перпендикулярного вектора, расположенного по часовой стрелке.
     * @returns {Vector2D} Перпендикулярный вектор.
     */
    unitPerpToCW(): Vector2D;
    /**
     * Возвращение скалярного произведения с перпендикулярным вектором.
     * @param {Vector2D} vector - Вектор.
     * @returns {number} Скалярное произведение с перпендикулярным вектором.
     */
    dotPerp(vector: Vector2D): number;
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
     * Сложение векторов.
     * @param {Vector2D} other - Второй вектор.
     * @returns {Vector2D} Сумма векторов.
     */
    add(other: Vector2D): Vector2D;
    /**
     * Вычитание векторов.
     * @param {Vector2D} other - Второй вектор.
     * @returns {Vector2D} Разность векторов.
     */
    subtract(other: Vector2D): Vector2D;
    /**
     * Умножение вектора на скаляр.
     * @param {number} scalar - Скаляр.
     * @returns {Vector2D} Масштабированный вектор.
     */
    multiply(scalar: number): Vector2D;
    /**
     * Деление вектора на скаляр.
     * @param {number} scalar - Скаляр.
     * @returns {Vector2D} Масштабированный вектор.
     */
    divide(scalar: number): Vector2D;
    /**
     * Сравнение векторов на равенство.
     * @param {Vector2D} other - Второй вектор.
     * @returns {boolean} Статус равенства векторов.
     */
    equals(other: Vector2D): boolean;
    /**
     * Преобразование к текстовому представлению.
     * @returns {string} Текстовое представление вектора.
     */
    toString(): string;
}
//# sourceMappingURL=Vector2.d.ts.map