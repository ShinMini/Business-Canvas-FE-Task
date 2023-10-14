import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery} from 'redux-saga/effects';
import { TOAST_EVENT_OCCURRED, ToastStateType, closeToastAction, getToastErrorAction, getToastSuccessAction } from '../slices/toastSlice';
import { ResourceState, addResource } from '../slices/resourceSlice';

export type ObservedPayloadType = PayloadAction<Pick<ToastStateType, 'message' | 'error'>>;

// return random boolean value(80%) after delay
const delay = (ms: number) => new Promise<boolean>((res) => setTimeout(res, ms));

function* getToastSaga({payload}: PayloadAction<ResourceState>) {
	try {
		yield put(TOAST_EVENT_OCCURRED());

		//  random delay (300ms ~ 1000ms)
		const randomDelay = Math.random() * (1000 - 300) + 300;
		yield call(delay, randomDelay);

		// 80% success, 20% fail
		if(Math.round(0.3 + Math.random())) {
			yield put(addResource(payload));
			yield put(getToastSuccessAction({ message: 'success', error: '' }));
		} else {
			yield put(getToastErrorAction({ message: '', error: 'fail to add' }));
		}

	} catch (error) {
		console.log(error);
		yield put(getToastErrorAction({message: '', error}));
	} finally {
		yield call(delay, 2000);  // wait 2 seconds for toast message
		yield put(closeToastAction());
	}
}

export const RESOURCE_EVENT_TRIGGER: string = 'resource/RESOURCE_EVENT_TRIGGER' as const;

export function* watchGetToast() {
	yield takeEvery(RESOURCE_EVENT_TRIGGER, getToastSaga);
}
