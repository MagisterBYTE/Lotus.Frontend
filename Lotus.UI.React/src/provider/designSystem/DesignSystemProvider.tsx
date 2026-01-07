import { ColorCssHelper } from 'lotus-core/modules/color';
import { useEffect, useState } from 'react';
import { DesignSystemBuilder, DesignSystemConstants, IDesignSystem } from '#designSystem';
import { TColorScheme } from '#designSystem/types';
import { DesignSystemContext } from './DesignSystemContext';

export interface IDesignSystemProviderProps
{
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

export const DesignSystemProvider = (props: IDesignSystemProviderProps) => 
{
  const { colorScheme, params, children } = props;
  const [designSystem, setDesignSystem] = useState<IDesignSystem>(DesignSystemBuilder.create(params, colorScheme));
  const [providerKey, setProviderKey] = useState(0); // Ключ для принудительного обновления

  useEffect(() => 
  {
    const newDesignSystem = DesignSystemBuilder.create(params, colorScheme);
    setDesignSystem(newDesignSystem);

    if (colorScheme === 'light')
    {
      ColorCssHelper.isLight = true;
    }
    if (colorScheme === 'dark')
    {
      ColorCssHelper.isLight = false;
    }

    if (colorScheme)
    {
      document.documentElement.setAttribute(DesignSystemConstants.DataAttributeColorScheme, colorScheme);
    }
    
    // В память
    newDesignSystem.fontSizes.applyToCssVariable();
    newDesignSystem.lineSpacingSizes.applyToCssVariable();
    newDesignSystem.marginSizes.applyToCssVariable();
    newDesignSystem.paddingSizes.applyToCssVariable();
    newDesignSystem.gapSizes.applyToCssVariable();
    newDesignSystem.radiusSizes.applyToCssVariable();
    newDesignSystem.font.applyToCssVariable();
    newDesignSystem.border.applyToCssVariable();
    newDesignSystem.text.applyToCssVariable();
    newDesignSystem.background.applyToCssVariable();

    // Увеличиваем ключ для принудительного ререндера всех детей
    setProviderKey(prev => prev + 1);
  }, [params, colorScheme]);

  return (
    <DesignSystemContext.Provider
      key={providerKey} 
      value={{
        setDesignSystem: setDesignSystem,
        designSystem: designSystem
      }}
    >
      {children}
    </DesignSystemContext.Provider>
  );
};
