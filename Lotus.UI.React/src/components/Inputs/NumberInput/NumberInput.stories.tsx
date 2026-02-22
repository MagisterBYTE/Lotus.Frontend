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
    // Number
    value: { control: 'number', table: { category: 'Number' } },
    min: { control: 'number', table: { category: 'Number' } },
    max: { control: 'number', table: { category: 'Number' } },
    step: { control: 'number', table: { category: 'Number' } },
    disabled: { control: 'boolean', table: { category: 'Number' } },

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
    numberInputProps: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onChangeValue: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    children: { table: { disable: true } }
  }
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NumberInputEmpty: Story = {
  name: 'NumberInput Empty',
  args: {
    w: 'max-content'
  }
};

export const NumberInputDefault: Story = {
  name: 'NumberInput Default',
  args: {
    label: 'Пример',
    required: true,
    description: 'Описание',
    error: 'Ошибка',
    w: 'max-content'
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
      w: '100px'
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
  }
};
