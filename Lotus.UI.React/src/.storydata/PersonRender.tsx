import { IPerson } from './PersonInfo';
import { IContextRenderBase } from '#types';
import { Box, Grid, HorizontalStack } from '#components/Layout';
import { Avatar } from '@mantine/core';
import { Text } from '#components/Display';

export abstract class PersonRender {
  public static renderPersonCard(person?: IPerson, contextRender?: IContextRenderBase) {
    if (!person) return undefined;
    return (
      <Grid
        style={{ maxWidth: '400px', minWidth: '100px', maxHeight: '300px', minHeight: '50px' }}
        gridTemplateRows={'repeat(4, 1fr)'}
        gridTemplateColumns={'repeat(2, 1fr)'}
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
  }

  public static renderPersonValue(person?: IPerson, contextRender?: IContextRenderBase) {
    if (!person) return undefined;
    return (
      <HorizontalStack vAlign="center" spacing={'md'}>
        <Avatar size={contextRender?.size} src={person.avatar}></Avatar>
        <Text fontSize={contextRender?.size}>{person.name}</Text>
        <Text fontSize={contextRender?.size} bdRadius asBadge={'blue'}>
          {person.age}
        </Text>
      </HorizontalStack>
    );
  }
}
