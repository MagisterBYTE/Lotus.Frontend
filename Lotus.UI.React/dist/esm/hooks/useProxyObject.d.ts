import type { IRefreshProxy } from 'lotus-core/modules/refreshProxy';
export interface IProxyObjectProps<TType extends IRefreshProxy> {
    object: TType;
}
export declare function useProxyObject<TType extends IRefreshProxy>(props: IProxyObjectProps<TType>): TType;
//# sourceMappingURL=useProxyObject.d.ts.map