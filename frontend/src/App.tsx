import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Note from "./pages/Note"
import CreateNote from "./pages/CreateNote"
import Login from "./pages/Login"
import Welcome from "./pages/Welcome"
import FloatingShape from "./components/FloatingShape"
import Signup from "./pages/Signup"
import RedirectIfAuth from "./components/auth/RedirectIfAuth"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import AuthGate from "./components/auth/AuthGate"
import EmailVerification from "./pages/EmailVerification"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import NotFound from "./pages/Notefound"


const App = () => {



  return (

    <div className='min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 relative overflow-hidden'>
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
      <AuthGate>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={
            <RedirectIfAuth >
              <Signup />
            </RedirectIfAuth>
          } />
          <Route path="/verify-email" element={
            <RedirectIfAuth >
              <EmailVerification />
            </RedirectIfAuth>
          } />
          <Route path="/login" element={
            <RedirectIfAuth >
              <Login />
            </RedirectIfAuth>
          } />
          <Route path="/forgot-password" element={
            <RedirectIfAuth >
              <ForgotPassword />
            </RedirectIfAuth>
          } />
          <Route path="/reset-password" element={
            <RedirectIfAuth >
              <ResetPassword />
            </RedirectIfAuth>
          } />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/:id" element={
            <ProtectedRoute>
              <Note />
            </ProtectedRoute>
          } />
          <Route path="/create" element={
            <ProtectedRoute>
              <CreateNote />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthGate>
    </div>

  )
}

export default App