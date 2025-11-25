import { IGeneralTextProperties } from '#base';
import { TThemeColor } from '#theme/types';
/**
 * Интерактивное взаимодействие текста элемента
 */
export interface IInteractivityTextProperties extends IGeneralTextProperties {
    /**
     * Цвет текста при наведении
     */
    hoverTextColor?: TThemeColor;
    /**
     * Цвет текста при нажатии
     */
    pressedTextColor?: TThemeColor;
}
//# sourceMappingURL=InteractivityTextProperties.d.ts.map