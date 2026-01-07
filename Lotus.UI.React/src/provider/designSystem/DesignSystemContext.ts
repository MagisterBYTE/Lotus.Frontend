import { createContext } from 'react';
import { IDesignSystem } from '#designSystem';

export interface IDesignSystemContextType
{
  designSystem:IDesignSystem,
  setDesignSystem: (designSystem: IDesignSystem) => void;
}

export const DesignSystemContext = createContext<IDesignSystemContextType | undefined>(undefined);