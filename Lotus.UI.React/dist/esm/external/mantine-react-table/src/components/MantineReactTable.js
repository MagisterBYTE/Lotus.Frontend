import { jsx as _jsx } from "react/jsx-runtime";
import { useMantineReactTable } from '../hooks/useMantineReactTable';
import { MRT_TablePaper } from './table/MRT_TablePaper';
const isTableInstanceProp = (props) => props.table !== undefined;
export const MantineReactTable = (props) => {
    let table;
    if (isTableInstanceProp(props)) {
        table = props.table;
    }
    else {
        table = useMantineReactTable(props);
    }
    return _jsx(MRT_TablePaper, { table: table });
};
//# sourceMappingURL=MantineReactTable.js.map