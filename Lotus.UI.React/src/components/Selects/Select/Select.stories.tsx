import { ArgTypesStory, OptionsStory } from '#storydata';
import type { Meta, StoryObj } from '@storybook/react';
import { IconShieldBolt } from '@tabler/icons-react';
import { Select } from './Select';

const meta = {
  title: 'Selects/Select',
  component: Select,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    // Select
    selectRenderComponent: { control: 'boolean', table: { category: 'Select' } },

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
    renderItem: { table: { disable: true } },
    renderValue: { table: { disable: true } },
    imageDatabase: { table: { disable: true } }
  }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectDefault: Story = {
  name: 'Select Default',
  args: {
    p: 'xs',
    m: 'sm',
    items: OptionsStory.TextAndIconImage,
    label: 'Иконка Image',
    renderItem: true,
    renderValue: true,
    selectRenderComponent: true,

    selectProps: {
      withAlignedLabels: true,
      withCheckIcon: true
    },

    w: 'max-content'
  }
};

export const SelectLabel: Story = {
  name: 'Select Label',
  args: {
    inlinePlace: true,
    label: 'Иконка React',
    renderItem: true,
    renderValue: true,
    items: OptionsStory.TextAndIconReact,

    selectProps: {
      rightSection: <IconShieldBolt color="red" size={'2.25rem'} />,
      withCheckIcon: true
    },

    size: 'lg',
    w: 'max-content'
  }
};

export const SelectStyle: Story = {
  name: 'Select Style',
  args: {
    inlinePlace: true,
    label: 'Иконка React',
    renderItem: true,
    renderValue: true,
    items: OptionsStory.TextAndIconReact,

    selectProps: {
      rightSection: <IconShieldBolt color="red" size={'2.25rem'} />,
      style: { backgroundColor: 'red' },
      withCheckIcon: true
    },

    w: 'max-content'
  }
};

export const SelectGreen: Story = {
  name: 'Select Green',
  args: {
    p: 'xs',
    m: 'sm',

    items: OptionsStory.TextAndIconReact,
    renderItem: true,
    renderValue: true,
    selectProps: {
      clearable: true,
      withCheckIcon: true
    },
    label: 'Иконка Image',
    inlinePlace: true,
    size: 'md',
    required: false,
    w: '30vw',
    withBorder: 3,
    bdColor: 'green',
    bdWidth: 6,
    bdRadius: 'xl',
    bgColor: 'greenPale'
  }
};
