import { IOption } from 'lotus-core/modules/option';
import { IGeneralIconProperties } from '#base';
import { IHorizontalStackProps } from '#components/Layout';
import { TSizeType } from '#types';
export interface IOptionProps extends IGeneralIconProperties {
    /**
     * Опция
     */
    option: IOption;
    /**
     * Размер элемента UI
     */
    size?: TSizeType;
    /**
     * Следует ли обвернуть в горизонтальный контейнер
     */
    wrapContainer?: IHorizontalStackProps;
}
export declare const Option: import("react").MemoExoticComponent<(props: IOptionProps) => import("react/jsx-runtime").JSX.Element>;
//# sourceMappingURL=Option.d.ts.map