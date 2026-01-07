/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from '@emotion/css';
import { Assert } from 'lotus-core/utils';
import { CSSProperties, isValidElement, ReactNode } from 'react';
import { BackgroundPropertiesHelper, BorderPropertiesHelper, ContainerPropertiesHelper, MarginPropertiesHelper, PaddingPropertiesHelper } from '#base';
import { ILabelProps, Label } from '#components/Display';
import { FontSizes, MarginSizes, PaddingSizes } from '#designSystem/sizes';
import {  CssPropertiesHelper } from '#helpers';
import { TSizeType } from '#types';
import { IBoxProps } from '../Box';

export interface IPanelProps extends IBoxProps
{
  size?: TSizeType;
  header?: ReactNode;
  headerProps?: ILabelProps;
}

function buildPanelProps(props: IPanelProps): CSSProperties
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

// eslint-disable-next-line complexity
export function Panel(props: IPanelProps)
{
  const { centerContent, size = 'md', header, headerProps, children, ...otherProps } = props;
  const isHeaderComponent = isValidElement(header);
  const isHeaderText = typeof header === 'string';

  const styleDiv: CSSProperties = {
    ...MarginPropertiesHelper.createMarginProps(props),
    ...PaddingPropertiesHelper.createPaddingProps(props),
    ...ContainerPropertiesHelper.createContainerProps(props),
    ...BackgroundPropertiesHelper.createBackgroundProps(props),
    ...BackgroundPropertiesHelper.createBoxShadowProps(props),
    ...BorderPropertiesHelper.createBorderProps(props),
    ...BorderPropertiesHelper.createBorderShadowProps(props),
    ...buildPanelProps(props)
  };

  // eslint-disable-next-line complexity
  function getHeaderStyle(): CSSProperties
  {
    const hFontSize = FontSizes.Default.toPixel(size ?? headerProps?.fontSize ?? 'md')!;
    let topOffset = hFontSize + (BorderPropertiesHelper.hasBorderProps(props) ? -MarginSizes.Default.toPixel(props.bdWidth ?? 2)! : 0);

    topOffset -= PaddingSizes.Default.toPixel(headerProps?.p ?? headerProps?.pt ?? 'md')!;
    topOffset -= PaddingSizes.Default.toPixel(headerProps?.p ?? headerProps?.pb ?? 'md')!;

    topOffset -=2;

    const headerStyle: CSSProperties = {
      position: 'absolute',
      background: headerProps?.style?.backgroundColor ?? BackgroundPropertiesHelper.getBackgroundColorPropsValue(otherProps.bgColor) ?? 'var(--mantine-color-default)',
      top: headerProps?.style?.top ?? `${topOffset + MarginSizes.Default.toPixel(props.m ?? props.mt ?? 0)!}px`,
      left: headerProps?.style?.left ?? `${40 + MarginSizes.Default.toPixel(props.m ?? props.ml ?? 0)!}px`
    };

    return { ...headerStyle, ...headerProps?.style };
  }

  const panelClass = css({ ...styleDiv, label: 'Panel' });

  // Фильтруем кастомные пропсы перед передачей в div
  const domProps = CssPropertiesHelper.filterDOMProps(otherProps);

  if (Assert.existValue(headerProps) || isHeaderText)
  {
    return (
      <div className={panelClass} {...domProps}>
        {isHeaderComponent && header}
        {isHeaderComponent === false && (
          <Label
            {...headerProps}
            // eslint-disable-next-line react/no-children-prop
            children={isHeaderText ? header : headerProps?.children}
            bdColor={headerProps?.bdColor ?? otherProps.bdColor}
            bdRadius={headerProps?.bdRadius ?? otherProps.bdRadius}
            bdShadow={headerProps?.bdShadow ?? otherProps.bdShadow}
            bdStyle={headerProps?.bdStyle ?? otherProps.bdStyle}
            bdWidth={headerProps?.bdWidth ?? otherProps.bdWidth}
            p={headerProps?.p ?? 'xxs'}
            style={getHeaderStyle()}
            withBorder={headerProps?.withBorder ?? otherProps.withBorder}
          />
        )}
        {children}
      </div>
    );
  }
  if (isHeaderComponent)
  {
    return (
      <div className={panelClass} {...domProps}>
        {header}
        {children}
      </div>
    );
  }
  return (
    <div className={panelClass} {...domProps}>
      {children}
    </div>
  );
}
