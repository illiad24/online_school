import { createRoot } from 'react-dom/client'
import './index.css'
import './assets/styles/index.scss'
import { RouterProvider } from 'react-router'
import { router } from './app/router/router'
import { Provider } from 'react-redux'
import { store } from './app/store/store'
import { AppInit } from './app/init/AppInit'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './shared/config/mui/themes'

createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
            <AppInit />
            <RouterProvider router={router} />
        </Provider>
    </ThemeProvider>
)
