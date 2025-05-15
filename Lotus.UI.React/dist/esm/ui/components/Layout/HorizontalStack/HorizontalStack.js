import { jsx as _jsx } from "react/jsx-runtime";
export const HorizontalStack = (props) => {
    const { gap, alignItems, justifyContent, wrap, children, fullWidth, fullHeight, ...divProps } = props;
    return (_jsx("div", { ...divProps, style: {
            display: 'flex',
            flexDirection: 'row',
            gap: gap,
            alignItems: alignItems ?? 'baseline',
            justifyContent: justifyContent ?? 'flex-start',
            flexWrap: wrap,
            width: fullWidth ? '100%' : divProps.style?.width,
            height: fullHeight ? '100%' : divProps.style?.width,
            ...divProps.style
        }, children: children }));
};
