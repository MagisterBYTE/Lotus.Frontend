import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { OptionHelper } from 'lotus-core/modules/option';
import { memo } from 'react';
import { Option } from '../Option';
export const Item = memo((props) => {
    if (OptionHelper.instanceOfOption(props.item)) {
        return _jsx(Option, { ...props, option: props.item });
    }
    return _jsx(_Fragment, {});
});
// Назначаем имя для отладки в DevTools
Item.displayName = 'Item';
//# sourceMappingURL=Item.js.map