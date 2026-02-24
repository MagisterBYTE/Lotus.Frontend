import { IOptionProps } from '../Option';
export interface IItemProps extends Omit<IOptionProps, 'option'> {
    /**
     * Элементе
     */
    item: unknown;
}
export declare const Item: import("react").MemoExoticComponent<(props: IItemProps) => import("react/jsx-runtime").JSX.Element>;
//# sourceMappingURL=Item.d.ts.map