import { DataAttributes, InputDescriptionProps, InputErrorProps, InputLabelProps } from '@mantine/core';
import { JSX } from 'react/jsx-runtime';
import { IGeneralBackgroundProperties, IGeneralContainerProperties } from '#base';
import { IHorizontalStackProps } from '#components/Layout';
import { TSizeType } from '#types';
/**
 * Определение базовых данных для представления контрола в контейнере
 */
export interface IBaseContainerControlProps extends IGeneralContainerProperties, IGeneralBackgroundProperties {
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
/**
 * Определение данных для представления контрола в горизонтальном контейнере
 */
export interface IContainerControlProps extends IBaseContainerControlProps, IHorizontalStackProps {
    control: JSX.Element;
}
/**
 * Базовый компонент для представления контрола в горизонтальном контейнере
 */
export declare function ContainerControl(props: IContainerControlProps): JSX.Element;
//# sourceMappingURL=ContainerControl.d.ts.map