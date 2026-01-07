import { IDesignSystem } from '#designSystem';
export interface IDesignSystemContextType {
    designSystem: IDesignSystem;
    setDesignSystem: (designSystem: IDesignSystem) => void;
}
export declare const DesignSystemContext: import("react").Context<IDesignSystemContextType | undefined>;
//# sourceMappingURL=DesignSystemContext.d.ts.map