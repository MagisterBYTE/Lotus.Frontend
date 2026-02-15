/**
 * Массив значений компонента для элемента команды
 */
export declare const TCommandElementTypeValues: readonly ["button", "icon", "listItem", "menuItem"];
/**
 * Компонент отображения для элемента команды
 */
export type TCommandElementType = (typeof TCommandElementTypeValues)[number];
/**
 * Enum компонента отображения для элемента команды
 */
export declare const TCommandElementTypes: {
    readonly Button: "button";
    readonly Icon: "icon";
    readonly ListItem: "listItem";
    readonly MenuItem: "menuItem";
    /**
     * Возвращает массив всех возможных значений
     */
    readonly getAllValues: () => typeof TCommandElementTypeValues;
    /**
     * Type Guard для проверки принадлежности значения к TCommandElementType
     */
    readonly isCommandElementType: (value: unknown) => value is TCommandElementType;
    /**
     * Возвращает значение по индексу
     */
    readonly getByIndex: (index: number) => TCommandElementType | undefined;
    /**
     * Возвращает значение по строковому имени
     */
    readonly getByName: (name: string) => TCommandElementType | undefined;
};
//# sourceMappingURL=CommandElementType.d.ts.map