import { Meta, StoryObj } from '@storybook/react';
import { CardView } from './CardView';
import { PersonInfoBase, ImageDatabase, Persons, PersonRender } from '#storydata';

const meta = {
  title: 'DataView/CardView',
  component: CardView,
  parameters: {
    layout: 'padded'
  },

  tags: ['autodocs'],

  argTypes: {
  }
} satisfies Meta<typeof CardView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = 
{
  args: {
    objectInfo: PersonInfoBase.Instance,
    imageDatabase: ImageDatabase,
    items: Persons,
    renderCard: PersonRender.renderPersonCard
  }
};

