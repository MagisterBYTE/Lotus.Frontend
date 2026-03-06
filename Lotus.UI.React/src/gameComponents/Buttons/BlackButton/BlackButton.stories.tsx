import type { Meta, StoryObj } from '@storybook/react';
import { BlackButton } from './BlackButton';
import { TButtonVariantValues } from '../types';

const meta = {
  title: 'Games/BlackButton',
  component: BlackButton,
  parameters: {
    layout: 'centered',
    controls:
    {
      sort: 'requiredFirst'
    }
  },

  tags: ['autodocs'],

  args: 
  {

   },

  argTypes:
  {
     // Label
    children: { control: 'text', table: { category: 'Label' } },
    variant: { control: 'inline-radio', options: [...TButtonVariantValues, undefined], table: { category: 'Label' }},
  }
} satisfies Meta<typeof BlackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  args: {
    children: 'Default'
  },
};