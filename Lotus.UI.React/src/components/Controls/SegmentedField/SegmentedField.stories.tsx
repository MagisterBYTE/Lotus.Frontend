/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgTypesStory, OptionsStory } from '#storydata';
import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedField } from './SegmentedField';

const meta = {
  title: 'Controls/SegmentedField',
  component: SegmentedField,
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
    data: { table: { disable: true } },
    selectProps: { table: { disable: true } },
    children: { table: { disable: true } }
  }
} satisfies Meta<typeof SegmentedField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SegmentedFieldDefault: Story = {
  name: 'SegmentedField Default',
  args: {
    p: 'xs',
    m: 'sm',
    options: OptionsStory.TextAndIconImage,
    label: 'Иконка Image',
  }
};

export const SegmentedFieldLabel: Story = {
  name: 'SegmentedField Label',
  args: {
    inlinePlace: true,
    label: 'Иконка React',
    options: OptionsStory.TextAndIconReact,
  }
};

export const SegmentedFieldStyle: Story = {
  name: 'SegmentedField Style',
  args: {
    inlinePlace: true,
    label: 'Иконка React',
    options: OptionsStory.TextAndIconReact,
    segmentedProps:
    {
      style: {backgroundColor: 'red'}
    }
  }
};
