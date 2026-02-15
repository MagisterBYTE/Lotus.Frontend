import { ArgTypesStory, IPerson, OptionsStory, Persons } from '#storydata';
import type { Meta, StoryObj } from '@storybook/react';
import { IconShieldBolt } from '@tabler/icons-react';
import { GallerySelect } from './GallerySelect';
import { IContextRenderBase } from '#types';
import { Box, Grid } from '#components/Layout';
import { Text } from '#components/Display';
import { Avatar } from '@mantine/core';

const meta = {
  title: 'Controls/GallerySelect',
  component: GallerySelect<IPerson>,
  tags: ['autodocs'],
  args: {},

  argTypes: {}
} satisfies Meta<typeof GallerySelect<IPerson>>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderPersonAsCard = (person?: IPerson, contextRender?: IContextRenderBase) => {
  if (!person) return <></>;
  return (
    <Grid
      style={{ maxWidth: '400px', minWidth: '220px', maxHeight: '300px', minHeight: '120px' }}
      gridTemplateRows={'repeat(4, 1fr)'}
      gridTemplateColumns={'repeat(2, 1fr)'}
      withBorder
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

export const GallerySelectDefault: Story = {
  name: 'GallerySelect Default',
  args: {
    items: Persons,
    renderItem: renderPersonAsCard,
    renderValue: renderPersonAsCard,
    hasFilter: true,
    onFilterItem: (item: IPerson, filter: string) => { return item.name.includes(filter);}
  }
};
