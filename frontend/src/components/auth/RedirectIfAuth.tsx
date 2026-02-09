import { useEffect, type ReactNode } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";

const RedirectIfAuth = ({ children }: { children: ReactNode }) => {

    const { checkAuthIsLoading, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkAuthIsLoading && user) {
            if (user.isVerified) navigate('/home', { replace: true });
            else if (!user.isVerified) navigate('/verify-email', { replace: true });
        }
    }, [user, checkAuthIsLoading, navigate]);

    return (
        <>{children}</>
    )
}

export default RedirectIfAuth