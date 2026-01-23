import { ColorCssHelper } from 'lotus-core/modules/color';
import { useState } from 'react';
import { DesignSystem, DesignSystemHelper, IDesignSystem } from '#designSystem';
import { IDesignSystemData, TColorScheme } from '#designSystem/types';
import { DesignSystemContext } from './DesignSystemContext';

export interface IDesignSystemProviderProps
{
  /**
   * Ключ для сохранения/загрузки состояния дизайн-системы
   */
  keySave?: string;

  /**
   * Цветовая схема
   */
  colorScheme?: TColorScheme;

  /**
   * Параметры дизайн-системы
   */
  params?: Partial<IDesignSystem>

  /**
   * Дочерние элементы
   */
  children: React.ReactNode;
}

function createAndApplyDesignSystem(params: Partial<IDesignSystem>|undefined, actualColorScheme: TColorScheme, keySave?: string)
{
  // Создаем новую дизайн-систему
  const newDesignSystem = new DesignSystem(params, actualColorScheme);
  
  // Присваиваем значение глобальных переменных
  newDesignSystem.applyToCssVariable();

  // Присваиваем цветовую схему вспомогательному классу
  if (actualColorScheme === 'light')
  {
    ColorCssHelper.isLight = true;
  }
  if (actualColorScheme === 'dark')
  {
    ColorCssHelper.isLight = false;
  }

  // Данные дизайн-системы
  const designSystemData:IDesignSystemData = { colorScheme: actualColorScheme, primaryColor: 'blue' };

  // Сохраняем в документе
  DesignSystemHelper.setDocumentDesignSystem(designSystemData);

  // Сохраняем в локальное хранилище
  DesignSystemHelper.saveToStorage(keySave, designSystemData);

  return newDesignSystem;
}

export const DesignSystemProvider = (props: IDesignSystemProviderProps) => 
{
  // eslint-disable-next-line react/destructuring-assignment
  const loadData = DesignSystemHelper.loadFromStorage(props.keySave);

  const { colorScheme, params, children, keySave } = props;
  const actualColorScheme = loadData?.colorScheme ?? colorScheme ?? 'light';
  const [designSystem, setDesignSystem] = useState<DesignSystem>(createAndApplyDesignSystem(params, actualColorScheme, keySave));
  const [providerKey, setProviderKey] = useState(0); // Ключ для принудительного обновления

  const handleColorSchemeChange = (scheme: TColorScheme) =>
  {
    // Создаем новую дизайн-систему
    const newDesignSystem = createAndApplyDesignSystem(params, scheme, keySave);
    setDesignSystem(newDesignSystem);

    // Увеличиваем ключ для принудительного ререндера всех детей
    setProviderKey(prev => prev + 1);
  };

  return (
    <DesignSystemContext.Provider
      key={providerKey}
      value={{
        setDesignSystem: setDesignSystem,
        setColorScheme: handleColorSchemeChange,
        designSystem: designSystem
      }}
    >
      {children}
    </DesignSystemContext.Provider>
  );
};
