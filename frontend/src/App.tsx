import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Note from "./pages/Note"
import CreateNote from "./pages/CreateNote"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen w-full">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Note />} />
          <Route path="/create" element={<CreateNote />} />
        </Routes>
      </div>
    </QueryClientProvider>
  )
}

export default App