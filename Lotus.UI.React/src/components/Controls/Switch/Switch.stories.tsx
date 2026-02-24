import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import { ArgTypesStory } from '#storydata';

const meta = {
  title: 'Controls/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    // Switch
    checked: { control: 'boolean', table: { category: 'Switch' } },
    disabled: { control: 'boolean', table: { category: 'Switch' } },

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
    switchProps: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onChangeValue: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
  }
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SwitchDefault: Story = {
  name: 'Switch Default',
  args: {
    p: 'xs',
    m: 'sm',
    label: 'Для всех'
  }
};

export const SwitchLabel: Story = {
  name: 'Switch Label',
  args: {
    inlinePlace: true,
    label: 'Ускорение'
  }
};

export const SwitchBorder: Story = {
  name: 'Switch Border',
  args: {
    inlinePlace: true,
    label: 'Ускорение',
    w: 'max-content',
    p: 'xs',
    bgShadow: 5,
    bdRadius: 'xs',
  },
};
