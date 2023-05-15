import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { worker } from './mock/browser'
import { Global } from '@emotion/react'
import GlobalStyle from './style/globalStyle'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './style/theme'

if (import.meta.env.VITE_MOCKING_ENABLE === 'true') {
  worker().start({ onUnhandledRequest: 'bypass' })
}

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyle} />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
