import { frontRoutes } from '@/shared/config/routes/frontRoutes'

function mapRoutes(pages) {
    return Object.keys(pages).map((page) => {
        const route = { ...pages[page] }
        if (route.children) {
            route.children = route.children.map((child) => ({
                ...child,
                lazy: child.Component
                    ? async () => ({ Component: child.Component })
                    : undefined,
            }))
        }
        return {
            ...route,
            lazy: async () => ({
                Component: (await import(`../../pages/${page}`)).default,
            }),
        }
    })
}

export const appRouterRoutes = mapRoutes(frontRoutes.pages)

console.log(appRouterRoutes)