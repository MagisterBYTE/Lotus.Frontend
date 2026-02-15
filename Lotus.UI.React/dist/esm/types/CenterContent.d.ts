/**
 * Массив доступных значений центрирования контента
 */
export declare const TCenterContentValues: readonly ["horizontally", "vertically", "center"];
/**
 * Тип центрирования контента
 */
export type TCenterContent = (typeof TCenterContentValues)[number];
/**
 * Enum типа центрирования контента
 */
export declare const TCenterContents: {
    readonly Horizontally: "horizontally";
    readonly Vertically: "vertically";
    readonly Center: "center";
    readonly getAllValues: () => typeof TCenterContentValues;
    readonly isCenterContent: (value: unknown) => value is TCenterContent;
    readonly getByIndex: (index: number) => TCenterContent | undefined;
    readonly getByName: (name: string) => TCenterContent | undefined;
};
//# sourceMappingURL=CenterContent.d.ts.map