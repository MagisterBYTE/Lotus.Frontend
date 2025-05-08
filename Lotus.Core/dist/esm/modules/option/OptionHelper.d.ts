import { TKey } from '../../types';
import { IOption } from './Option';
export declare class OptionHelper {
    /**
     * Преобразование значение в значение корректного типа
     * @param options Список опций
     * @param value Значение
     * @returns Значение корректного типа
     */
    static convertValue(options: IOption[], value: TKey): TKey;
    /**
     * Преобразование в типизированный массив
     * @param options Список опций
     * @returns
     */
    static convertToNumber(options: IOption[]): IOption[];
    /**
     * Преобразование в типизированный массив
     * @param options Список опций
     * @returns
     */
    static convertToString(options: IOption[]): IOption[];
    /**
     * Получение корректного значения по умолчанию или первого значения из списка опций
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns Значение по умолчанию или первого значения из списка опций
     */
    static getValueOrFirst<TValueOption extends TKey = TKey>(options: IOption[], initialSelectedValue?: TValueOption): TValueOption;
    /**
     * Получение корректного текста по умолчанию или первого значения текста из списка опций
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns Корректный текст по умолчанию или первое значения текста из списка опций
     */
    static getLabelOrFirst<TValueOption extends TKey = TKey>(options: IOption[], initialSelectedValue?: TValueOption): string;
    /**
     * Получение корректной иконки по умолчанию или первой иконки из списка опций
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns Корректная иконка по умолчанию или первая иконка из списка опций
     */
    static getIconOrFirst<TValueOption extends TKey = TKey>(options: IOption[], initialSelectedValue?: TValueOption): any;
    /**
     * Получение корректного списка текста по умолчанию или пустой список
     * @param options Список опций
     * @param initialSelectedValues Список начальных значение
     * @returns Массив текста выбранных значений или пустой список
     */
    static getLabelsOrEmpty<TValueOption extends TKey = TKey>(options: IOption[], initialSelectedValues?: TValueOption[]): string[];
    /**
     * Получение опций из значения опций или первой опции
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Опция
     */
    static getOptionByValueOrFirst(options: IOption[], selectedValue?: TKey): IOption;
    /**
     * Получение опций из значения опций или undefined
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Опция или undefined
     */
    static getOptionByValueOrUndefined(options: IOption[], selectedValue?: TKey): IOption | undefined;
    /**
     * Получение текста из значения опций
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Текст выбранного значения
     */
    static getLabelByValue(options: IOption[], selectedValue?: TKey): string;
    /**
     * Получение иконки из значения опций
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Иконка выбранного значения
     */
    static getIconByValue(options: IOption[], selectedValue?: TKey): any;
    /**
     * Получение массива опций из выбранных значений опций
     * @param options Массив всех опций
     * @param selectedValues Выбранные значения
     * @returns Массив опций
     */
    static getOptionsByValues(options: IOption[], selectedValues?: TKey | TKey[]): IOption[];
    /**
     * Получение массива текста из выбранных значений опций
     * @param options Массив всех опций
     * @param selectedValues Выбранные значения
     * @returns Массив текста выбранных значений
     */
    static getLabelsByValues(options: IOption[], selectedValues?: TKey[]): string[];
    /**
     * Получение массива текста из неопределённого значения(свойства объекта)
     * @param options Массив всех опций
     * @param item Неопределённое значение
     * @returns Массив текста выбранных значений
     */
    static getLabelsByUnknownValues(options: IOption[], item: any): string[];
    /**
     * Проверка на наличие опции
     * @param options Массив всех опций
     * @param value Выбранное значение
     * @returns Статус наличия опции
     */
    static hasOption(options: IOption[], value?: TKey): boolean;
    /**
     * Проверка на наличие иконки
     * @param options Массив всех опций
     * @param context Контекст вызова
     * @returns Статус наличия иконки
     */
    static hasIcons(options: IOption[], context?: any): boolean;
}
