import { Meta, StoryObj } from '@storybook/react';
import { CardView } from './CardView';
import { PersonInfoBase, PersonApi, ImageDatabase, Persons, IPerson } from '#storydata';
import { IContextRenderBase } from '#types';
import { Box, Grid } from '#components/Layout';
import { Text} from '#components/Display';
import { Avatar } from '@mantine/core';


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

const renderPersonAsCard = (person?: IPerson, contextRender?: IContextRenderBase) => {
  if (!person) return undefined;
  return (
    <Grid
      style={{ maxWidth: '400px', minWidth: '220px', maxHeight: '300px', minHeight: '120px' }}
      gridTemplateRows={'repeat(4, 1fr)'}
      gridTemplateColumns={'repeat(2, 1fr)'}
      withBorder
      bdColor={contextRender?.selected ? 'primary' : undefined}
      bdWidth={contextRender?.selected ? '2px' : undefined}
      bdRadius
    >
      <Avatar m={'xs'} w={'90%'} h={'90%'} style={{ gridColumnStart: 1, gridColumnEnd: 2, gridRowStart: 1, gridRowEnd: 5 }} src={person.avatar}></Avatar>
      <Box gridColumn={2} gridRow={1}>
        {person.name}
      </Box>
      <Box gridColumn={2} gridRow={2}>
        {person.surname}
      </Box>
      <Box gridColumn={2} gridRow={3}>
        {person.age}
      </Box>
      <Box gridColumn={2} gridRow={4}>
        {' '}
        <Text p={'xxs'} withBorder bdRadius asBadge={'blue'}>
          {person.age}
        </Text>
      </Box>
    </Grid>
  );
};

export const Default: Story = 
{
  args: {
    objectInfo: PersonInfoBase.Instance,
    imageDatabase: ImageDatabase,
    items: Persons,
    renderCard: renderPersonAsCard
  }
};

