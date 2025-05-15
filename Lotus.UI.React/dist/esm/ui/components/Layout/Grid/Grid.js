import { jsx as _jsx } from "react/jsx-runtime";
export const Grid = (props) => {
    const { gridTemplateColumns, gridTemplateRows, columnGap, rowGap, horizontalAlign, verticalAlign, horizontalContentAlign, verticalContentAlign, children, ...divProps } = props;
    return (_jsx("div", { ...divProps, style: {
            display: 'grid',
            gridTemplateColumns: gridTemplateColumns,
            gridTemplateRows: gridTemplateRows,
            columnGap: columnGap,
            rowGap: rowGap,
            justifyContent: horizontalAlign ?? 'stretch',
            alignContent: verticalAlign ?? 'center',
            justifyItems: horizontalContentAlign ?? 'start',
            alignItems: verticalContentAlign ?? 'center',
            ...divProps.style
        }, children: children }));
};
