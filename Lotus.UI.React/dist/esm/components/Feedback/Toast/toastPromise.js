import { jsx as _jsx } from "react/jsx-runtime";
import { toast } from 'react-toastify';
import { ToastErrorPanel } from './ToastErrorPanel';
export const toastPromise = (promise, textPending, textSuccess, textFailed, 
// eslint-disable-next-line max-params
options) => {
    return toast.promise(promise, {
        pending: textPending,
        success: textSuccess,
        error: {
            render({ data }) {
                return _jsx(ToastErrorPanel, { error: data, title: textFailed });
            }
        }
    }, options);
};
//# sourceMappingURL=toastPromise.js.map