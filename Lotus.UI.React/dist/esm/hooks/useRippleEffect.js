/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from 'react';
const selfRippleDocument = () => document;
const completedFactorRipple = 0.4;
const classNameRipple = '__useRipple--ripple';
const containerClassNameRipple = '__useRipple--ripple-container';
/**
 * useRipple - Material UI style ripple effect React hook
 * @param inputOptions Ripple options
 * @returns Tuple `[ref, event]`. See https://github.com/asplunds/use-ripple for usage
 */
export function useRippleEffect(inputOptions) {
    const internalRef = useRef(null);
    const { ref, ...options } = {
        duration: 450,
        color: 'rgba(255, 255, 255, .3)',
        cancelAutomatically: false,
        timingFunction: 'cubic-bezier(.42,.36,.28,.88)',
        disabled: false,
        className: classNameRipple,
        containerClassName: containerClassNameRipple,
        ignoreNonLeftClick: true,
        ref: internalRef,
        ...(inputOptions ?? {})
    };
    const event = useCallback((event) => {
        if (!ref.current ||
            options.disabled ||
            (options.ignoreNonLeftClick &&
                event.nativeEvent?.which !== 1 &&
                event.nativeEvent?.type === 'mousedown'))
            return;
        const target = ref.current;
        if (window.getComputedStyle(target).position === 'static')
            void applyStylesRippleEffect([['position', 'relative']], target);
        if (!target)
            return;
        const existingContainer = target.querySelector(`:scope > .${options.containerClassName}`);
        const container = existingContainer ??
            createRippleContainer(options.containerClassName);
        if (!existingContainer)
            target.appendChild(container);
        // Used to ensure overflow: hidden is registered properly on IOS Safari before ripple is shown
        void requestAnimationFrame(() => {
            const begun = Date.now();
            const ripple = centerElementToPointerRippleEffect(event, target, createRippleEffect(target, event, options));
            const events = ['mouseup', 'touchend'];
            const cancelRipple = () => {
                const now = Date.now();
                const diff = now - begun;
                // Ensure the transform animation is complete before cancellation
                void setTimeout(() => {
                    void cancelRippleAnimation(ripple, options);
                }, diff > 0.4 * options.duration
                    ? 0
                    : completedFactorRipple * options.duration - diff);
                for (const event of events)
                    void selfRippleDocument().removeEventListener(event, cancelRipple);
            };
            if (!options.cancelAutomatically && !isTouchDeviceRippleEffect())
                for (const event of events)
                    void selfRippleDocument().addEventListener(event, cancelRipple);
            else
                setTimeout(() => void cancelRippleAnimation(ripple, options), options.duration * completedFactorRipple);
            void container.appendChild(ripple);
            void options.onSpawn?.({
                ripple,
                cancelRipple,
                event,
                ref,
                container
            });
        });
    }, [ref, options]);
    return [ref, event];
}
/**
 * HOF useRipple - Generate a custom ripple hook with predefined options
 *
 * After generating a HOF useRipple you can then override some or all predefined options by passing a new option object.
 * @param inputOptions ripple options
 * @returns Custom HOC useRipple hook
 */
export function customRippleEffect(inputOptions) {
    return (overrideOptions) => useRippleEffect({
        ...inputOptions,
        ...overrideOptions
    });
}
function centerElementToPointerRippleEffect(event, ref, element) {
    const { top, left } = ref.getBoundingClientRect();
    void element.style.setProperty('top', pxRippleEffect(event.clientY - top));
    void element.style.setProperty('left', pxRippleEffect(event.clientX - left));
    return element;
}
function pxRippleEffect(arg) {
    return `${arg}px`;
}
function createRippleEffect(ref, event, { duration, color, timingFunction, className }, ctx = document) {
    const element = ctx.createElement('div');
    const { clientX, clientY } = event;
    const { height, width, top, left } = ref.getBoundingClientRect();
    const maxHeight = Math.max(clientY - top, height - clientY + top);
    const maxWidth = Math.max(clientX - left, width - clientX + left);
    const size = pxRippleEffect(Math.hypot(maxHeight, maxWidth) * 2);
    const styles = [
        ['position', 'absolute'],
        ['height', size],
        ['width', size],
        ['transform', 'translate(-50%, -50%) scale(0)'],
        ['pointer-events', 'none'],
        ['border-radius', '50%'],
        ['opacity', '.6'],
        ['background', color],
        [
            'transition',
            `transform ${duration * 0.6}ms ${timingFunction}, opacity ${Math.max(duration * 0.05, 140)}ms ease-out`
        ]
    ];
    void element.classList.add(className);
    void window.requestAnimationFrame(() => {
        void applyStylesRippleEffect([['transform', 'translate(-50%, -50%) scale(1)']], element);
    });
    return applyStylesRippleEffect(styles, element);
}
function applyStylesRippleEffect(styles, target) {
    if (!target)
        return target;
    for (const [property, value] of styles) {
        void target.style.setProperty(property, value);
    }
    return target;
}
function cancelRippleAnimation(element, options) {
    const { duration, timingFunction } = options;
    void applyStylesRippleEffect([
        ['opacity', '0'],
        [
            'transition',
            `transform ${duration * 0.6}ms ${timingFunction}, opacity ${duration * 0.65}ms ease-in-out ${duration * 0.13}ms`
        ]
    ], element);
    void window.requestAnimationFrame(() => {
        void element.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'opacity')
                void element.remove();
        });
    });
}
function createRippleContainer(className) {
    const container = selfRippleDocument().createElement('div');
    void container.classList.add(className);
    return applyStylesRippleEffect([
        ['position', 'absolute'],
        ['height', '100%'],
        ['width', '100%'],
        ['border-radius', 'inherit'],
        ['top', '0'],
        ['left', '0'],
        ['pointer-events', 'none'],
        ['overflow', 'hidden']
    ], container);
}
/** taken from https://stackoverflow.com/a/4819886/13188385 */
function isTouchDeviceRippleEffect() {
    return ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator?.msMaxTouchPoints ?? 0 > 0));
}
//# sourceMappingURL=useRippleEffect.js.map