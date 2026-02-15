import { TKey } from 'lotus-core/types';
import { ReactNode } from 'react';
import { IContextRenderBase } from '#types';

export type RenderFunction<TItem> = (item?: TItem, contextRender?: IContextRenderBase) => ReactNode

/**
 * Базовый интерфейс для компонентов, работающих с выбором одного элемента из массива элементов
 */
export interface IItemsBaseOneProps<TItem>
{
  /**
   * Массив элементов
   */
  items: TItem[];

  /**
   * Функция, вызываемая при выборе элемента
   * @param item Выбранный элемент или undefined
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
   * Функция для отрисовки элемента в выпадающем списке
   * Если true то используется расширенная с отображением иконок
   */
  renderItem?: RenderFunction<TItem>|true;

  /**
   * Функция для отрисовки выбранного элемента
   * Если true то используется расширенная с отображением иконок
   */
  renderValue?: RenderFunction<TItem>|true;
}

/**
 * Базовый интерфейс для компонентов, работающих с выбором нескольких элементов из массива элементов
 */
export interface IItemsBaseMultiProps<TItem>
{
  /**
   * Массив элементов
   */
  items: TItem[];

  /**
   * Функция, вызываемая при выборе элементов
   * @param items Массив выбранных элементов или пустой массив
   */
  onChangedItems?: (items: TItem[]) => void;

  /**
   * Выбранные элементы
   */
  selectedItems?: TItem[];

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
   * Функция для отрисовки элемента в выпадающем списке
   * Если true то используется расширенная с отображением иконок
   */
  renderItem?: RenderFunction<TItem>|true;

  /**
   * Функция для отрисовки выбранного элемента
   * Если true то используется расширенная с отображением иконок
   */
  renderValue?: RenderFunction<TItem>|true;
}