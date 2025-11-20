import { MantineProvider } from '@mantine/core';
import type { Preview } from '@storybook/react-vite';
import React from 'react'
import '@mantine/core/styles.css';
import { theme } from './theme';


const preview: Preview = {
  decorators: [
    // 👇 Defining the decorator in the preview file applies it to all stories
    (Story, { parameters, context }) =>
    {
      // 👇 Make it configurable by reading from parameters
      const { pageLayout } = parameters;
      const colorScheme = context.globals.backgrounds?.value;
      return <MantineProvider theme={theme} forceColorScheme={colorScheme}>
        <Story />
      </MantineProvider>

      // switch (pageLayout)
      // {
      //   case 'page':
      //     return (
      //       // Your page layout is probably a little more complex than this ;)
      //       <div className="page-layout">
      //           <Story />
      //       </div>
      //     );
      //   case 'page-mobile':
      //     return (
      //       <div className="page-mobile-layout">
      //           <Story />
      //       </div>
      //     );
      //   default:
      //     // In the default case, don't apply a layout
      //     return  <Story />
      // }
    },
  ],
};

export default preview;