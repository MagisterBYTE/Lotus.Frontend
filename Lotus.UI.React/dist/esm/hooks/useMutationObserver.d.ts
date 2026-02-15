export interface IMutationObserverProps {
    callback: (mutations: MutationRecord[], observer: MutationObserver) => void;
    options: MutationObserverInit;
}
export declare function useMutationObserver(props: IMutationObserverProps): void;
//# sourceMappingURL=useMutationObserver.d.ts.map