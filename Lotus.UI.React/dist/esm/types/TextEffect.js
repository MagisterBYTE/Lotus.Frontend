/**
 * Массив возможных значений эффекта для текста
 */
export const TTextEffectValues = ['shadow', 'stroke', 'glow'];
/**
 * Enum типа эффекта для текста
 */
export const TTextEffects = {
    Shadow: TTextEffectValues[0],
    Stroke: TTextEffectValues[1],
    Glow: TTextEffectValues[2],
    getAllValues() {
        return TTextEffectValues;
    },
    isTextEffect(value) {
        if (typeof value === 'string') {
            return TTextEffectValues.includes(value);
        }
        return false;
    },
    getByIndex(index) {
        return TTextEffectValues[index];
    },
    getByName(name) {
        return TTextEffectValues.find((v) => v === name);
    }
};
//# sourceMappingURL=TextEffect.js.map