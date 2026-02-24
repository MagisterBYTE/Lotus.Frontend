import { IGeneralIconProperties } from '#base';
export interface IIconProps extends IGeneralIconProperties {
    /**
     * Настройки CORS запросов для данных получаемых элементом
     */
    crossOrigin?: '' | 'anonymous' | 'use-credentials';
}
export declare const Icon: import("react").MemoExoticComponent<(props: IIconProps) => import("react/jsx-runtime").JSX.Element | null>;
//# sourceMappingURL=Icon.d.ts.map