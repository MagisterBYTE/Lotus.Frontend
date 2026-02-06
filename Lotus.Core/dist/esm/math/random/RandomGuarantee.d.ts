import { IRandomGenerator } from './RandomGenerator';
/**
 * Генератор, обеспечивающий точное процентное распределение значений
 * на фиксированном отрезке вызовов (пул вероятностей).
 */
export declare class RandomGuarantee {
    private _capacity;
    private _data;
    private _rules;
    private _currentIndex;
    private _random;
    /**
     * @param random Базовый генератор случайных чисел для перемешивания пула.
     * @param capacity Емкость пула (по умолчанию 100 для работы с процентами).
     */
    constructor(random: IRandomGenerator, capacity?: number);
    /** Емкость генератора (окно гарантии) */
    get capacity(): number;
    /** Текущий индекс в перемешанном массиве данных */
    get currentIndex(): number;
    /** Копия текущего массива данных (пула) */
    get data(): number[];
    /** Текущее выбранное значение */
    get currentValue(): number;
    /** Список только установленных процентов (шансов) */
    get probability(): number[];
    /**
     * Детальный список вероятностей: каждое значение повторяется столько раз,
     * сколько оно фактически представлено в пуле согласно проценту.
     */
    get probabilityDetail(): number[];
    /** Суммарная установленная вероятность в процентах */
    get totalProbabilitySetted(): number;
    /**
     * Пересобирает пул данных на основе правил и перемешивает его.
     * Автоматически вызывается при изменении правил.
     */
    reset(): void;
    /** Добавить значение с указанным процентом вероятности */
    addProbability(index: number, probability: number): void;
    /** Добавить список вероятностей (индексы присваиваются от 0 автоматически) */
    addProbabilityList(...probabilities: number[]): void;
    /** Очистить все правила и данные */
    clearProbability(): void;
    /**
     * Получить следующее значение из пула, сдвигая указатель.
     * Зацикливается при достижении конца.
     */
    nextProbability(): number;
    /**
     * Получить следующее значение. Если достигнут конец пула —
     * происходит автоматическое переперемешивание (Reset).
     */
    nextProbabilityAndReset(): number;
    /**
     * Безопасная проверка: совпадает ли СЛЕДУЮЩЕЕ значение с искомым индексом.
     * Если совпадает — указатель сдвигается вперед.
     */
    checkProbability(index: number): boolean;
    /** Просто посмотреть следующее значение без сдвига указателя */
    peekNext(): number;
}
//# sourceMappingURL=RandomGuarantee.d.ts.map