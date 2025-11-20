import
{
  IGeneralBackgroundProperties,
  IGeneralBorderProperties,
  IGeneralContainerProperties,
  IGeneralIconProperties,
  IGeneralMarginProperties,
  IGeneralPaddingProperties,
  IGeneralTextProperties
} from '#base';
import { TThemeColors } from '#theme/types';
import { TCssBorderStyles, TElementRadiuses, TElementSizes, TElementSpacings, TFontSizes, TIconPlacements, TLineSpacings, TShadowElevations, TTextEffects } from '#types';
import { ArgTypes } from 'storybook/internal/types';
import { IBaseFieldProps } from '../components/Controls/ContainerField/ContainerField';

export abstract class ArgTypesStory
{
  public static readonly Padding: Partial<ArgTypes<IGeneralPaddingProperties>> = {
    p: { control: 'inline-radio', options: [...TElementSpacings, undefined], table: { category: 'Padding & Margin' } },
    pl: { control: 'inline-radio', options: [...TElementSpacings, undefined], table: { category: 'Padding & Margin' } },
    pt: { control: 'inline-radio', options: [...TElementSpacings, undefined], table: { category: 'Padding & Margin' } },
    pr: { control: 'inline-radio', options: [...TElementSpacings, undefined], table: { category: 'Padding & Margin' } },
    pb: { control: 'inline-radio', options: [...TElementSpacings, undefined], table: { category: 'Padding & Margin' } }
  };

  public static readonly Margin: Partial<ArgTypes<IGeneralMarginProperties>> = {
    m: { control: 'inline-radio', options: [...TElementSpacings, undefined], table: { category: 'Padding & Margin' } },
    ml: { control: 'inline-radio', options: [...TElementSpacings, undefined], table: { category: 'Padding & Margin' } },
    mt: { control: 'inline-radio', options: [...TElementSpacings, undefined], table: { category: 'Padding & Margin' } },
    mr: { control: 'inline-radio', options: [...TElementSpacings, undefined], table: { category: 'Padding & Margin' } },
    mb: { control: 'inline-radio', options: [...TElementSpacings, undefined], table: { category: 'Padding & Margin' } }
  };

  public static readonly Border: Partial<ArgTypes<IGeneralBorderProperties>> = {
    withBorder: { control: 'boolean', table: { category: 'Border' } },
    borderColor: { control: 'select', options: [undefined, ...TThemeColors], table: { category: 'Border' } },
    borderStyle: { control: 'inline-radio', options: [...TCssBorderStyles, undefined], table: { category: 'Border' } },
    borderWidth: { control: 'number', table: { category: 'Border' } },
    borderRadius: { control: 'inline-radio', options: [...TElementRadiuses, undefined], table: { category: 'Border' } },
    borderRadiusTopLeft: { control: 'inline-radio', options: [...TElementRadiuses, undefined], table: { category: 'Border' } },
    borderRadiusTopRight: { control: 'inline-radio', options: [...TElementRadiuses, undefined], table: { category: 'Border' } },
    borderRadiusBottomLeft: { control: 'inline-radio', options: [...TElementRadiuses, undefined], table: { category: 'Border' } },
    borderRadiusBottomRight: { control: 'inline-radio', options: [...TElementRadiuses, undefined], table: { category: 'Border' } },
    borderShadow: { control: 'select', options: [undefined, ...TShadowElevations], table: { category: 'Border' } }
  };

  public static readonly Size: Partial<ArgTypes<IGeneralContainerProperties>> = {
    w: { control: 'inline-radio', options: ['min-content', 'max-content', '100%', '50%', '30%', '30vw', '50vw', '90vw', undefined], table: { category: 'Size' } },
    h: { control: 'inline-radio', options: ['min-content', 'max-content', '100%', '50%', '30%', '30vw', '50vw', '90vw', undefined], table: { category: 'Size' } },
    grow: { control: 'number', table: { category: 'Size' } },
    shrink: { control: 'number', table: { category: 'Size' } }
  };

  public static readonly Background: Partial<ArgTypes<IGeneralBackgroundProperties>> = {
    backColor: { control: 'select', options: [undefined, ...TThemeColors], table: { category: 'Background' } },
    shadow: { control: 'select', options: [undefined, ...TShadowElevations], table: { category: 'Background' } }
  };

  public static readonly Text: Partial<ArgTypes<IGeneralTextProperties>> = {
    fontSize: { control: 'inline-radio', options: [...TFontSizes, undefined], table: { category: 'Text' } },
    fontBold: { control: 'boolean', table: { category: 'Text' } },
    fontAccent: { control: 'boolean', table: { category: 'Text' } },
    textEffect: { control: 'inline-radio', options: [...TTextEffects, undefined], table: { category: 'Text' } },
    textAlign: { control: 'inline-radio', options: ['left', 'right', 'center', undefined], table: { category: 'Text' } },
    textLineSpacing: { control: 'inline-radio', options: [...TLineSpacings, undefined], table: { category: 'Text' } },
    textColorHarmonious: { control: 'boolean', table: { category: 'Text' } },
    textColor: { control: 'select', options: [undefined, ...TThemeColors], table: { category: 'Text' } }
  };

  public static readonly Icon: Partial<ArgTypes<IGeneralIconProperties>> = {
    icon: { table: { disable: true } },
    iconSize: { control: 'inline-radio', options: [...TElementSizes, undefined], table: { category: 'Icon' } },
    iconColor: { control: 'select', options: [undefined, ...TThemeColors], table: { category: 'Icon' } },
    iconPlacement: { control: 'inline-radio', options: [...TIconPlacements, undefined], table: { category: 'Icon' } },
    iconStyle: { table: { disable: true } },
    imageDatabase: { table: { disable: true } },
  };

  public static readonly BaseField: Partial<ArgTypes<IBaseFieldProps>> = {
    labelProps: { table: { disable: true } },
    descriptionProps: { table: { disable: true } },
    errorProps: { table: { disable: true } }
  };

  public static readonly BaseFieldSize: Partial<ArgTypes<IBaseFieldProps>> = {
    inlinePlace: { control: 'boolean', table: { category: 'Size' } },
    size: { control: 'inline-radio', options: [...TElementSizes, undefined], table: { category: 'Size' } },
    w: { control: 'inline-radio', options: ['min-content', 'max-content', '100%', '30vw', undefined], table: { category: 'Size' } },
    h: { control: 'inline-radio', options: ['min-content', 'max-content', '100%', '30vh', undefined], table: { category: 'Size' } },
    grow: { control: 'number', table: { category: 'Size' } },
    shrink: { control: 'number', table: { category: 'Size' } }
  };
}
