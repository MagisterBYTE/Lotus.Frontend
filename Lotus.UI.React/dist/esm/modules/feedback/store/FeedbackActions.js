import { createAction } from '@reduxjs/toolkit';
export const SHOW_ALERT_FEEDBACK = 'feedback/SHOW_ALERT_FEEDBACK';
export const showAlertFeedbackAction = createAction(SHOW_ALERT_FEEDBACK);
export const HIDE_ALERT_FEEDBACK = 'feedback/HIDE_ALERT_FEEDBACK';
export const hideAlertFeedbackAction = createAction(HIDE_ALERT_FEEDBACK);
