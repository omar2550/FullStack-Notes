import type { ReactNode } from "react";
import { useAuth } from "../../context/Auth/AuthContext";

const AuthGate = ({ children }: { children: ReactNode }) => {

    const { checkAuthIsLoading } = useAuth();

    if (checkAuthIsLoading) {
        return (
            <div className="flex items-center justify-center h-screen text-primary">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        )
    }

    return (
        <>{children}</>
    )
}

export default AuthGate