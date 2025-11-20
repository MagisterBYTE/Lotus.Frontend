/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';
import React from 'react';
import { ArgTypesStory, TextStory } from '#storydata';

const meta = {
  title: 'Layout/Box',
  component: Box,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    // Params
    centerContent: { control: 'inline-radio', options: ['horizontally', 'vertically', 'center', undefined], table: { category: 'Params' } },

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
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BoxDefault: Story = {
  name: 'Box Default',
  args: {
    children: <div style={{ width: 'max-content', border: 'solid 1px black' }}>Это контент</div>,
    p: 'xs',
    m: 'sm',
    borderStyle: 'solid',
    borderWidth: 2,
    borderShadow: 4
  }
};

export const BoxAndBoxCenter: Story = {
  name: 'Box Center',
  args: {
    //style: {backgroundColor: 'rgba(139, 119, 103, 0.8)'},
    children: (
      <Box borderRadius backColor="blueGreyLight" p={'md'} w={'min-content'}>
        {TextStory.MiddleText()}
      </Box>
    ),
    centerContent: 'center',
    p: 'md',
    borderStyle: 'solid',
    w: '30vw',
    h: 'min-content',
    backColor: 'blueGreyDark',
    shadow: 10
  }
};

export const BoxBrown: Story = {
  name: 'Box Brown',
  args: {
    children: (
      <Box borderRadius backColor="blueGreyLight" p={'md'} w={'min-content'}>
        {TextStory.MiddleText()}
      </Box>
    ),

    centerContent: 'vertically',
    p: 'md',
    borderStyle: 'solid',
    w: '30vw',
    h: 'min-content',
    backColor: 'brownBlack',
    shadow: 10
  }
};
