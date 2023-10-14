import { createSlice} from '@reduxjs/toolkit';
import { ObservedPayloadType } from '../saga/event-saga';

export type ToastStateType = {
  message: string;
  error?: unknown;
  isLoading: boolean;
};

const initialState: ToastStateType = {
	message: '',
	error: '',
	isLoading: false,
};

export const toastSlice = createSlice({
	name: 'toast',
	initialState,
	reducers: {
		TOAST_EVENT_OCCURRED: (state: ToastStateType) => {
			state.isLoading = true;
		},
		getToastSuccessAction: (state: ToastStateType, { payload }: ObservedPayloadType) => {
			state.message = payload.message;
			state.isLoading = false;
		},
		getToastErrorAction: (state: ToastStateType, { payload }: ObservedPayloadType) => {
			state.error = payload.error || 'Something went wrong';
			state.message = '';
			state.isLoading = false;
		},
		closeToastAction: (state: ToastStateType) => {
			state.isLoading = false;
			state.message = '';
			state.error = '';
		},
	},
});

export const { TOAST_EVENT_OCCURRED, getToastErrorAction, getToastSuccessAction, closeToastAction } = toastSlice.actions;

export default toastSlice.reducer;
