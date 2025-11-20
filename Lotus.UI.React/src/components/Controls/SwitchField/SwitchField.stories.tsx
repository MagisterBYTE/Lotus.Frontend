/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react';
import { SwitchField } from './SwitchField';
import { ArgTypesStory } from '#storydata';

const meta = {
  title: 'Controls/SwitchField',
  component: SwitchField,
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
    switchProps: { table: { disable: true } }
  }
} satisfies Meta<typeof SwitchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SwitchFieldDefault: Story = {
  name: 'SwitchField Default',
  args: {
    p: 'xs',
    m: 'sm',
    label: 'Для всех'
  }
};

export const SwitchFieldLabel: Story = {
  name: 'SwitchField Label',
  args: {
    inlinePlace: true,
    labelProps: {
      w: '20%',
    },
    label: 'Ускорение'
  }
};
