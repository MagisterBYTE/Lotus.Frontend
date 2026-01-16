import { IOption } from '#modules/option';
/**
 * Массив значений типов языков
 */
export declare const TLanguageTypeValues: readonly ["ru-RU", "en-US", "de-DE", "ja-JP", "zh-CN"];
/**
 * Тип языка
 */
export type TLanguageType = (typeof TLanguageTypeValues)[number];
/**
 * Набор языков
 */
export declare const TLanguageTypes: {
    readonly ru_RU: "ru-RU";
    readonly en_US: "en-US";
    readonly de_DE: "de-DE";
    readonly ja_JP: "ja-JP";
    readonly zh_CH: "zh-CN";
    readonly getAllValues: () => typeof TLanguageTypeValues;
    readonly isLanguageType: (value: unknown) => value is TLanguageType;
    readonly getByIndex: (index: number) => TLanguageType | undefined;
    readonly getByName: (name: string) => TLanguageType | undefined;
    readonly getOptions: () => IOption<TLanguageType>[];
};
//# sourceMappingURL=LanguageType.d.ts.map