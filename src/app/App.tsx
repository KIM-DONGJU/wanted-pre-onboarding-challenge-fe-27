import { queryClient } from "@/shared/api/queryClient"

import { QueryProvider } from "./providers";
import { AppRouter } from "./routers"

import './styles/index.css'

function App() {
  return (
    <QueryProvider client={queryClient}>
      <AppRouter />
    </QueryProvider>
  )
}

export default App
