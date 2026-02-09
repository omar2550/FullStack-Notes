import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { useState, type SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import Input from "../components/ui/input";
import { useAuth } from "../context/Auth/AuthContext";

const Login = () => {

  const [formVal, setFormVal] = useState({ name: '', email: '', password: '' })
  const { login, loginIsLoading, } = useAuth()



  const handelSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formVal);
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl backdrop-blu max-w-md w-full shadow-xl rounded-2xl">
        <div className="py-6 px-4 sm:p-6">
          <h1 className="text-primary text-2xl font-bold">Welcome Back</h1>
          <form onSubmit={e => handelSubmit(e)} className="space-y-4 my-6">
            <Input Icon={Mail} required type='email' value={formVal.email} onChange={e => setFormVal({ ...formVal, email: e.target.value })} placeholder="Email Address" />

            <Input Icon={Lock} required type='password' value={formVal.password} onChange={e => setFormVal({ ...formVal, password: e.target.value })} placeholder="Password" />
            <Link to={'/forgot-password'} className="btn-link text-sm text-start block">Forgot Password</Link>
            <button type='submit' className={`btn btn-primary rounded-xl text-white block shadow-2xl w-full ${loginIsLoading && 'btn-disabled'}`}>
              {
                loginIsLoading ?
                  (
                    <>
                      <span className="loading loading-spinner" />
                      Logging In...
                    </>
                  )
                  :
                  'Log In'
              }
            </button>
          </form>
        </div>
        <div className="bg-gray-900 rounded-b-xl p-2 text-zinc-400">
          <p>Don't have an account? <Link to={'/signup'} className="btn-link">Sign Up</Link></p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login