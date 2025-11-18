import { baseApi } from "@/shared/api/baseApi";
import { apiRoutes } from "@/shared/config/routes/apiRoutes";

export const enrollmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getEnrollments: build.query({
            query: () => ({
                url: apiRoutes.users.list,
            }),
            providesTags: ['Enrollment'],
        })
    })
})