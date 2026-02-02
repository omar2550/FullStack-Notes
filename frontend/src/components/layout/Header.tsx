import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Header = () => {

    const navigate = useNavigate();

    return (
        <header className="py-3 px-[10%] flex items-center justify-between bg-base-300 border-b border-base-content/10">
            <h1 className="font-bold text-sm sm:text-xl text-primary">OMAR's Notes</h1>
            <button className="btn btn-success btn-xs sm:btn-sm text-xs sm:text-sm flex items-center gap-1" onClick={() => navigate('/create')}>
                <Plus size={14} />
                New Note
            </button>
        </header>
    )
}

export default Header