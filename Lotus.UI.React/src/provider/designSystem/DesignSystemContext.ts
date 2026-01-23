import { createContext } from 'react';
import { DesignSystem } from '#designSystem';
import { TColorScheme } from '#designSystem/types';

export interface IDesignSystemContextType
{
  designSystem:DesignSystem,
  setDesignSystem: (designSystem: DesignSystem) => void;
  setColorScheme: (colorScheme: TColorScheme) => void;
}

export const DesignSystemContext = createContext<IDesignSystemContextType | undefined>(undefined);