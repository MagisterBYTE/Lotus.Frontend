import { Meta, StoryObj } from '@storybook/react';
import { CardViewTable } from './CardViewWithSelection';
import { PersonInfoBase, PersonApi } from '#storydata';


const meta = {
  title: 'DataView/CardView',
  component: CardViewTable,
  parameters: {
    layout: 'padded'
  },

  tags: ['autodocs'],

  argTypes: {
  }
} satisfies Meta<typeof CardViewTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

