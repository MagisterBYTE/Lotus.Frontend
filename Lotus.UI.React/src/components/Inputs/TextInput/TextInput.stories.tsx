import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';
import { IconShieldBolt } from '@tabler/icons-react';
import { ArgTypesStory } from '#storydata';

const meta = {
  title: 'Inputs/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    // TextInput
    value: { control: 'number', table: { category: 'TextInput' } },
    disabled: { control: 'boolean', table: { category: 'TextInput' } },

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
    onChange: { table: { disable: true } },
    onChangeValue: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    children: { table: { disable: true } }
  }
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextInputEmpty: Story = {
  name: 'TextInput Empty',
  args: {
    w: 'max-content'
  }
};

export const TextInputDefault: Story = {
  name: 'TextInput Default',
  args: {
    label: 'Пример',
    required: true,
    description: 'Описание',
    error: 'Ошибка',
    w: 'max-content'
  }
};

export const TextInputInline: Story = {
  name: 'TextInput Inline',
  args: {
    label: 'Пример',
    required: true,
    description: 'Описание',
    error: 'Ошибка',
    inlinePlace: true,
    labelProps: {
      w: '100px'
    },
    textInputProps: {
      rightSection: <IconShieldBolt color="red" size={'2.25rem'} />
    }
  }
};

export const TextInputBorder: Story = {
  name: 'TextInput Border',
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
