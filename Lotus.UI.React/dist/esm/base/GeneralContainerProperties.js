import { GapSizes } from '#designSystem/sizes';
/**
 * Вспомогательный класс для работы с общими свойства элемента UI выступающего в качестве базового контейнера
 */
export class ContainerPropertiesHelper {
    // #region Common
    /**
     * Получить стандартные свойства контейнера
     * @param props Общие свойства элемента UI выступающего в качестве базового контейнера
     * @returns Стандартные свойства контейнера
     */
    static getContainerProperties(props) {
        const { w, h, p, pl, pt, pr, pb, m, ml, mt, mr, mb } = props;
        return { w, h, p, pl, pt, pr, pb, m, ml, mt, mr, mb };
    }
    // #endregion
    // #region Container
    /**
     * Создать свойства CSS по контейнеру в виде TCssProperties
     * @param props Общие свойства элемента UI выступающего в качестве базового контейнера
     * @returns Свойства CSS по контейнеру в виде TCssProperties
     */
    static createContainerProps(props) {
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
        if (props.gridColumn) {
            containerProps.gridColumnStart = props.gridColumn;
            containerProps.gridColumnEnd = props.gridColumn + 1;
        }
        if (props.gridColumnSpan) {
            containerProps.gridColumnStart = props.gridColumn;
            containerProps.gridColumnEnd = Number(props.gridColumn) + props.gridColumnSpan;
        }
        if (props.gridRow) {
            containerProps.gridRowStart = props.gridRow;
            containerProps.gridRowEnd = props.gridRow + 1;
        }
        if (props.gridRowSpan) {
            containerProps.gridRowStart = props.gridRow;
            containerProps.gridRowEnd = Number(props.gridRow) + props.gridRowSpan;
        }
        return containerProps;
    }
    // #endregion
    // #region FlexContainer
    /**
     * Получить оптимальные настройки Flex контейнера по горизонтали в виде CSSProperties
     * @param padding Внутренний отступ
     * @param isReverse Обратный порядок элементов
     * @param horizontalAlign Распределение элементов по ширине
     * @param verticalAlign Выравнивание элементов по вертикали
     * @returns Настройки Flex контейнера в виде CSSProperties
     */
    static getFlexRowContainer(padding, isReverse = false, horizontalAlign = 'flex-start', verticalAlign = 'center') {
        return {
            display: 'flex',
            flexDirection: isReverse ? 'row-reverse' : 'row',
            justifyContent: horizontalAlign,
            alignItems: verticalAlign,
            columnGap: GapSizes.getFromCssVariable(padding)
        };
    }
    /**
     * Получить оптимальные настройки Flex контейнера по вертикали в виде CSSProperties
     * @param designSystem Дизайн-система
     * @param padding Внутренний отступ
     * @param isReverse Обратный порядок элементов
     * @param verticalAlign Распределение элементов по высоте
     * @param horizontalAlign Выравнивание элементов по горизонтали
     * @returns Настройки Flex контейнера в виде CSSProperties
     */
    static getFlexColumnContainer(padding, isReverse = false, verticalAlign = 'flex-start', horizontalAlign = 'center') {
        return {
            display: 'flex',
            flexDirection: isReverse ? 'column-reverse' : 'column',
            justifyContent: verticalAlign,
            alignItems: horizontalAlign,
            rowGap: GapSizes.getFromCssVariable(padding)
        };
    }
}
//# sourceMappingURL=GeneralContainerProperties.js.map