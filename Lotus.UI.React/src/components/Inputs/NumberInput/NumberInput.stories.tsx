import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput';
import { IconShieldBolt } from '@tabler/icons-react';
import { ArgTypesStory } from '#storydata';

const meta = {
  title: 'Inputs/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    // Label
    required: { control: 'boolean', table: { category: 'Label' } },
    label: { control: 'text', table: { category: 'Label' } },
    description: { control: 'text', table: { category: 'Label' } },
    error: { control: 'text', table: { category: 'Label' } },

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
    textInputProps: { table: { disable: true } },
    children: { table: { disable: true } }
  }
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NumberInputEmpty: Story = {
  name: 'NumberInput Empty',
  args: {
  }
};

export const NumberInputDefault: Story = {
  name: 'NumberInput Default',
  args: {
    label: 'Пример',
    required: true,
    description: 'Описание',
    error: 'Ошибка'
  }
};

export const NumberInputInline: Story = {
  name: 'NumberInput Inline',
  args: {
    label: 'Пример',
    required: true,
    description: 'Описание',
    error: 'Ошибка',
    inlinePlace: true,
    labelProps: {
      w: '20%'
    },
    numberInputProps: {
      rightSection: <IconShieldBolt color="red" size={'2.25rem'} />
    }
  }
};

export const NumberInputBorder: Story = {
  name: 'NumberInput Border',
  args: {
    label: 'Пример',
    required: true,
    description: 'Описание',
    error: 'Ошибка',
    inlinePlace: true,
    size: 'md',
    withBorder: true,
    p: 'md',
    bdRadius: 'xs',
    bdShadow: 7
  },
};
