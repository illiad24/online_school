import { authApi, selectAuthUser } from "@/features/auth"
import { redirect } from "react-router"
import { store } from "../store/store"

export const authCheckLoader =
    ({ refreshMutex }) =>
        async (route) => {
            return refreshMutex.runExclusive(async () => {
                const state = store.getState()
                console.log(store.getState())
                const user = await store.dispatch(
                    authApi.endpoints.refresh.initiate()
                ).unwrap()

                if (!user) {
                    try {
                        user = await store.dispatch(authApi.endpoints.refresh.initiate()).unwrap()
                    } catch (err) {
                        throw redirect("/login")
                    }
                }

                if (route?.meta?.requireAuth) {
                    if (!user) {
                        throw redirect("/login")
                    }
                    if (
                        route.meta?.roles?.length > 0 &&
                        !route.meta.roles.includes(user.role)
                    ) {
                        throw redirect("/forbidden")
                    }
                }

                return { user }
            })
        }
