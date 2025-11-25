import { jsx as _jsx } from "react/jsx-runtime";
import { css } from '@emotion/css';
import { BuilderCssProperties } from '#builder';
import { CssPropertiesHelper } from '#helpers';
function buildBoxProps(props) {
    if (props.centerContent === 'horizontally') {
        return {
            display: 'grid',
            justifyItems: 'center',
            alignItems: 'start'
        };
    }
    if (props.centerContent === 'vertically') {
        return {
            display: 'grid',
            alignItems: 'center'
        };
    }
    if (props.centerContent === 'center') {
        return {
            display: 'grid',
            justifyItems: 'center',
            alignItems: 'center'
        };
    }
    return {};
}
export function Box(props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { centerContent, children, ...otherProps } = props;
    const styleDiv = {
        ...BuilderCssProperties.buildContainer(props),
        ...BuilderCssProperties.buildBackground(props),
        ...buildBoxProps(props)
    };
    const boxClass = css({ ...styleDiv, label: 'Box' });
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(otherProps);
    return _jsx("div", { className: boxClass, ...domProps, children: children });
}
//# sourceMappingURL=Box.js.map