import { BuilderCssProperties } from '#builder';
import { CssBackgroundHelper, CssBorderHelper, CssFontHelper, CssPropertiesHelper, CssSpacingHelper } from '#helpers';
import { css } from '@emotion/css';
import { Assert } from 'lotus-core/utils';
import { ComponentPropsWithRef, CSSProperties, isValidElement, ReactNode } from 'react';
import { IBoxProps } from '../Box';
import { ILabelProps, Label } from '#components/Display';
import { TElementSize } from '#types';
import { hasBorderProps } from '#base';

export interface IPanelProps extends IBoxProps
{
  size?: TElementSize;
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

export function Panel(props: IPanelProps)
{
  const { centerContent, size = 'md', header, headerProps, children, ...otherProps } = props;
  const isHeaderComponent = isValidElement(header);
  const isHeaderText = typeof header === 'string';

  const styleDiv: CSSProperties = {
    ...BuilderCssProperties.buildContainer(props),
    ...BuilderCssProperties.buildBackground(props),
    ...buildPanelProps(props)
  };

  function getHeaderStyle(): CSSProperties
  {
    const hFontSize = CssFontHelper.getFontSizeInPixels(size ?? headerProps?.fontSize ?? 'md');
    let topOffset = hFontSize + (hasBorderProps(props) ? -CssBorderHelper.getBorderWidthPixels(props.borderWidth ?? 2) : 0);

    topOffset -= CssSpacingHelper.getSpacingInPixels(headerProps?.p ?? headerProps?.pt ?? 'xxs');
    topOffset -= CssSpacingHelper.getSpacingInPixels(headerProps?.p ?? headerProps?.pb ?? 'xxs');

    topOffset -=2;

    const headerStyle: CSSProperties = {
      position: 'absolute',
      background: headerProps?.style?.backgroundColor ?? CssBackgroundHelper.getBackgroundColorPropsValue(otherProps.backColor) ?? 'var(--mantine-color-default)',
      top: headerProps?.style?.top ?? `${topOffset + CssSpacingHelper.getSpacingInPixels(props.m ?? props.mt ?? 0)}px`,
      left: headerProps?.style?.left ?? `${40 + CssSpacingHelper.getSpacingInPixels(props.m ?? props.ml ?? 0)}px`,
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
            children={isHeaderText ? header : headerProps?.children}
            withBorder={headerProps?.withBorder ?? otherProps.withBorder}
            borderColor={headerProps?.borderColor ?? otherProps.borderColor}
            borderWidth={headerProps?.borderWidth ?? otherProps.borderWidth}
            borderStyle={headerProps?.borderStyle ?? otherProps.borderStyle}
            borderRadius={headerProps?.borderRadius ?? otherProps.borderRadius}
            borderShadow={headerProps?.borderShadow ?? otherProps.borderShadow}
            p={headerProps?.p ?? 'xxs'}
            style={getHeaderStyle()}
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
