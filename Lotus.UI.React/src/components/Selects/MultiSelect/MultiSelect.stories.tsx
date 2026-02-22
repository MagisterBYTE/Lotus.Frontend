import { ArgTypesStory, OptionsStory } from '#storydata';
import type { Meta, StoryObj } from '@storybook/react';
import { IconShieldBolt } from '@tabler/icons-react';
import { MultiSelect } from './MultiSelect';

const meta = {
  title: 'Controls/MultiSelect',
  component: MultiSelect,
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
    selectedItems: { table: { disable: true } },
    onChangedItems: { table: { disable: true } },
    getDisabledItem: { table: { disable: true } },
    getLabelItem: { table: { disable: true } },
    getValueItem: { table: { disable: true } },
    renderItem: { table: { disable: true } }
  }
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultiSelectDefault: Story = {
  name: 'MultiSelect Default',
  args: {
    p: 'xs',
    m: 'sm',
    items: OptionsStory.TextAndIconImage,
    renderItem: true,
    renderValue: true,
    label: 'Иконка Image'
  }
};

export const MultiSelectLabel: Story = {
  name: 'MultiSelect Label',
  args: {
    inlinePlace: true,
    label: 'Иконка React',
    items: OptionsStory.TextAndIconReact,
    renderItem: true,
    renderValue: true,
    selectProps: {
      withAlignedLabels: true,
      withCheckIcon: true,
      rightSection: <IconShieldBolt color="red" size={'2.25rem'} />
    }
  }
};

export const MultiSelectStyle: Story = {
  name: 'MultiSelect Style',
  args: {
    inlinePlace: true,
    label: 'Иконка React',
    renderItem: true,
    renderValue: true,
    items: OptionsStory.TextAndIconReact,
    selectProps: {
      rightSection: <IconShieldBolt color="red" size={'2.25rem'} />,
      style: { backgroundColor: 'red' }
    }
  }
};

export const MultiSelectGreen: Story = {
  name: 'MultiSelect Green',
  args: {
    p: 'xs',
    m: 'sm',
    renderItem: true,
    renderValue: true,
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
