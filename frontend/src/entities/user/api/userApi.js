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
        getUserById: build.query({
            query: (id) => ({
                url: apiRoutes.users.getById(id),
            }),
            providesTags: ['User'],
        }),

        updateUser: build.mutation({
            query: ({ id, data }) => ({
                url: apiRoutes.users.update(id),
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        updateUserRole: build.mutation({
            query: ({ id, role }) => ({
                url: apiRoutes.users.updateRole(id),
                method: 'PUT',
                body: { role },
            }),
            invalidatesTags: ['User'],
        }),
        deleteUserByAdmin: build.mutation({
            query: (id) => ({
                url: apiRoutes.users.deleteByAdmin(id),
                method: 'DELETE'
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

        changePassword: build.mutation({
            query: ({ id, data }) => ({
                url: apiRoutes.users.changePassword(id),
                method: 'POST',
                body: data,
            })
        })
    }),
})
export const { useGetUsersQuery, useGetUserByIdQuery, useUpdateUserMutation, useDeleteUserMutation, useDeleteUserByAdminMutation, useChangePasswordMutation, useUpdateUserRoleMutation } = userApi