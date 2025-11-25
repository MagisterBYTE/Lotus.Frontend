import { ReactNode } from 'react';
import { ILabelProps } from '#components/Display';
import { TElementSize } from '#types';
import { IBoxProps } from '../Box';
export interface IPanelProps extends IBoxProps {
    size?: TElementSize;
    header?: ReactNode;
    headerProps?: ILabelProps;
}
export declare function Panel(props: IPanelProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Panel.d.ts.map