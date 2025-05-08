import { TKey } from '../../types';
export type FunctionOptionDelegate = (option: IOption, context?: any) => any;
/**
 * Интерфейс представляющий некую опцию
 */
export interface IOption<TValueOption extends TKey = TKey> {
    /**
     * Значение
     */
    value: TValueOption;
    /**
     * Текст
     */
    label: string;
    /**
     * Статус доступности опции
     */
    isDisabled?: boolean;
    /**
     * Путь к изображению / либо компонент иконки / либо индекс изображения в базе / либо делегат для рисования иконки
     */
    icon?: any | FunctionOptionDelegate;
    /**
     *  Делегат для рисования опции
     */
    render?: FunctionOptionDelegate;
}
