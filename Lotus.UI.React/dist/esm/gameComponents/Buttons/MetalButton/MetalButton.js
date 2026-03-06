import { jsx as _jsx } from "react/jsx-runtime";
import classes from './MetalButton.module.css';
export function MetalButton(props) {
    const { children, className, variant = 'default', ...buttonProps } = props;
    // Объединяем базовый класс, класс варианта и внешний className, если он есть
    const combinedClasses = [classes.button, classes[variant] || '', className].join(' ').trim();
    return (_jsx("button", { className: combinedClasses, ...buttonProps, children: _jsx("div", { className: classes.content, children: children }) }));
}
//# sourceMappingURL=MetalButton.js.map