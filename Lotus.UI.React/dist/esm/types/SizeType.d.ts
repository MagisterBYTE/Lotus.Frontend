/**
 * Массив доступных размеров
 */
export declare const TSizeTypeValues: readonly ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"];
/**
 * Определение тип размера
 */
export type TSizeType = (typeof TSizeTypeValues)[number];
/**
 * Усеченный тип размера (без xxs и xxl)
 */
export type TTruncatedSizeType = Extract<TSizeType, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
/**
 * Размер
 */
export declare const TSizeTypes: {
    readonly xxs: "xxs";
    readonly xs: "xs";
    readonly sm: "sm";
    readonly md: "md";
    readonly lg: "lg";
    readonly xl: "xl";
    readonly xxl: "xxl";
    readonly getAllValues: () => typeof TSizeTypeValues;
    readonly isSizeType: (value: unknown) => value is TSizeType;
    readonly getByIndex: (index: number) => TSizeType | undefined;
    readonly getByName: (name: string) => TSizeType | undefined;
    /**
     * Получить следующий размер
     * @param currentSize текущий размер
     * @param step шаг увеличения (по умолчанию 1)
     * @param maxSize максимальный размер (по умолчанию 'xxl')
     * @returns следующий размер или максимальный если достигнут предел
     */
    readonly next: (currentSize: TSizeType, step?: number, maxSize?: TSizeType) => TSizeType;
    /**
     * Получить предыдущий размер
     * @param currentSize текущий размер
     * @param step шаг уменьшения (по умолчанию 1)
     * @param minSize минимальный размер (по умолчанию 'xxs')
     * @returns предыдущий размер или минимальный если достигнут предел
     */
    readonly prev: (currentSize: TSizeType, step?: number, minSize?: TSizeType) => TSizeType;
    /**
     * Ограничить размер
     * @param currentSize текущий размер
     * @param minSize минимальный размер (по умолчанию 'xs')
     * @param maxSize максимальный размер (по умолчанию 'xl')
     * @returns Размер ограниченный в пределах
     */
    readonly clamp: (currentSize: TSizeType, minSize?: TSizeType, maxSize?: TSizeType) => TSizeType;
    /**
     * Приводит любой TSizeType к ограниченному набору 'xs'-'xl'
     */
    readonly truncated: (size: TSizeType) => TTruncatedSizeType;
};
//# sourceMappingURL=SizeType.d.ts.map