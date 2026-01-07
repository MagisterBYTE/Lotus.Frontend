import { DataAttributes, InputDescriptionProps, InputErrorProps, InputLabelProps } from '@mantine/core';
import { JSX } from 'react/jsx-runtime';
import { IGeneralBackgroundProperties, IGeneralContainerProperties } from '#base';
import { IHorizontalStackProps } from '#components/Layout';
import { TSizeType } from '#types';
/**
 * Базовый компонент для представления поля для ввода и управления различными данными
 */
export interface IBaseFieldProps extends IGeneralContainerProperties, IGeneralBackgroundProperties {
    /**
     * Режим размещения надписи и поля в одну строку
     */
    inlinePlace?: boolean;
    /**
     * Размер элемента
     */
    size?: TSizeType;
    /**
     * Статус обязательности поля
     */
    required?: boolean;
    /**
     * Компонент надписи
     */
    label?: React.ReactNode;
    /**
     * Настройки надписи
     */
    labelProps?: InputLabelProps & DataAttributes;
    /**
     * Компонент описания
     */
    description?: React.ReactNode;
    /**
     * Настройки описания
     */
    descriptionProps?: InputDescriptionProps & DataAttributes;
    /**
     * Компонент для отображения ошибки
     */
    error?: React.ReactNode;
    /**
     * Настройки компонента ошибок
     */
    errorProps?: InputErrorProps & DataAttributes;
}
export interface IContainerFieldProps extends IBaseFieldProps, IHorizontalStackProps {
    componentField: JSX.Element;
}
export declare function ContainerField(props: IContainerFieldProps): JSX.Element;
//# sourceMappingURL=ContainerField.d.ts.map