import React, { ComponentPropsWithRef } from 'react';
import { IGeneralElementProperties, IGeneralIconProperties } from '#base';
import { IInteractivityBackgroundEffect, IInteractivityElementProperties } from '#interactivity';
import { TButtonVariant } from './ButtonVariant';
export interface IButtonProps extends ComponentPropsWithRef<'button'>, IGeneralElementProperties, IGeneralIconProperties, IInteractivityElementProperties, IInteractivityBackgroundEffect {
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