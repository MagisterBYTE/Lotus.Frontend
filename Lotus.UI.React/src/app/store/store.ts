import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { feedbackSlice } from '../../modules/feedback';

export function makeStoreCore() 
{
  return configureStore({
    reducer: {
      feedback: feedbackSlice.reducer,
      // @ts-expect-error window
      window: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    }
  });
}

export const storeCore = makeStoreCore();

export type RootStateCore = ReturnType<typeof storeCore.getState>;

export type AppDispatchCore = typeof storeCore.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateCore,
  unknown,
  Action<string>
>;
