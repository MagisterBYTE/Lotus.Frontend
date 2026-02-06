/**
 * Двухмерный вектор.
 * Реализация двухмерного вектора, представляющего собой базовую математическую сущность в двухмерном пространстве.
 */
export class Vector2D {
    // #region Const
    /**
     * Единичный вектор.
     */
    static One = new Vector2D(1, 1);
    /**
     * Вектор "право".
     */
    static Right = new Vector2D(1, 0);
    /**
     * Вектор "влево".
     */
    static Left = new Vector2D(-1, 0);
    /**
     * Вектор "вверх".
     */
    static Up = new Vector2D(0, 1);
    /**
     * Вектор "вниз".
     */
    static Down = new Vector2D(0, -1);
    /**
     * Нулевой вектор.
     */
    static Zero = new Vector2D(0, 0);
    // #endregion
    // #region Static methods
    /**
     * Косинус угла между векторами.
     * @param {Vector2D} from - Начальный вектор.
     * @param {Vector2D} to - Конечный вектор.
     * @returns {number} Косинус угла.
     */
    static cos(from, to) {
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
    static angle(from, to) {
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
    static distance(a, b) {
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
    static dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }
    /**
     * Линейная интерполяция векторов.
     * @param {Vector2D} from - Начальный вектор.
     * @param {Vector2D} to - Конечный вектор.
     * @param {number} time - Время от 0 до 1.
     * @returns {Vector2D} Интерполированный вектор.
     */
    static lerp(from, to, time) {
        return new Vector2D(from.x + (to.x - from.x) * time, from.y + (to.y - from.y) * time);
    }
    /**
     * Негативное значение для вектора.
     * @param {Vector2D} value - Исходный вектор.
     * @returns {Vector2D} Негативный вектор.
     */
    static negate(value) {
        return new Vector2D(-value.x, -value.y);
    }
    /**
     * Максимальное значение из компонентов векторов.
     * @param {Vector2D} a - Первый вектор.
     * @param {Vector2D} b - Второй вектор.
     * @returns {Vector2D} Результирующий вектор.
     */
    static max(a, b) {
        return new Vector2D(a.x > b.x ? a.x : b.x, a.y > b.y ? a.y : b.y);
    }
    /**
     * Минимальное значение из компонентов векторов.
     * @param {Vector2D} a - Первый вектор.
     * @param {Vector2D} b - Второй вектор.
     * @returns {Vector2D} Результирующий вектор.
     */
    static min(a, b) {
        return new Vector2D(a.x < b.x ? a.x : b.x, a.y < b.y ? a.y : b.y);
    }
    /**
     * Отражение вектора относительно нормали.
     * @param {Vector2D} vector - Исходный вектор.
     * @param {Vector2D} normal - Вектор нормали.
     * @returns {Vector2D} Результирующий вектор.
     */
    static reflect(vector, normal) {
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
    static approximately(a, b, epsilon = 0.001) {
        return Math.abs(a.x - b.x) < epsilon && Math.abs(a.y - b.y) < epsilon;
    }
    /**
     * Десериализация двухмерного вектора из строки.
     * @param {string} data - Строка данных.
     * @returns {Vector2D} Двухмерный вектор.
     */
    static deserializeFromString(data) {
        const vectorData = data.split(';');
        return new Vector2D(parseFloat(vectorData[0]), parseFloat(vectorData[1]));
    }
    // #endregion
    // #region Fields
    x;
    y;
    // #endregion
    // #region Properties
    /**
     * Квадрат длины вектора.
     */
    get sqrLength() {
        return this.x * this.x + this.y * this.y;
    }
    /**
     * Длина вектора.
     */
    get length() {
        return Math.sqrt(this.sqrLength);
    }
    /**
     * Нормализованный вектор.
     */
    get normalized() {
        const invLength = 1 / this.length;
        return new Vector2D(this.x * invLength, this.y * invLength);
    }
    constructor(arg1, arg2) {
        if (typeof arg1 === 'number' && typeof arg2 === 'number') {
            this.x = arg1;
            this.y = arg2;
        }
        else if (arg1 instanceof Vector2D) {
            this.x = arg1.x;
            this.y = arg1.y;
        }
        else {
            throw new Error('Invalid arguments for Vector2D constructor');
        }
    }
    // #endregion
    // #region Main methods
    /**
     * Нормализация вектора.
     */
    normalize() {
        const invLength = 1 / this.length;
        this.x *= invLength;
        this.y *= invLength;
    }
    /**
     * Вычисление расстояния до вектора.
     * @param {Vector2D} vector - Вектор.
     * @returns {number} Расстояние до вектора.
     */
    distance(vector) {
        const x = vector.x - this.x;
        const y = vector.y - this.y;
        return Math.sqrt(x * x + y * y);
    }
    /**
     * Вычисление скалярного произведения векторов.
     * @param {Vector2D} vector - Вектор.
     * @returns {number} Скалярное произведение векторов.
     */
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }
    /**
     * Установка компонентов вектора из наибольших компонентов двух векторов.
     * @param {Vector2D} a - Первый вектор.
     * @param {Vector2D} b - Второй вектор.
     */
    setMaximize(a, b) {
        this.x = a.x > b.x ? a.x : b.x;
        this.y = a.y > b.y ? a.y : b.y;
    }
    /**
     * Установка компонентов вектора из наименьших компонентов двух векторов.
     * @param {Vector2D} a - Первый вектор.
     * @param {Vector2D} b - Второй вектор.
     */
    setMinimize(a, b) {
        this.x = a.x < b.x ? a.x : b.x;
        this.y = a.y < b.y ? a.y : b.y;
    }
    /**
     * Возвращение перпендикулярного вектора, расположенного против часовой стрелки.
     * @returns {Vector2D} Перпендикулярный вектор.
     */
    perpToCCW() {
        return new Vector2D(-this.y, this.x);
    }
    /**
     * Возвращение перпендикулярного вектора, расположенного по часовой стрелке.
     * @returns {Vector2D} Перпендикулярный вектор.
     */
    perpToCW() {
        return new Vector2D(this.y, -this.x);
    }
    /**
     * Возвращение единичного перпендикулярного вектора, расположенного против часовой стрелки.
     * @returns {Vector2D} Перпендикулярный вектор.
     */
    unitPerpToCCW() {
        return this.perpToCCW().normalized;
    }
    /**
     * Возвращение единичного перпендикулярного вектора, расположенного по часовой стрелке.
     * @returns {Vector2D} Перпендикулярный вектор.
     */
    unitPerpToCW() {
        return this.perpToCW().normalized;
    }
    /**
     * Возвращение скалярного произведения с перпендикулярным вектором.
     * @param {Vector2D} vector - Вектор.
     * @returns {number} Скалярное произведение с перпендикулярным вектором.
     */
    dotPerp(vector) {
        return this.x * vector.y - this.y * vector.x;
    }
    /**
     * Сериализация вектора в строку.
     * @returns {string} Строка данных.
     */
    serializeToString() {
        return `${this.x};${this.y}`;
    }
    /**
     * Преобразование в вектор с нулевой X-компонентой.
     * @returns {Vector2D} Вектор.
     */
    toVector2X() {
        return new Vector2D(this.x, 0);
    }
    /**
     * Преобразование в вектор с нулевой Y-компонентой.
     * @returns {Vector2D} Вектор.
     */
    toVector2Y() {
        return new Vector2D(0, this.y);
    }
    // Перегрузка операторов (эмуляция)
    /**
     * Сложение векторов.
     * @param {Vector2D} other - Второй вектор.
     * @returns {Vector2D} Сумма векторов.
     */
    add(other) {
        return new Vector2D(this.x + other.x, this.y + other.y);
    }
    /**
     * Вычитание векторов.
     * @param {Vector2D} other - Второй вектор.
     * @returns {Vector2D} Разность векторов.
     */
    subtract(other) {
        return new Vector2D(this.x - other.x, this.y - other.y);
    }
    /**
     * Умножение вектора на скаляр.
     * @param {number} scalar - Скаляр.
     * @returns {Vector2D} Масштабированный вектор.
     */
    multiply(scalar) {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }
    /**
     * Деление вектора на скаляр.
     * @param {number} scalar - Скаляр.
     * @returns {Vector2D} Масштабированный вектор.
     */
    divide(scalar) {
        return new Vector2D(this.x / scalar, this.y / scalar);
    }
    /**
     * Сравнение векторов на равенство.
     * @param {Vector2D} other - Второй вектор.
     * @returns {boolean} Статус равенства векторов.
     */
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
    /**
     * Преобразование к текстовому представлению.
     * @returns {string} Текстовое представление вектора.
     */
    toString() {
        return `X = ${this.x.toFixed(2)}; Y = ${this.y.toFixed(2)}`;
    }
}
//# sourceMappingURL=Vector2.js.map