/**
 * Интерфейс для описания двухмерного вектора
 */
export interface IVector2 {
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
export declare const Vector2Constants: {
    /**
     * Единичный вектор.
     */
    readonly One: {
        readonly x: 1;
        readonly y: 1;
    };
    /**
     * Вектор "право".
     */
    readonly Right: {
        readonly x: 1;
        readonly y: 0;
    };
    /**
     * Вектор "влево".
     */
    readonly Left: {
        readonly x: -1;
        readonly y: 0;
    };
    /**
     * Вектор "вверх".
     */
    readonly Up: {
        readonly x: 0;
        readonly y: 1;
    };
    /**
     * Вектор "вниз".
     */
    readonly Down: {
        readonly x: 0;
        readonly y: -1;
    };
    /**
     * Нулевой вектор.
     */
    readonly Zero: {
        readonly x: 0;
        readonly y: 0;
    };
};
/**
 * Двухмерный вектор.
 * Реализация двухмерного вектора, представляющего собой базовую математическую сущность в двухмерном пространстве.
 */
export declare class Vector2 implements IVector2 {
    /**
     * Единичный вектор.
     */
    static readonly One: Vector2;
    /**
     * Вектор "право".
     */
    static readonly Right: Vector2;
    /**
     * Вектор "влево".
     */
    static readonly Left: Vector2;
    /**
     * Вектор "вверх".
     */
    static readonly Up: Vector2;
    /**
     * Вектор "вниз".
     */
    static readonly Down: Vector2;
    /**
     * Нулевой вектор.
     */
    static readonly Zero: Vector2;
    /**
     * Косинус угла между векторами.
     * @param {Vector2} from - Начальный вектор.
     * @param {Vector2} to - Конечный вектор.
     * @returns {number} Косинус угла.
     */
    static cos(from: Vector2, to: Vector2): number;
    /**
     * Угол между двумя векторами (в градусах).
     * @param {Vector2} from - Начальный вектор.
     * @param {Vector2} to - Конечный вектор.
     * @returns {number} Угол в градусах.
     */
    static angle(from: Vector2, to: Vector2): number;
    /**
     * Расстояние между двумя векторами.
     * @param {Vector2} a - Первый вектор.
     * @param {Vector2} b - Второй вектор.
     * @returns {number} Расстояние между двумя векторами.
     */
    static distance(a: Vector2, b: Vector2): number;
    /**
     * Скалярное произведение векторов.
     * @param {Vector2} a - Первый вектор.
     * @param {Vector2} b - Второй вектор.
     * @returns {number} Скаляр.
     */
    static dot(a: Vector2, b: Vector2): number;
    /**
     * Линейная интерполяция векторов.
     * @param {Vector2} from - Начальный вектор.
     * @param {Vector2} to - Конечный вектор.
     * @param {number} time - Время от 0 до 1.
     * @returns {Vector2} Интерполированный вектор.
     */
    static lerp(from: Vector2, to: Vector2, time: number): Vector2;
    /**
     * Негативное значение для вектора.
     * @param {Vector2} value - Исходный вектор.
     * @returns {Vector2} Негативный вектор.
     */
    static negate(value: Vector2): Vector2;
    /**
     * Максимальное значение из компонентов векторов.
     * @param {Vector2} a - Первый вектор.
     * @param {Vector2} b - Второй вектор.
     * @returns {Vector2} Результирующий вектор.
     */
    static max(a: Vector2, b: Vector2): Vector2;
    /**
     * Минимальное значение из компонентов векторов.
     * @param {Vector2} a - Первый вектор.
     * @param {Vector2} b - Второй вектор.
     * @returns {Vector2} Результирующий вектор.
     */
    static min(a: Vector2, b: Vector2): Vector2;
    /**
     * Отражение вектора относительно нормали.
     * @param {Vector2} vector - Исходный вектор.
     * @param {Vector2} normal - Вектор нормали.
     * @returns {Vector2} Результирующий вектор.
     */
    static reflect(vector: Vector2, normal: Vector2): Vector2;
    /**
     * Аппроксимация равенства значений векторов.
     * @param {Vector2} a - Первый вектор.
     * @param {Vector2} b - Второй вектор.
     * @param {number} epsilon - Погрешность.
     * @returns {boolean} Статус равенства значений.
     */
    static approximately(a: Vector2, b: Vector2, epsilon?: number): boolean;
    /**
     * Десериализация двухмерного вектора из строки.
     * @param {string} data - Строка данных.
     * @returns {Vector2} Двухмерный вектор.
     */
    static deserializeFromString(data: string): Vector2;
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
    get normalized(): Vector2;
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
    /**
     * Нормализация вектора.
     */
    normalize(): void;
    /**
     * Вычисление расстояния до вектора.
     * @param {Vector2} vector - Вектор.
     * @returns {number} Расстояние до вектора.
     */
    distance(vector: Vector2): number;
    /**
     * Вычисление скалярного произведения векторов.
     * @param {Vector2} vector - Вектор.
     * @returns {number} Скалярное произведение векторов.
     */
    dot(vector: Vector2): number;
    /**
     * Установка компонентов вектора из наибольших компонентов двух векторов.
     * @param {Vector2} a - Первый вектор.
     * @param {Vector2} b - Второй вектор.
     */
    setMaximize(a: Vector2, b: Vector2): void;
    /**
     * Установка компонентов вектора из наименьших компонентов двух векторов.
     * @param {Vector2} a - Первый вектор.
     * @param {Vector2} b - Второй вектор.
     */
    setMinimize(a: Vector2, b: Vector2): void;
    /**
     * Возвращение перпендикулярного вектора, расположенного против часовой стрелки.
     * @returns {Vector2} Перпендикулярный вектор.
     */
    perpToCCW(): Vector2;
    /**
     * Возвращение перпендикулярного вектора, расположенного по часовой стрелке.
     * @returns {Vector2} Перпендикулярный вектор.
     */
    perpToCW(): Vector2;
    /**
     * Возвращение единичного перпендикулярного вектора, расположенного против часовой стрелки.
     * @returns {Vector2} Перпендикулярный вектор.
     */
    unitPerpToCCW(): Vector2;
    /**
     * Возвращение единичного перпендикулярного вектора, расположенного по часовой стрелке.
     * @returns {Vector2} Перпендикулярный вектор.
     */
    unitPerpToCW(): Vector2;
    /**
     * Возвращение скалярного произведения с перпендикулярным вектором.
     * @param {Vector2} vector - Вектор.
     * @returns {number} Скалярное произведение с перпендикулярным вектором.
     */
    dotPerp(vector: Vector2): number;
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
     * Сложение векторов.
     * @param {Vector2} other - Второй вектор.
     * @returns {Vector2} Сумма векторов.
     */
    add(other: Vector2): Vector2;
    /**
     * Вычитание векторов.
     * @param {Vector2} other - Второй вектор.
     * @returns {Vector2} Разность векторов.
     */
    subtract(other: Vector2): Vector2;
    /**
     * Умножение вектора на скаляр.
     * @param {number} scalar - Скаляр.
     * @returns {Vector2} Масштабированный вектор.
     */
    multiply(scalar: number): Vector2;
    /**
     * Деление вектора на скаляр.
     * @param {number} scalar - Скаляр.
     * @returns {Vector2} Масштабированный вектор.
     */
    divide(scalar: number): Vector2;
    /**
     * Сравнение векторов на равенство.
     * @param {Vector2} other - Второй вектор.
     * @returns {boolean} Статус равенства векторов.
     */
    equals(other: Vector2): boolean;
    /**
     * Преобразование к текстовому представлению.
     * @returns {string} Текстовое представление вектора.
     */
    toString(): string;
}
//# sourceMappingURL=Vector2.d.ts.map