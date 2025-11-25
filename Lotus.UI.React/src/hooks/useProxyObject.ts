import type { IRefreshProxy } from 'lotus-core/modules/refreshProxy';
import { useState } from 'react';

export interface IProxyObjectProps<TType extends IRefreshProxy> 
{
  object: TType;
}

export function useProxyObject<TType extends IRefreshProxy>(props: IProxyObjectProps<TType>): TType
{
  const { object } = props;

  const [proxy, setProxy] = useState<{obj: TType}>({ obj: object });

  object.onRefreshProxy = onRefreshProxy;
  
  function onRefreshProxy() 
  {
    setProxy({ obj: object });
  }

  return proxy.obj;
}