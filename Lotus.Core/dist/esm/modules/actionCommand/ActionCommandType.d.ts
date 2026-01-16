/**
 *  Массив значений типов команд действий
 */
export declare const TActionCommandTypeValues: readonly ["default", "navigation", "delimiter"];
/**
 * Стандартные типы команды действия
 */
export type TActionCommandType = (typeof TActionCommandTypeValues)[number];
/**
 * Объект для представления стандартных типов команды действия
 */
export declare const TActionCommandTypes: {
    /**
     * Команда по умолчанию
     */
    readonly Default: "default";
    /**
     * Команда навигации
     */
    readonly Navigation: "navigation";
    /**
     * Не команда а разделитель
     */
    readonly Delimiter: "delimiter";
    readonly getAllValues: () => typeof TActionCommandTypeValues;
    readonly isActionCommandType: (value: unknown) => value is TActionCommandType;
    readonly getByIndex: (index: number) => TActionCommandType | undefined;
    readonly getByName: (name: string) => TActionCommandType | undefined;
};
//# sourceMappingURL=ActionCommandType.d.ts.map