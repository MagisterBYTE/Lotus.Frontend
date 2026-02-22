import type { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from './PasswordInput';
import { IconShieldBolt } from '@tabler/icons-react';
import { ArgTypesStory } from '#storydata';

const meta = {
  title: 'Inputs/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    // Password
    value: { control: 'number', table: { category: 'Password' } },
    disabled: { control: 'boolean', table: { category: 'Password' } },

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
    passwordInputProps: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onChangeValue: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    children: { table: { disable: true } }
  }
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PasswordInputEmpty: Story = {
  name: 'PasswordInput Empty',
  args: {
    w: '30vw'
  }
};

export const PasswordInputDefault: Story = {
  name: 'PasswordInput Default',
  args: {
    label: 'Пример',
    required: true,
    description: 'Описание',
    error: 'Ошибка'
  }
};

export const PasswordInputInline: Story = {
  name: 'PasswordInput Inline',
  args: {
    label: 'Пример',
    required: true,
    description: 'Описание',
    error: 'Ошибка',
    inlinePlace: true,

    labelProps: {
      w: '20%'
    },

    passwordInputProps: {
      rightSection: <IconShieldBolt color="red" size={'2.25rem'} />
    },

    w: '30vw'
  }
};

export const PasswordInputBorder: Story = {
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

  name: 'PasswordInput Border'
};
