import { DesignSystem } from '#designSystem';
import { TColorScheme } from '#designSystem/types';
export interface IDesignSystemContextType {
    designSystem: DesignSystem;
    setDesignSystem: (designSystem: DesignSystem) => void;
    setColorScheme: (colorScheme: TColorScheme) => void;
}
export declare const DesignSystemContext: import("react").Context<IDesignSystemContextType | undefined>;
//# sourceMappingURL=DesignSystemContext.d.ts.map