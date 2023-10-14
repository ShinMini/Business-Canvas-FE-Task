import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { persistConfig } from './persist';
import rootSaga from './saga';

import { resourceSlice, toastSlice } from './slices';

export const rootReducer = combineReducers({
	toast: toastSlice,
	resource: resourceSlice,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware({
			serializableCheck: false,
			sagaMiddleware: true,
		}).concat(sagaMiddleware);
	},
});
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
