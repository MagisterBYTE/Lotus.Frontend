import { SegmentedControlProps } from '@mantine/core';
import { IOption } from 'lotus-core/modules/option';
import { TKey } from 'lotus-core/types';
import { JSX } from 'react';
import { IHorizontalStackProps } from '#components/Layout';
import { IBaseFieldProps } from '../ContainerField/ContainerField';
export interface ISegmentedFieldProps<TValueOption extends TKey = TKey> extends IBaseFieldProps, IHorizontalStackProps {
    options: IOption<TValueOption>[];
    onChanged?: (value: TValueOption | undefined) => void;
    value?: TValueOption;
    segmentedProps?: Omit<SegmentedControlProps, keyof IBaseFieldProps | 'data' | 'value'>;
}
export declare function SegmentedField<TValueOption extends TKey = TKey>(props: ISegmentedFieldProps<TValueOption>): JSX.Element;
//# sourceMappingURL=SegmentedField.d.ts.map