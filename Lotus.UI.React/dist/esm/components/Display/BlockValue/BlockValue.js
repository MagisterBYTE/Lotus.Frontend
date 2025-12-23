import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from '@emotion/css';
import { CssPropertiesHelper } from '#helpers';
export function BlockValue(props) {
    const { label, value, accentColor = '#2196F3', valueStyle, className = '', asBadge = false, monospaceValue = false, ...otherProps } = props;
    const styleBaseContainer = {
        background: 'white',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        borderLeft: `4px solid ${accentColor}`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        // ...CssSpacingHelper.getPaddingProps(props),
        // ...CssSpacingHelper.getMarginProps(props),
        // ...CssContainerHelper.getContainerProps(props)
    };
    const styleLabelBase = {
        color: accentColor,
        display: 'block',
        marginBottom: '6px',
        fontSize: '13px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    };
    const styleValueBase = {
        color: '#333',
        fontWeight: 600,
        fontSize: '13px',
        wordBreak: 'break-all',
        ...(monospaceValue && { fontFamily: '\'Monaco\', \'Consolas\', monospace' }),
        ...valueStyle
    };
    const styleBadge = {
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: '20px',
        fontWeight: 600,
        fontSize: '13px',
        border: `1px solid ${accentColor}80` // 80 = 50% прозрачность
    };
    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    };
    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    };
    const blockValueClass = css({ ...styleBaseContainer, label: 'BlockValue' });
    // Фильтруем кастомные пропсы перед передачей в div
    const domProps = CssPropertiesHelper.filterDOMProps(otherProps);
    return (_jsxs("div", { className: blockValueClass, ...domProps, "aria-label": `${label}: ${typeof value === 'string' ? value : 'value block'}`, role: "region", onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [_jsx("strong", { style: styleLabelBase, children: label }), asBadge ? (_jsx("span", { style: { ...styleBadge, background: `${accentColor}20` }, children: value })) : (_jsx("div", { style: styleValueBase, children: value }))] }));
}
//# sourceMappingURL=BlockValue.js.map