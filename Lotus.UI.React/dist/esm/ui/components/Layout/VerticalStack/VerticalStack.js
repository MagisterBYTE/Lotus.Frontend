import { jsx as _jsx } from "react/jsx-runtime";
export const VerticalStack = (props) => {
    const { gap, alignItems, justifyContent, wrap, children, fullWidth, fullHeight, ...divProps } = props;
    return (_jsx("div", { ...divProps, style: {
            display: 'flex',
            flexDirection: 'column',
            gap: gap,
            alignItems: alignItems ?? 'start',
            justifyContent: justifyContent ?? 'flex-start',
            flexWrap: wrap,
            width: fullWidth ? '100%' : divProps.style?.width,
            height: fullHeight ? '100%' : divProps.style?.height,
            ...divProps.style
        }, children: children }));
};
