/**
 * Массив доступных размеров
 */
export const TSizeTypeValues = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
/**
 * Размер
 */
export const TSizeTypes = {
    xxs: TSizeTypeValues[0],
    xs: TSizeTypeValues[1],
    sm: TSizeTypeValues[2],
    md: TSizeTypeValues[3],
    lg: TSizeTypeValues[4],
    xl: TSizeTypeValues[5],
    xxl: TSizeTypeValues[6],
    getAllValues() {
        return TSizeTypeValues;
    },
    isSizeType(value) {
        if (typeof value === 'string') {
            return TSizeTypeValues.includes(value);
        }
        return false;
    },
    getByIndex(index) {
        return TSizeTypeValues[index];
    },
    getByName(name) {
        return TSizeTypeValues.find((v) => v === name);
    },
    /**
     * Получить следующий размер
     * @param currentSize текущий размер
     * @param step шаг увеличения (по умолчанию 1)
     * @param maxSize максимальный размер (по умолчанию 'xxl')
     * @returns следующий размер или максимальный если достигнут предел
     */
    next(currentSize, step = 1, maxSize = 'xxl') {
        const currentIndex = TSizeTypeValues.indexOf(currentSize);
        if (currentIndex === -1)
            return currentSize;
        const maxIndex = TSizeTypeValues.indexOf(maxSize);
        const nextIndex = Math.min(currentIndex + step, maxIndex);
        return TSizeTypeValues[nextIndex] || currentSize;
    },
    /**
     * Получить предыдущий размер
     * @param currentSize текущий размер
     * @param step шаг уменьшения (по умолчанию 1)
     * @param minSize минимальный размер (по умолчанию 'xxs')
     * @returns предыдущий размер или минимальный если достигнут предел
     */
    prev(currentSize, step = 1, minSize = 'xxs') {
        const currentIndex = TSizeTypeValues.indexOf(currentSize);
        if (currentIndex === -1)
            return currentSize;
        const minIndex = TSizeTypeValues.indexOf(minSize);
        const prevIndex = Math.max(currentIndex - step, minIndex);
        return TSizeTypeValues[prevIndex] || currentSize;
    },
    /**
     * Ограничить размер
     * @param currentSize текущий размер
     * @param minSize минимальный размер (по умолчанию 'xs')
     * @param maxSize максимальный размер (по умолчанию 'xl')
     * @returns Размер ограниченный в пределах
     */
    clamp(currentSize, minSize = 'xs', maxSize = 'xl') {
        const currentIndex = TSizeTypeValues.indexOf(currentSize);
        if (currentIndex === -1)
            return currentSize;
        const minIndex = TSizeTypeValues.indexOf(minSize);
        const maxIndex = TSizeTypeValues.indexOf(maxSize);
        let index = currentIndex;
        if (index > maxIndex)
            index = maxIndex;
        if (index < minIndex)
            index = minIndex;
        return TSizeTypeValues[index] || currentSize;
    },
    /**
     * Приводит любой TSizeType к ограниченному набору 'xs'-'xl'
     */
    truncated(size) {
        if (size === 'xxs')
            return 'xs';
        if (size === 'xxl')
            return 'xl';
        return size;
    }
};
//# sourceMappingURL=SizeType.js.map