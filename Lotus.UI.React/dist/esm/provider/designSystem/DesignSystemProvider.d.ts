import { IDesignSystem } from '#designSystem';
import { TColorScheme } from '#designSystem/types';
export interface IDesignSystemProviderProps {
    /**
     * Ключ для сохранения/загрузки состояния дизайн-системы
     */
    keySave?: string;
    /**
     * Цветовая схема
     */
    colorScheme?: TColorScheme;
    /**
     * Параметры дизайн-системы
     */
    params?: Partial<IDesignSystem>;
    /**
     * Дочерние элементы
     */
    children: React.ReactNode;
}
export declare const DesignSystemProvider: (props: IDesignSystemProviderProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=DesignSystemProvider.d.ts.map