import { css } from '@emotion/css';
import { ComponentPropsWithRef, CSSProperties, useMemo } from 'react';
import {
  BackgroundPropertiesHelper,
  BorderPropertiesHelper,
  ContainerPropertiesHelper,
  IGeneralBackgroundProperties,
  IGeneralContainerProperties,
  MarginPropertiesHelper,
  PaddingPropertiesHelper
} from '#base';
import { CssPropertiesHelper } from '#helpers';
import { TCenterContent } from '#types';

export interface IBoxProps extends IGeneralContainerProperties, IGeneralBackgroundProperties, ComponentPropsWithRef<'div'> {
  centerContent?: TCenterContent;
}

function buildBoxProps(props: IBoxProps): CSSProperties 
{
  if (props.centerContent === 'horizontally') 
  {
    return {
      display: 'grid',
      justifyItems: 'center',
      alignItems: 'start'
    };
  }
  if (props.centerContent === 'vertically') 
  {
    return {
      display: 'grid',
      alignItems: 'center'
    };
  }
  if (props.centerContent === 'center') 
  {
    return {
      display: 'grid',
      justifyItems: 'center',
      alignItems: 'center'
    };
  }
  return {};
}

export function Box(props: IBoxProps) 
{
  const { centerContent, children, ...otherProps } = props;

  // 1. Мемоизируем объект стилей
  const boxStyle = useMemo((): CSSProperties => (
    {
      ...MarginPropertiesHelper.createMarginProps(otherProps),
      ...PaddingPropertiesHelper.createPaddingProps(otherProps),
      ...ContainerPropertiesHelper.createContainerProps(otherProps),
      ...BackgroundPropertiesHelper.createBackgroundProps(otherProps),
      ...BackgroundPropertiesHelper.createBoxShadowProps(otherProps),
      ...BorderPropertiesHelper.createBorderProps(otherProps),
      ...BorderPropertiesHelper.createBorderShadowProps(otherProps),
      ...buildBoxProps(props)
    }),
  [otherProps, centerContent]
  );

  // 2. Мемоизируем сгенерированный класс Emotion
  const boxClass = useMemo(() => css({ ...boxStyle, label: 'Box' }), [boxStyle]);

  // 3. Фильтруем кастомные пропсы перед передачей в div
  const domProps = useMemo(() => CssPropertiesHelper.filterDOMProps(otherProps), [otherProps]);

  return (
    <div className={boxClass} {...domProps}>
      {children}
    </div>
  );
}
