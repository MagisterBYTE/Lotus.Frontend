import { TColorToken } from 'lotus-core/modules/color';
import { IRecordObject } from 'lotus-core/types';
import { CSSProperties } from 'react';
import { TCssColor } from '#types';
type TEffectProperties = CSSProperties | IRecordObject;
export declare abstract class InteractivityEffectHover {
    /**
     * Вспомогательный метод для объединения стилей без перезаписи &:hover
     */
    static combine(...styles: TEffectProperties[]): TEffectProperties;
    /**
     * Эффект изменения прозрачности (Opacity)
     * @param value Значение прозрачности при наведении (0.8 = 80%)
     * @param target 'self' - весь элемент, 'background' - только фон (если поддерживается)
     */
    static getOpacity(value?: number, target?: 'self' | 'background'): TEffectProperties;
    /**
     * Эффект плавного масштабирования (Scale)
     * @param ratio Коэффициент увеличения (1.05 = +5%)
     */
    static getScale(ratio?: number): TEffectProperties;
    /**
     * Эффект "Свечения" краев (Glow)
     * Создает внешнюю ауру в цвет акцента
     */
    static getGlow(accentColor: TCssColor | TColorToken, intensity?: 'soft' | 'strong'): TEffectProperties;
    /**
     * Эффект легкого приподнятия с тенью
     */
    static getLift(shadow?: string): TEffectProperties;
    /**
     * Эффект "волны" (перелива) по фону
     */
    static getWave(accentColor: TCssColor | TColorToken): TEffectProperties;
    /**
     * Максимальный интерактив: Подъем + Волна + Свечение
     */
    static getFullInteraction(accentColor: TCssColor | TColorToken): TEffectProperties;
    /**
     * Элегантный эффект для интерактивных элементов:
     * Легкое масштабирование + затухание прозрачности
     */
    static getFadedScale(ratio?: number, opacity?: number): TEffectProperties;
}
export {};
//# sourceMappingURL=InteractivityEffectHover.d.ts.map