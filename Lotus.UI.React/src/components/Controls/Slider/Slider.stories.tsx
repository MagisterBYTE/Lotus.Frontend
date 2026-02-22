import { ArgTypesStory } from '#storydata';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta = {
  title: 'Controls/Slider',
  component: Slider,
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
    sliderProps: { table: { disable: true } },
    children: { table: { disable: true } }
  }
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SliderDefault: Story = {
  name: 'Slider Default',
  args: {
    p: 'xs',
    m: 'sm',
    label: 'Иконка Image'
  }
};

export const SliderLabel: Story = {
  name: 'Slider Label',
  args: {
    inlinePlace: true,
    label: 'Иконка React'
  }
};

export const SliderStyle: Story = {
  name: 'Slider Style',
  args: {
    inlinePlace: true,
    label: 'Иконка React',
    min: 0,
    max: 100,
    defaultValue: 17
  }
};
