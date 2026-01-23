import { ArgTypesStory, OptionsStory } from '#storydata';
import type { Meta, StoryObj } from '@storybook/react';
import { IconShieldBolt } from '@tabler/icons-react';
import { SelectField } from './SelectField';

const meta = {
  title: 'Controls/SelectField',
  component: SelectField,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    // Label
    label: { control: 'text', table: { category: 'Label' } },
    description: { control: 'text', table: { category: 'Label' } },
    error: { control: 'text', table: { category: 'Label' } },
    required: { control: 'boolean', table: { category: 'Label' } },

    // Size
    ...ArgTypesStory.BaseFieldSize,

    // Padding & Margin
    ...ArgTypesStory.Padding,
    ...ArgTypesStory.Margin,

    // Border
    ...ArgTypesStory.Border,

    // Background
    ...ArgTypesStory.Background,

    // Hide
    ...ArgTypesStory.BaseField,
    selectProps: { table: { disable: true } },
    children: { table: { disable: true } },
    items: { table: { disable: true } },
    selectedItem: { table: { disable: true } },
    onChangedItem: { table: { disable: true } },
    getDisabledItem: { table: { disable: true } },
    getLabelItem: { table: { disable: true } },
    getValueItem: { table: { disable: true } },
    renderItem: { table: { disable: true } }
  }
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectFieldDefault: Story = {
  name: 'SelectField Default',
  args: {
    p: 'xs',
    m: 'sm',
    items: OptionsStory.TextAndIconImage,
    label: 'Иконка Image'
  }
};

export const SelectFieldLabel: Story = {
  name: 'SelectField Label',
  args: {
    inlinePlace: true,
    label: 'Иконка React',
    items: OptionsStory.TextAndIconReact,
    selectProps: {
      rightSection: <IconShieldBolt color="red" size={'2.25rem'} />
    }
  }
};

export const SelectFieldStyle: Story = {
  name: 'SelectField Style',
  args: {
    inlinePlace: true,
    label: 'Иконка React',
    items: OptionsStory.TextAndIconReact,
    selectProps: {
      rightSection: <IconShieldBolt color="red" size={'2.25rem'} />,
      style: { backgroundColor: 'red' }
    }
  }
};

export const SelectFieldGreen: Story = {
  name: 'SelectField Green',
  args: {
    p: 'xs',
    m: 'sm',

    items: OptionsStory.TextAndIconReact,

    label: 'Иконка Image',
    inlinePlace: true,
    size: 'md',
    required: false,
    w: 'max-content',
    withBorder: 3,
    bdColor: 'green',
    bdWidth: 6,
    bdRadius: 'xl',
    bgColor: 'greenPale'
  },
};
