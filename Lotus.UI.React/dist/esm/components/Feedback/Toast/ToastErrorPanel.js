import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { castToResult } from 'lotus-core/types';
export const ToastErrorPanel = ({ title, error }) => {
    const result = castToResult(error);
    if (result) {
        return _jsxs(_Fragment, { children: [_jsx("p", { style: { fontSize: '0.9em' }, children: title }), _jsxs("p", { style: { fontSize: '0.8em' }, children: ["Code: ", result.code] }), _jsxs("p", { style: { fontSize: '0.8em' }, children: ["Message: ", result.message] }), result.data && _jsxs("p", { style: { fontSize: '0.8em' }, children: ["Data: ", result.data] })] });
    }
    else {
        const authError = (error['error'] && error['error_description']);
        if (authError) {
            return _jsxs(_Fragment, { children: [_jsx("p", { style: { fontSize: '0.9em' }, children: title }), _jsxs("p", { style: { fontSize: '0.8em' }, children: ["Error: ", error['error']] }), _jsxs("p", { style: { fontSize: '0.8em' }, children: ["Message: ", error['error_description']] })] });
        }
        else {
            return _jsxs(_Fragment, { children: [_jsx("span", { style: { fontSize: '0.9em' }, children: title }), _jsx("br", {}), _jsxs("span", { style: { fontSize: '0.8em' }, children: ["Error: ", error.toString()] }), _jsx("br", {})] });
        }
    }
};
//# sourceMappingURL=ToastErrorPanel.js.map