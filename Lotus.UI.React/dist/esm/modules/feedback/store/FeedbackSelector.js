import { useAppSelectorCore } from '../../../app/store';
export const useFeedbackState = () => {
    return useAppSelectorCore((state) => state.feedback);
};
