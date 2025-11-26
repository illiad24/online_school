import { frontRoutes } from '@/shared/config/routes/frontRoutes'

const pageModules = import.meta.glob('../../pages/**/*.jsx')

function mapRoutes(pagesConfig) {
    return Object.keys(pagesConfig).map((pageKey) => {
        const route = { ...pagesConfig[pageKey] }

        const pagePath = `../../pages/${pageKey}.jsx`

        return {
            ...route,
            lazy: async () => {
                const module = await pageModules[pagePath]()
                return { Component: module.default }
            },
        }
    })
}

export const appRouterRoutes = mapRoutes(frontRoutes.pages)
