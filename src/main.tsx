import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ScopedCssBaseline, ThemeProvider } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#000e35',
    },
    secondary: {
      main: '#f50057'
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ScopedCssBaseline>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ScopedCssBaseline>
  </StrictMode>,
)
