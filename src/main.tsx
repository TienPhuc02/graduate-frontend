import { createRoot } from 'react-dom/client'
import './index.css'
import router from './routes'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './providers/ThemeProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/sonner'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-center' richColors expand duration={3000} closeButton visibleToasts={3} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ThemeProvider>
)
