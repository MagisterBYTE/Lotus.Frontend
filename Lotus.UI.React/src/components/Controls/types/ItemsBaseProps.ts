import { TKey } from 'lotus-core/types';
import { ReactNode } from 'react';

/**
 * Базовый интерфейс для компонентов, работающих с массивом элементов
 */
export interface IItemsBaseProps<TItem>
{
  /**
   * Массив элементов
   */
  items: TItem[];

  /**
   * Функция, вызываемая при выборе элемента
   * @param item Выбранный элемент или undefined
   * @returns 
   */
  onChangedItem?: (item: TItem | undefined) => void;

  /**
   * Выбранный элемент
   */
  selectedItem?: TItem;

  /**
   * Функция для получения значения value элемента
   * @param item Элемент
   * @returns 
   */
  getValueItem?: (item: TItem) => TKey;

  /**
   * Функция для получения label элемента
   * @param item Элемент
   * @returns 
   */
  getLabelItem?: (item: TItem) => string;

  /**
   * Функция для получения статуса disabled элемента
   * @param item 
   * @returns 
   */
  getDisabledItem?: (item: TItem) => boolean | undefined;

  /**
   * Функция для отрисовки элемента
   * @param item Элемент
   * @returns 
   */
  renderItem?: (item: TItem) => ReactNode;
}