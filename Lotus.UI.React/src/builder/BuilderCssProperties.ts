import { TCssProperties } from '#types';
import { IGeneralBackgroundProperties, IGeneralContainerProperties } from '#base';
import { CssSpacingHelper, CssBorderHelper, CssBackgroundHelper, CssContainerHelper } from '#helpers';

/**
 * Абстрактный класс, предоставляющий методы для построения и заполнения CSS-свойств
 * на основе переданных пропсов. Предназначен для централизованного управления
 * стилями компонентов в React-приложении.
 */
export abstract class BuilderCssProperties
{
  //#region Container

  /**
   * Заполняет переданный объект стилей CSS-свойствами, связанными с контейнером.
   * Включает padding, margin, border, box-shadow и другие визуальные свойства.
   *
   * @param style - Объект CSS-свойств, который будет изменён (мутация).
   * @param props - Интерфейс с общими свойствами контейнера.
   * @param override - Флаг, определяющий, следует ли перезаписывать существующие свойства.
   * @returns Изменённый объект стилей (тот же экземпляр, что и `style`).
   */
  public static fillContainer(style: TCssProperties, props: IGeneralContainerProperties, override: boolean): TCssProperties
  {
    // Padding и Margin
    CssSpacingHelper.fillPaddingProps(style, props, override);
    CssSpacingHelper.fillMarginProps(style, props, override);

    // Border
    CssBorderHelper.fillBorderProps(style, props, override);
    CssBorderHelper.fillBorderShadowProps(style, props, override);

    // Container
    CssContainerHelper.fillContainerProps(style, props, override);
    return style;
  }

  /**
   * Создаёт новый объект CSS-свойств на основе переданных пропсов контейнера.
   * В отличие от `fillContainer`, не изменяет переданный объект, а возвращает новый.
   *
   * @param props - Интерфейс с общими свойствами контейнера.
   * @returns Новый объект CSS-свойств.
   */
  public static buildContainer(props: IGeneralContainerProperties): TCssProperties
  {
    return {
      // Padding и Margin
      ...CssSpacingHelper.getPaddingProps(props),
      ...CssSpacingHelper.getMarginProps(props),
      // Border
      ...CssBorderHelper.getBorderProps(props),
      ...CssBorderHelper.getBorderShadowProps(props),
      // Container
      ...CssContainerHelper.getContainerProps(props)
    };
  }
  //#endregion

  //#region Background

  /**
   * Заполняет переданный объект стилей CSS-свойствами, связанными с фоном.
   * Включает background, box-shadow и другие фоновые свойства.
   *
   * @param style - Объект CSS-свойств, который будет изменён (мутация).
   * @param props - Интерфейс с общими свойствами фона.
   * @param override - Флаг, определяющий, следует ли перезаписывать существующие свойства.
   * @returns Изменённый объект стилей (тот же экземпляр, что и `style`).
   */
  public static fillBackground(style: TCssProperties, props: IGeneralBackgroundProperties, override: boolean): TCssProperties
  {
    CssBackgroundHelper.fillBackgroundProps(style, props, override);
    CssBackgroundHelper.fillBoxShadowProps(style, props, override);
    return style;
  }

  /**
   * Создаёт новый объект CSS-свойств, содержащий только фоновые свойства.
   * Возвращает новый объект без мутаций входных данных.
   *
   * @param props - Интерфейс с общими свойствами фона.
   * @returns Новый объект CSS-свойств, содержащий background и box-shadow.
   */
  public static buildBackground(props: IGeneralBackgroundProperties): TCssProperties
  {
    return {
      ...CssBackgroundHelper.getBackgroundProps(props),
      ...CssBackgroundHelper.getBoxShadowProps(props)
    };
  }
  //#endregion
}
