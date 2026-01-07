import type { Meta, StoryObj } from '@storybook/react';
import { TColorToken, TColorTokens } from 'lotus-core/modules/color';
import { GiAnt } from 'react-icons/gi';
import { Button } from './Button';
import { TButtonVariant } from './ButtonVariant';
import { ArgTypesStory, IconsStory } from '#storydata';
import { TCssBackgroundColor, TSizeTypes } from '#types';

const DivButton = (variant: TButtonVariant, backColor: TCssBackgroundColor|TColorToken, propsOther: any) =>
{
  return <Button 
    key={`${variant}_${backColor}`}
    style={{margin: '1rem'}} {...propsOther} backColor={backColor} variant={variant} >
    {propsOther.children}
  </Button>
}

const DivButtonsColumn = (backColor: TCssBackgroundColor|TColorToken, propsOther: any) =>
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
    disabled: { control: 'boolean', table: { category: 'Base' } },
    size: { control: 'inline-radio', options: [...TSizeTypes, undefined], table: { category: 'Base' } },
    extraClass: { table: { disable: true } },

    // IButtonBaseProps
    variant: { control: 'inline-radio', table: { category: 'Button'  } },
    isSelectedStatus: { control: 'boolean', table: { category: 'Button' } },
    isSelected: { table: { disable: true } },
    onSelected: { table: { disable: true } },
    hasRippleEffect: { control: 'boolean', table: { category: 'Button' } },
    hasScaleEffect: { control: 'boolean', table: { category: 'Button' } },
    hasShadowBorderEffect: { control: 'boolean', table: { category: 'Button' } },
    hasShadowBoxEffect: { control: 'boolean', table: { category: 'Button' } },

      // Padding & Margin
      ...ArgTypesStory.Padding,
      ...ArgTypesStory.Margin,

    // Label
    ...ArgTypesStory.Text,
    ...ArgTypesStory.Icon,

    // Border Background
    ...ArgTypesStory.Border,
    ...ArgTypesStory.Background,

    onClick: { table: { disable: true } },
    children: { table: { disable: true } },
    style: { table: { disable: true } },
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
    const colors:TColorToken[] = [...TColorTokens];
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
    bdRadius: '40%'
  },
  render: (args) =>
  {
    const colors:TColorToken[] = [...TColorTokens];
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
    const colors:TColorToken[] = [...TColorTokens];
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



