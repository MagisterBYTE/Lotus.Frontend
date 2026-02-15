/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgTypesStory, TextStory } from '#storydata';
import { TCssContentAligns, TSizeTypeValues } from '#types';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box/Box';
import { HorizontalStack } from '../HorizontalStack/HorizontalStack';
import { Grid } from './Grid';

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    // Params
    gridTemplateColumns: { control: 'text', table: { category: 'Params' } },
    gridTemplateRows: { control: 'text', table: { category: 'Params' } },
    columnGap: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Params' } },
    rowGap: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Params' } },
    hAlign: { control: 'inline-radio', options: [...TCssContentAligns, undefined], table: { category: 'Params' } },
    vAlign: { control: 'inline-radio', options: [...TCssContentAligns, undefined], table: { category: 'Params' } },
    hContentAlign: { control: 'inline-radio', options: [...TCssContentAligns, undefined], table: { category: 'Params' } },
    vContentAlign: { control: 'inline-radio', options: [...TCssContentAligns, undefined], table: { category: 'Params' } },

    // Size
    ...ArgTypesStory.Size,

    // Padding & Margin
    ...ArgTypesStory.Padding,
    ...ArgTypesStory.Margin,

    // Border
    ...ArgTypesStory.Border,

    // Background
    ...ArgTypesStory.Background,

    // Hide
    children: { table: { disable: true } }
  }
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  name: 'Card',
  args: {
    bdRadius: true,
    gridTemplateColumns: '120px 1fr',
    gridTemplateRows: 'auto auto auto ',

    children: (
      <>
        <Box bdRadius style={{ gridColumnStart: 1, gridColumnEnd: 2, gridRowStart: 1, gridRowEnd: 4, minHeight: '128px', minWidth: '128px' }}>
          Это изображение
        </Box>
        <Box bdRadius style={{ gridColumnStart: 2, gridColumnEnd: 3, gridRowStart: 1, gridRowEnd: 2 }}>
          Это текст
        </Box>
        <Box bdRadius style={{ gridColumnStart: 2, gridColumnEnd: 3, gridRowStart: 2, gridRowEnd: 3 }}>
          {TextStory.MiddleText()}
        </Box>
        <Box bdRadius style={{ gridColumnStart: 2, gridColumnEnd: 3, gridRowStart: 3, gridRowEnd: 4 }}>
          Это что еще
        </Box>
      </>
    ),

    columnGap: 'md',
    rowGap: 'xs',
    hAlign: 'flex-start',
    vAlign: 'flex-start',
    hContentAlign: 'stretch',
    vContentAlign: 'flex-start',
    w: '100%',
    h: '100%',
    p: 'xs'
  }
};

export const CardColor: Story = {
  name: 'Card Color',
  args: {
    bdRadius: true,
    bgColor: 'blueGreyLighter',
    gridTemplateColumns: '120px 1fr',
    gridTemplateRows: 'auto auto auto auto',

    children: (
      <>
        <Box
          bdRadius
          bgColor="blueGreyLight"
          style={{ gridColumnStart: 1, gridColumnEnd: 2, gridRowStart: 1, gridRowEnd: 4, minHeight: '128px', minWidth: '128px' }}
        >
          Это изображение
        </Box>
        <Box bdRadius bgColor="blueGreyDark" gridColumn={2} gridRow={1}>
          Это текст
        </Box>
        <Box bdRadius bgColor="blueGreyDark" gridColumn={2} gridRow={2} style={{ maxHeight: '50px', overflow: 'scroll' }}>
          {TextStory.MiddleText()}
        </Box>
        <Box bdRadius bgColor="blueGreyDark" gridColumn={2} gridRow={3}>
          Это что еще
        </Box>
        <HorizontalStack gridColumn={1} gridColumnSpan={3} gridRow={4} hAlign={'space-around'}>
          <Box bdRadius bgColor="brownDarker" w={'200px'}>
            Первая кнопка
          </Box>
          <Box bdRadius bgColor="brownDarker" w={'200px'}>
            Вторая кнопка
          </Box>
        </HorizontalStack>
      </>
    ),

    columnGap: 'md',
    rowGap: 'xs',
    hAlign: 'flex-start',
    vAlign: 'flex-start',
    hContentAlign: 'stretch',
    vContentAlign: 'flex-start',
    w: '100%',
    h: 'min-content',
    p: 'xs'
  }
};
