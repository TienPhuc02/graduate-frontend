import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './routes'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './providers/theme-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      {/* {children} */}
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)
