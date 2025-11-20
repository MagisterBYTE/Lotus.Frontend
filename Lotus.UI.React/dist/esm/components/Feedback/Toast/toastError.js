import { jsx as _jsx } from "react/jsx-runtime";
import { toast } from 'react-toastify';
import { ToastErrorPanel } from './ToastErrorPanel';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toastError = (error, title) => {
    return toast.error(_jsx(ToastErrorPanel, { error: error, title: title }));
};
//# sourceMappingURL=toastError.js.map