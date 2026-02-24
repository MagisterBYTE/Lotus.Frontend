import { IGeneralTextProperties } from '#base';
export interface ISpanProps extends IGeneralTextProperties {
    /**
     * Текст
     */
    text: string;
    /**
     * Статус недоступности
     */
    disabled?: boolean;
}
export declare const Span: import("react").MemoExoticComponent<(props: ISpanProps) => import("react/jsx-runtime").JSX.Element>;
//# sourceMappingURL=Span.d.ts.map