/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react';
import { Colors } from 'lotus-core/modules/color';
import { GiAnt } from 'react-icons/gi';
import { Button } from './Button';
import { TButtonVariant } from './ButtonVariant';
import { TThemeColor, TThemeColors } from '#theme/types';
import React from 'react';
import { TElementSizes, TIconPlacements, TTextEffects } from '#types';
import { IconsStory } from '../../../.storydata/IconsStory';

const DivButton = (variant: TButtonVariant, backColor: TThemeColor, propsOther: any) =>
{
  return <Button 
    key={`${variant}_${backColor}`}
    style={{margin: '1rem'}} {...propsOther} backColor={backColor} variant={variant} >
    {propsOther.children}
  </Button>
}

const DivButtonsColumn = (backColor: TThemeColor, propsOther: any) =>
{
  const variants:TButtonVariant[] = ['filled', 'outline', 'text', 'icon']
  return <div key={`${backColor}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'stretch'}}>
    {
      variants.map(x =>
      {
        return DivButton(x, backColor, propsOther)
      }
      )
    }
  </div>
}

const meta = {
  title: 'Controls/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    controls:
    {
      sort: 'requiredFirst'
    }
  },

  tags: ['autodocs'],

  args: { onClick: ()=>{} },

  argTypes:
  {
    // IGeneralBaseElementProperties
    disabled: { control: 'boolean', table: { category: 'Base', order: 1 } },
    size: { control: 'inline-radio', options: [...TElementSizes, undefined], table: { category: 'Base', order: 2  } },
    extraClass: { table: { disable: true } },

    // IButtonBaseProps
    overrideButtonStyle: { table: { disable: true } },
    variant: { control: 'inline-radio', table: { category: 'Button', order: 4  } },
    isSelectedStatus: { control: 'boolean', table: { category: 'Button', order: 5  } },
    isSelected: { table: { disable: true } },
    onSelected: { table: { disable: true } },
    hasRippleEffect: { control: 'boolean', table: { category: 'Button', order: 6 } },
    hasScaleEffect: { control: 'boolean', table: { category: 'Button', order: 7 } },
    hasShadowBorderEffect: { control: 'boolean', table: { category: 'Button', order: 8 } },
    hasShadowBoxEffect: { control: 'boolean', table: { category: 'Button', order: 9 } },

    // IGeneralBackgroundProperties
    backColor: { control: 'inline-radio', options: [...TThemeColors, undefined], table: { category: 'Background', order: 10 } },
    hoverBackColor: { control: 'inline-radio', options: [...TThemeColors, undefined], table: { category: 'Background', order: 11  }},
    pressedBackColor: { control: 'inline-radio', options: [...TThemeColors, undefined], table: { category: 'Background', order: 12 } },

    // IGeneralTextProperties
    fontBold: { control: 'boolean', table: { category: 'Text', order: 13 } },
    fontAccent: { control: 'boolean', table: { category: 'Text', order: 14 } },
    textEffect: { control: 'inline-radio', options: [...TTextEffects, undefined], table: { category: 'Text', order: 15 } },
    textAlign: { control: 'inline-radio', options: ['left', 'right', 'center', undefined], table: { category: 'Text', order: 16 } },
    textColorHarmonious: { control: 'boolean', table: { category: 'Text', order: 17 } },
    textColor: { control: 'inline-radio', options: [...TThemeColors, undefined], table: { category: 'Text', order: 18 } },
    hoverTextColor: { control: 'inline-radio', options: [...TThemeColors, undefined], table: { category: 'Text', order: 19 } },
    pressedTextColor: { control: 'inline-radio', options: [...TThemeColors, undefined], table: { category: 'Text', order: 20 } },

    // IGeneralBorderProperties
    borderRadius: { control: 'boolean', table: { category: 'Border', order: 21 } },
    borderStyle: { control: 'inline-radio', table: { category: 'Border', order: 22 } },
    borderWidth: { control: 'number', table: { category: 'Border', order: 23 } },
    borderColor: { control: 'inline-radio', options: [...TThemeColors, undefined], table: { category: 'Border', order: 24 } },
    hoverBorderColor: { control: 'inline-radio', options: [...TThemeColors, undefined], table: { category: 'Border', order: 25 } },
    pressedBorderColor: { control: 'inline-radio', options: [...TThemeColors, undefined], table: { category: 'Border', order: 26 } },

    // IGeneralIconProperties
    icon: { table: { disable: true } },
    iconColor: { control: 'inline-radio', options: [...TThemeColors, ...TThemeColors, undefined], table: { category: 'Icon', order: 27 } },
    iconPlacement: { control: 'inline-radio', options: [...TIconPlacements, undefined], table: { category: 'Icon', order: 28 } },
    iconStyle: { table: { disable: true } },
    imageDatabase: { table: { disable: true } },

    onClick: { table: { disable: true } },
    children: { table: { disable: true } },
    style: { table: { disable: true } },
    backImage: { table: { disable: true } }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextVariants: Story = {
  name: 'TextVariants',
  args: {
  },
  render: (args) =>
  {
    const colors:TThemeColor[] = [...TThemeColors];
    return <div style={{ display: 'flex', flexDirection: 'row' }}>
      {
        colors.map(x =>
        {
          return DivButtonsColumn(x, args)
        }
        )
      }
    </div>
  }
};

export const IconReactVariants: Story = {
  name: 'IconReactVariants',
  args: {
    icon: <GiAnt />,
    borderRadius: '40%'
  },
  render: (args) =>
  {
    const colors:TThemeColor[] = [...TThemeColors];
    return <div style={{ display: 'flex', flexDirection: 'row' }}>
      {
        colors.map(x =>
        {
          return DivButtonsColumn(x, args)
        }
        )
      }
    </div>
  }
};

export const IconImageVariants: Story = {
  name: 'IconImageVariants',
  args: {
    icon: IconsStory.HydraulicAnalysis64
  },
  render: (args) =>
  {
    const colors:TThemeColor[] = [...TThemeColors];
    return <div style={{ display: 'flex', flexDirection: 'row' }}>
      {
        colors.map(x =>
        {
          return DivButtonsColumn(x, args)
        }
        )
      }
    </div>
  }
};

export const TextAndImage: Story = {
  name: 'TextAndImage',
  args: {
    children: 'TextAndImage',
    icon: IconsStory.HydraulicAnalysis64
  },
};

export const TextAndIcon: Story = {
  name: 'TextAndIcon',
  args: {
    children: 'TextAndIcon',
    icon: <GiAnt />
  }
};



