import { LogOut, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/Auth/AuthContext";

const Header = () => {

    const navigate = useNavigate();
    const { logout, logoutIsLoading, user } = useAuth()

    return (
        <header className="py-3 px-[10%] flex items-center justify-between bg-base-300 border-b border-base-content/10 bg-opacity-50 backdrop-filter backdrop-blur-xl backdrop-blu">
            <h1 className="font-bold text-sm sm:text-xl text-primary">{!logoutIsLoading && user?.name?.toUpperCase()}'s Notes</h1>
            <div className="flex gap-3">
                <button className="btn btn-success btn-xs sm:btn-sm text-xs sm:text-sm flex items-center gap-1" onClick={() => navigate('/create')}>
                    <Plus size={14} />
                    New Note
                </button>
                <button className="btn btn-primary btn-outline btn-xs sm:btn-sm text-xs sm:text-sm flex items-center gap-1" disabled={logoutIsLoading} onClick={() => {
                    logout();
                }}>
                    <LogOut size={14} />
                    Log Out
                </button>
            </div>
        </header>
    )
}

export default Header