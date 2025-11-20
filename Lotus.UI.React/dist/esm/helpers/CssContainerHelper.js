import { CssPropertiesHelper } from '#helpers';
export class CssContainerHelper {
    // #region Container
    /**
     * Заполнить свойства CSS по контейнеру в виде TCssProperties
     * @param style Текущие свойства
     * @param props Общие свойства элемента UI выступающего в качестве базового контейнера
     * @param override Перезаписать если эти свойства уже есть
     * @returns Свойства CSS по контейнеру в виде TCssProperties
     */
    static fillContainerProps(style, props, override) {
        CssPropertiesHelper.overrideStyleValue(style, 'width', props.w, override);
        CssPropertiesHelper.overrideStyleValue(style, 'height', props.h, override);
        CssPropertiesHelper.overrideStyleValue(style, 'flexGrow', props.grow, override);
        CssPropertiesHelper.overrideStyleValue(style, 'flexShrink', props.shrink, override);
        if (props.gridColumn && props.gridColumnSpan) {
            CssPropertiesHelper.overrideStyleValue(style, 'gridColumnStart', props.gridColumn, override);
            CssPropertiesHelper.overrideStyleValue(style, 'gridColumnEnd', props.gridColumnSpan, override);
        }
        else {
            if (props.gridColumn) {
                CssPropertiesHelper.overrideStyleValue(style, 'gridColumnStart', props.gridColumn, override);
                if (typeof props.gridColumn === 'number') {
                    CssPropertiesHelper.overrideStyleValue(style, 'gridColumnEnd', props.gridColumn + 1, override);
                }
            }
        }
        if (props.gridRow && props.gridRowSpan) {
            CssPropertiesHelper.overrideStyleValue(style, 'gridRowStart', props.gridRow, override);
            CssPropertiesHelper.overrideStyleValue(style, 'gridRowEnd', props.gridRowSpan, override);
        }
        else {
            if (props.gridColumn) {
                CssPropertiesHelper.overrideStyleValue(style, 'gridRowStart', props.gridRow, override);
                if (typeof props.gridRow === 'number') {
                    CssPropertiesHelper.overrideStyleValue(style, 'gridRowEnd', props.gridRow + 1, override);
                }
            }
        }
        return style;
    }
    /**
     * Получить свойства CSS по контейнеру в виде TCssProperties
     * @param props Общие свойства элемента UI выступающего в качестве базового контейнера
     * @returns Свойства CSS по контейнеру в виде TCssProperties
     */
    static getContainerProps(props) {
        const containerProps = {};
        if (props.w) {
            containerProps.width = props.w;
        }
        if (props.h) {
            containerProps.height = props.h;
        }
        if (props.grow) {
            containerProps.flexGrow = props.grow;
        }
        if (props.shrink) {
            containerProps.flexShrink = props.shrink;
        }
        return containerProps;
    }
}
//# sourceMappingURL=CssContainerHelper.js.map