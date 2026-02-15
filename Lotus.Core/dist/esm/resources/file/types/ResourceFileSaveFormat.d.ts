/**
 * Массив форматов хранения файла в базе данных.
 */
export declare const TResourceFileSaveFormatValues: readonly ["base64", "raw"];
/**
 * Формат хранения файла в базе данных.
 */
export type TResourceFileSaveFormat = (typeof TResourceFileSaveFormatValues)[number];
/**
 * Enum формата хранения файла в базе данных.
 */
export declare const TResourceFileSaveFormats: {
    /**
     * Данные файла в формате строки base64.
     */
    readonly Base64: "base64";
    /**
     * Данные файла в формате байтового массива.
     */
    readonly Raw: "raw";
    readonly getAllValues: () => typeof TResourceFileSaveFormatValues;
    readonly isResourceFileSaveFormat: (value: unknown) => value is TResourceFileSaveFormat;
    readonly getByIndex: (index: number) => TResourceFileSaveFormat | undefined;
    readonly getByName: (name: string) => TResourceFileSaveFormat | undefined;
};
//# sourceMappingURL=ResourceFileSaveFormat.d.ts.map