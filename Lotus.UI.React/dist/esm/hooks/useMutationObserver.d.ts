export interface IMutationObserverProps {
    callback: (mutations: MutationRecord[], observer: MutationObserver) => void;
    options: MutationObserverInit;
}
export declare const useMutationObserver: (props: IMutationObserverProps) => void;
