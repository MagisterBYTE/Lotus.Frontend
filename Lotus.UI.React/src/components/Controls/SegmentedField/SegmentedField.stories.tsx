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
    segmentedProps: { table: { disable: true } },
    children: { table: { disable: true } },
    items: { table: { disable: true } },
    selectedItem: { table: { disable: true } },
    onChangedItem: { table: { disable: true } },
    getDisabledItem: { table: { disable: true } },
    getLabelItem: { table: { disable: true } },
    getValueItem: { table: { disable: true } },
    renderItem: { table: { disable: true } },
  }
} satisfies Meta<typeof SegmentedField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SegmentedFieldDefault: Story = {
  name: 'SegmentedField Default',
  args: {
    p: 'xs',
    m: 'sm',
    items: OptionsStory.TextAndIconImage,
    label: 'Иконка Image'
  }
};

export const SegmentedFieldLabel: Story = {
  name: 'SegmentedField Label',
  args: {
    inlinePlace: true,
    label: 'Иконка React',
    items: OptionsStory.TextAndIconReact,
    withBorder: 15,
    p: 'xxs',
    bdRadius: 'md',
    w: 'max-content'
  }
};

export const SegmentedFieldStyle: Story = {
  name: 'SegmentedField Style',
  args: {
    inlinePlace: true,
    label: 'Иконка React',
    items: OptionsStory.TextAndIconReact,
  }
};
