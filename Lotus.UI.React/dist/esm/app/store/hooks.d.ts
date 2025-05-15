export declare const useAppDispatchCore: import("react-redux").UseDispatch<import("redux-thunk").ThunkDispatch<{
    feedback: import("../../modules/feedback/store/FeedbackState").IFeedbackState;
    window: unknown;
}, undefined, import("redux").UnknownAction> & import("redux").Dispatch<import("redux").UnknownAction>>;
export declare const useAppSelectorCore: import("react-redux").UseSelector<{
    feedback: import("../../modules/feedback/store/FeedbackState").IFeedbackState;
    window: unknown;
}>;
