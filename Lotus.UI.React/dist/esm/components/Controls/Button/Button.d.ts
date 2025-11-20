import React, { ComponentPropsWithRef, CSSProperties } from 'react';
import { IGeneralIconProperties } from '#base';
import { IInteractivityBackgroundEffect, IInteractivityElementProperties } from '#interactivity';
import { TButtonVariant } from './ButtonVariant';
export interface IButtonProps extends ComponentPropsWithRef<'button'>, IGeneralIconProperties, IInteractivityElementProperties, IInteractivityBackgroundEffect {
    /**
     * Стиль для кнопки
     */
    overrideButtonStyle?: CSSProperties;
    /**
     * Вариант отображения
     */
    variant?: TButtonVariant;
    /**
     * Статус возможности выбора
     */
    isSelectedStatus?: boolean;
    /**
     * Статус выбора
     */
    isSelected?: boolean;
    /**
     * Функция обратного вызова для установки выбранного значения
     * @param selected Статус выбора
     * @param value Выбранное значение
     * @returns
     */
    onSelected?: (selected: boolean, value?: any) => void;
}
export declare const Button: React.FC<IButtonProps>;
//# sourceMappingURL=Button.d.ts.map