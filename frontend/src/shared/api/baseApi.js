import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

// Цей файл більше не імпортує setCredentials та logout напряму,
// що розриває залежність.

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Teacher', 'Type'],
    endpoints: () => ({}),
});