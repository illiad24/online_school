import { baseApi } from '@/shared/api/baseApi'

import { apiRoutes } from '@/shared/config/routes/apiRoutes'

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => ({
                url: apiRoutes.users.list,
            }),
            providesTags: ['User'],
        }),

        updateUser: build.mutation({
            query: ({ id, role }) => ({
                url: apiRoutes.users.update(id),
                method: 'PUT',
                body: { id, role },
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: build.mutation({
            query: (id) => ({
                url: apiRoutes.users.delete(id),
                method: 'DELETE'
            }),
            invalidatesTags: ['User'],
        }),
    }),
})
export const { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } = userApi