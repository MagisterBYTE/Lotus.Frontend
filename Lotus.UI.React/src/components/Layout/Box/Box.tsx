import { IGeneralBackgroundProperties, IGeneralContainerProperties } from '#base';
import { BuilderCssProperties } from '#builder';
import { CssPropertiesHelper } from '#helpers';
import { TCenterContent } from '#types';
import { css } from '@emotion/css';
import { ComponentPropsWithRef, CSSProperties } from 'react';

export interface IBoxProps extends IGeneralContainerProperties, IGeneralBackgroundProperties, ComponentPropsWithRef<'div'>
{
  centerContent?: TCenterContent;
}

function buildBoxProps(props: IBoxProps): CSSProperties
{
  if (props.centerContent === 'horizontally')
  {
    return {
      display: 'grid',
      justifyItems: 'center',
      alignItems: 'start',
    }
  }
  if (props.centerContent === 'vertically')
  {
    return {
      display: 'grid',
      alignItems: 'center',
    }
  }
  if (props.centerContent === 'center')
  {
    return {
      display: 'grid',
      justifyItems: 'center',
      alignItems: 'center',
    }
  }
  return {}
}

export function Box(props: IBoxProps)
{
  const { centerContent, children, ...otherProps } = props;

  const styleDiv: CSSProperties = {
    ...BuilderCssProperties.buildContainer(props),
    ...BuilderCssProperties.buildBackground(props),
    ...buildBoxProps(props),
  };

  const boxClass = css({...styleDiv, label: 'Box'});

  // Фильтруем кастомные пропсы перед передачей в div
  const domProps = CssPropertiesHelper.filterDOMProps(otherProps);

  return <div className={boxClass} {...domProps}>{children}</div>;
}
