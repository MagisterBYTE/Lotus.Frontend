import * as React from 'react';
import { DesignSystemContext, type IDesignSystemContextType } from './DesignSystemContext';

export const useDesignSystemContext = (): IDesignSystemContextType => 
{
  const context = React.useContext(DesignSystemContext);

  if (!context) 
  {
    throw new Error(
      'You can use "useDesignSystemContext" hook only within a <DesignSystemProvider> component.'
    );
  }

  return context;
};
