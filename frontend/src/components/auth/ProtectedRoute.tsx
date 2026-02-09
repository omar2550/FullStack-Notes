import { useEffect, type ReactNode } from "react"
import { useAuth } from "../../context/Auth/AuthContext"
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {

    const { checkAuthIsLoading, user, verifyEmailIsLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (checkAuthIsLoading || verifyEmailIsLoading) return;

        if (!user) {
            navigate('/signup', { replace: true });
        } else if (!user.isVerified) {

            navigate('/verify-email', { replace: true });
        }
    }, [user, checkAuthIsLoading, navigate, verifyEmailIsLoading])

    return <>
        {children}
    </>
}

export default ProtectedRoute