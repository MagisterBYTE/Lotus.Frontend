import { configureStore } from '@reduxjs/toolkit';
import { feedbackSlice } from '../../modules/feedback';
export function makeStoreCore() {
    return configureStore({
        reducer: {
            feedback: feedbackSlice.reducer,
            // @ts-expect-error window
            window: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        }
    });
}
export const storeCore = makeStoreCore();
