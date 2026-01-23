import { type TLanguageType } from 'lotus-core/localization';
export interface ILocalizationContextType {
    languageType: TLanguageType;
    setLanguageType: (languageType: TLanguageType) => void;
}
export declare const LocalizationContext: import("react").Context<ILocalizationContextType | undefined>;
//# sourceMappingURL=LocalizationContext.d.ts.map