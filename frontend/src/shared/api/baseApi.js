import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth?.accessToken;
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers;
    },
});

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    tagTypes: ['User', 'Teacher', 'Type'],
    endpoints: () => ({}),
});