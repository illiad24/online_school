// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api/baseApi';
import authReducer from '@/features/auth/api/authSlice';
import { setCredentials, logout } from '@/features/auth/api/authSlice';

// Додамо ваші actions до API як middleware
baseApi.enhanceEndpoints({
    endpoints: () => ({}),
    extraMiddleware: ({ dispatch }) => (next) => (action) => {
        if (action.type === 'api/execute') {
            const { dispatchSetCredentials, dispatchLogout } = baseApi.util.getActions();
            if (dispatchSetCredentials && dispatchLogout) {
                // Передаємо дії до baseQueryWithReauth
                action.meta.baseQuery.dispatchSetCredentials = setCredentials;
                action.meta.baseQuery.dispatchLogout = logout;
            }
        }
        return next(action);
    },
});

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});