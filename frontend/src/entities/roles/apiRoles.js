import { baseApi } from '@/shared/api/baseApi'

import { apiRoutes } from '@/shared/config/routes/apiRoutes'

export const rolesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getRoles: build.query({
            query: () => ({
                url: apiRoutes.roles.list,
            }),
            providesTags: ['Roles'],
        }),

    }),
})
export const { useGetRolesQuery } = rolesApi