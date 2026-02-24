import { ArgTypesStory, OptionsStory } from '#storydata';
import type { Meta, StoryObj } from '@storybook/react';
import { Segmented } from './Segmented';

const meta = {
  title: 'Selects/Segmented',
  component: Segmented,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    // Segmented
    selectRenderComponent: { control: 'boolean', table: { category: 'Segmented' } },

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
    renderValue: { table: { disable: true } },
    imageDatabase: { table: { disable: true } }
  }
} satisfies Meta<typeof Segmented>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SegmentedDefault: Story = {
  name: 'Segmented Default',
  args: {
    p: 'xs',
    m: 'sm',
    items: OptionsStory.TextAndIconImage,
    label: 'Иконка Image',
    w: 'max-content'
  }
};

export const SegmentedLabel: Story = {
  name: 'Segmented Label',
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

export const SegmentedStyle: Story = {
  name: 'Segmented Style',
  args: {
    inlinePlace: true,
    label: 'Иконка React',
    items: OptionsStory.TextAndIconReact,
    w: 'max-content'
  }
};
