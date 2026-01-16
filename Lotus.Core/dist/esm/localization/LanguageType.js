/**
 * Массив значений типов языков
 */
export const TLanguageTypeValues = ['ru-RU', 'en-US', 'de-DE', 'ja-JP', 'zh-CN'];
/**
 * Набор языков
 */
export const TLanguageTypes = {
    ru_RU: TLanguageTypeValues[0],
    en_US: TLanguageTypeValues[1],
    de_DE: TLanguageTypeValues[2],
    ja_JP: TLanguageTypeValues[3],
    zh_CH: TLanguageTypeValues[4],
    getAllValues() {
        return TLanguageTypeValues;
    },
    isLanguageType(value) {
        return TLanguageTypeValues.includes(value);
    },
    getByIndex(index) {
        return TLanguageTypeValues[index];
    },
    getByName(name) {
        return TLanguageTypeValues.find((v) => v === name);
    },
    getOptions() {
        return TLanguageTypeValues.map((x) => {
            return {
                label: x,
                value: x
            };
        });
    }
};
//# sourceMappingURL=LanguageType.js.map