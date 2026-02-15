import { StringHelper } from 'lotus-core/helpers';
/**
 * Массив значений цветовой схемы
 */
export const TColorSchemeValues = ['light', 'dark'];
/**
 * Enum цветовой схемы
 */
export const TColorSchemes = {
    Light: TColorSchemeValues[0],
    Dark: TColorSchemeValues[1],
    /**
     * Возвращает массив всех возможных значений
     */
    getAllValues() {
        return TColorSchemeValues;
    },
    /**
     * Type Guard для проверки принадлежности значения к TColorScheme
     */
    isColorScheme(value) {
        if (typeof value === 'string') {
            return TColorSchemeValues.includes(value);
        }
        return false;
    },
    /**
     * Возвращает значение по индексу
     */
    getByIndex(index) {
        return TColorSchemeValues[index];
    },
    /**
     * Возвращает значение по строковому имени
     */
    getByName(name) {
        return TColorSchemeValues.find((v) => v === name);
    },
    /**
   * Набор цветовых схем в виде опций
   */
    getAsOptions() {
        return TColorSchemeValues.map((x) => {
            return {
                label: StringHelper.capitalizeFirstLetter(x),
                value: x
            };
        });
    }
};
//# sourceMappingURL=ColorScheme.js.map