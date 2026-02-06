/**
 * Генератор, обеспечивающий точное процентное распределение значений
 * на фиксированном отрезке вызовов (пул вероятностей).
 */
export class RandomGuarantee {
    _capacity;
    _data;
    _rules = [];
    _currentIndex = -1;
    _random;
    /**
     * @param random Базовый генератор случайных чисел для перемешивания пула.
     * @param capacity Емкость пула (по умолчанию 100 для работы с процентами).
     */
    constructor(random, capacity = 100) {
        this._random = random;
        this._capacity = capacity;
        this._data = new Array(capacity).fill(-1);
    }
    // --- Свойства (Properties) ---
    /** Емкость генератора (окно гарантии) */
    get capacity() {
        return this._capacity;
    }
    /** Текущий индекс в перемешанном массиве данных */
    get currentIndex() {
        return this._currentIndex;
    }
    /** Копия текущего массива данных (пула) */
    get data() {
        return [...this._data];
    }
    /** Текущее выбранное значение */
    get currentValue() {
        if (this._currentIndex < 0 || this._currentIndex >= this._capacity)
            return -1;
        return this._data[this._currentIndex];
    }
    /** Список только установленных процентов (шансов) */
    get probability() {
        return this._rules.map((r) => r.percent);
    }
    /**
     * Детальный список вероятностей: каждое значение повторяется столько раз,
     * сколько оно фактически представлено в пуле согласно проценту.
     */
    get probabilityDetail() {
        const result = [];
        for (const rule of this._rules) {
            const count = Math.round((rule.percent * this._capacity) / 100);
            for (let i = 0; i < count; i++) {
                result.push(rule.index);
            }
        }
        return result;
    }
    /** Суммарная установленная вероятность в процентах */
    get totalProbabilitySetted() {
        return this._rules.reduce((sum, r) => sum + r.percent, 0);
    }
    // --- Основные методы ---
    /**
     * Пересобирает пул данных на основе правил и перемешивает его.
     * Автоматически вызывается при изменении правил.
     */
    reset() {
        let writePos = 0;
        // 1. Заполнение согласно правилам
        for (const rule of this._rules) {
            const count = Math.round((rule.percent * this._capacity) / 100);
            for (let i = 0; i < count && writePos < this._capacity; i++) {
                this._data[writePos++] = rule.index;
            }
        }
        // 2. Заполнение остатка "пустотой" (-1)
        while (writePos < this._capacity) {
            this._data[writePos++] = -1;
        }
        // 3. Перемешивание Фишера-Йейтса с использованием ILotusRandom
        for (let i = this._capacity - 1; i > 0; i--) {
            const j = this._random.nextInteger(i + 1);
            [this._data[i], this._data[j]] = [this._data[j], this._data[i]];
        }
        this._currentIndex = -1;
    }
    /** Добавить значение с указанным процентом вероятности */
    addProbability(index, probability) {
        this._rules.push({ index: index, percent: probability });
        this.reset();
    }
    /** Добавить список вероятностей (индексы присваиваются от 0 автоматически) */
    addProbabilityList(...probabilities) {
        probabilities.forEach((p, i) => this._rules.push({ index: i, percent: p }));
        this.reset();
    }
    /** Очистить все правила и данные */
    clearProbability() {
        this._rules = [];
        this._data.fill(-1);
        this._currentIndex = -1;
    }
    /**
     * Получить следующее значение из пула, сдвигая указатель.
     * Зацикливается при достижении конца.
     */
    nextProbability() {
        this._currentIndex = (this._currentIndex + 1) % this._capacity;
        return this._data[this._currentIndex];
    }
    /**
     * Получить следующее значение. Если достигнут конец пула —
     * происходит автоматическое переперемешивание (Reset).
     */
    nextProbabilityAndReset() {
        if (this._currentIndex >= this._capacity - 1) {
            this.reset();
        }
        return this.nextProbability();
    }
    /**
     * Безопасная проверка: совпадает ли СЛЕДУЮЩЕЕ значение с искомым индексом.
     * Если совпадает — указатель сдвигается вперед.
     */
    checkProbability(index) {
        const nextIdx = (this._currentIndex + 1) % this._capacity;
        if (this._data[nextIdx] === index) {
            this._currentIndex = nextIdx;
            return true;
        }
        return false;
    }
    /** Просто посмотреть следующее значение без сдвига указателя */
    peekNext() {
        const nextIdx = (this._currentIndex + 1) % this._capacity;
        return this._data[nextIdx];
    }
}
//# sourceMappingURL=RandomGuarantee.js.map