import { LogIn, NotepadText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Welcome = () => {

    const navigate = useNavigate();

    return (
        <div
            className="flex items-center justify-center min-h-screen text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-base-300 bg-opacity-50 backdrop-filter backdrop-blur-xl backdrop-blu max-w-md w-full shadow-xl r-3xl p-9 rounded-2xl">
                <NotepadText className="w-20 h-20 mx-auto text-primary" />
                <h1 className="text-xl sm:text-3xl font-bold text-primary mt-4">Welcome To Your Notes App</h1>
                <p className="text-sm sm:text-[16px] text-green-200">Open and Edit Your Note From Any Where Any Tome</p>
                <div className="flex items-center justify-between mt-9">
                    <button className="btn btn-primary" onClick={() => navigate('/signup')}>
                        Signup
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate('/login')}>
                        <LogIn />
                        Login
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default Welcome