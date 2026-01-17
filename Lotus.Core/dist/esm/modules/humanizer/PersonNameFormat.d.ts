/**
 * Массив значений форматов имени
 */
export declare const TPersonNameFormatValues: readonly ["short", "full", "display", "initials"];
/**
 * Форматы имени
 */
export type TPersonNameFormat = (typeof TPersonNameFormatValues)[number];
/**
 * Объект для представления форматов имени
 */
export declare const TPersonNameFormats: {
    readonly Short: "short";
    readonly Full: "full";
    readonly Display: "display";
    readonly Initials: "initials";
    readonly getAllValues: () => typeof TPersonNameFormatValues;
    readonly isPersonNameFormat: (value: unknown) => value is TPersonNameFormat;
    readonly getByIndex: (index: number) => TPersonNameFormat | undefined;
    readonly getByName: (name: string) => TPersonNameFormat | undefined;
};
//# sourceMappingURL=PersonNameFormat.d.ts.map