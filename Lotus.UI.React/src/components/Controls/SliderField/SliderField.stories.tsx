/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgTypesStory } from '#storydata';
import type { Meta, StoryObj } from '@storybook/react';
import { SliderField } from './SliderField';

const meta = {
  title: 'Controls/SliderField',
  component: SliderField,
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
} satisfies Meta<typeof SliderField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SliderFieldDefault: Story = {
  name: 'SliderField Default',
  args: {
    p: 'xs',
    m: 'sm',
    label: 'Иконка Image',
    sliderProps:
    {
      value: 60
    }
  }
};

export const SliderFieldLabel: Story = {
  name: 'SliderField Label',
  args: {
    inlinePlace: true,
    label: 'Иконка React',
  }
};

export const SliderFieldStyle: Story = {
  name: 'SliderField Style',
  args: {
    inlinePlace: true,
    label: 'Иконка React',
    sliderProps:
    {
      style: {backgroundColor: 'red'}
    }
  }
};
