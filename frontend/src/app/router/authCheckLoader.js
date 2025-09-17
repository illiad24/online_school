import { authApi, selectAuthUser } from "@/features/auth"
import { redirect } from "react-router"
import { store } from "../store/store"

let refreshTried = false

export const authCheckLoader = ({ refreshMutex, meta }) => async () => {
    let state = store.getState()
    let user = selectAuthUser(state)

    if (!user && !refreshTried) {
        refreshTried = true
        await refreshMutex.runExclusive(async () => {
            state = store.getState()
            user = selectAuthUser(state)
            if (!user) {
                try {
                    const result = await store.dispatch(authApi.endpoints.refresh.initiate()).unwrap()
                    user = result.user
                } catch {
                    user = null
                }
            }
        })
    }

    state = store.getState()

    user = selectAuthUser(state)

    if (meta?.requireAuth) {
        if (meta.roles?.length > 0 && !meta.roles.includes(user?.role?.title)) {
            throw redirect("/forbidden")
        }
        if (!user) {
            refreshTried = false
            throw redirect("/login")
        }
    }

    return { user }
}
