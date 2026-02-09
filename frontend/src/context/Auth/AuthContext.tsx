import { createContext, useContext, type ReactNode } from "react";
import api from "../../lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
    name?: string;
    email: string;
    password?: string;
    isVerified?: boolean
}

interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    checkAuth: () => void;
    resetPassword: (token: string, password: string) => void;
    forgotPassword: (email: string) => void;
    signup: (user: User) => void;
    verifyEmail: (code: string) => void;
    signupIsLoading: boolean;
    logoutIsLoading: boolean;
    loginIsLoading: boolean;
    checkAuthIsLoading: boolean;
    verifyEmailIsLoading: boolean;
    forgotPasswordIsLoading: boolean;
    forgotPasswordIsError: boolean;
    resetPasswordIsLoading: boolean;
    resetPasswordError: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const { data, isLoading: checkAuthIsLoading, refetch } = useQuery<User | null>({
        queryKey: ['authUser'],
        queryFn: async () => {
            try {
                const res = await api.get('/api/auth/check-auth');
                return res.data.user;
            } catch (err) {
                throw err;
            }
        },
        retry: false,
        refetchOnWindowFocus: false,
    });
    const signupMutation = useMutation({
        mutationFn: async (user: User) => {
            const res = await api.post('/api/auth/signup', user);
            return res.data;
        },
        onMutate: () => toast.loading('Signing Up...', { id: 'signup' }),
        onSuccess: (data) => {
            toast.success('Signed Up Successfully', { id: 'signup' });
            queryClient.setQueryData(['authUser'], data.user);
            navigate('/verify-email');
        },
        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const serverMessage = error.response?.data?.message;
                toast.error(serverMessage || 'Signup Failed, Please try again', { id: 'signup' });
            } else {
                toast.error('Something went wrong', { id: 'signup' });
            }
        },
    });

    const verifyEmailMutation = useMutation({
        mutationFn: async (code: string) => {
            const res = await api.post('/api/auth/verify-email', { code });
            return res.data;
        },
        onMutate: () => toast.loading('Sending Verification code...', { id: 'verify-email' }),
        onSuccess: (data) => {
            console.log(data)

            queryClient.setQueryData(['authUser'], data.user);
            toast.success('Email verified!', { id: 'verify-email' });
            navigate('/home', { replace: true });
        },
        onError: (error: any) => {
            navigate('/verify-email')
            if (axios.isAxiosError(error)) {
                const serverMessage = error.response?.data?.message;
                toast.error(serverMessage, { id: 'verify-email' });
            }
            else {
                toast.error('Something went wrong', { id: 'verify-email' });
            }
        },
    });

    const loginMutation = useMutation({
        mutationFn: async (user: User) => {
            const res = await api.post('/api/auth/login', user);
            return res.data;
        },
        onMutate: () => toast.loading('Logging in...', { id: 'login' }),
        onSuccess: (data) => {
            toast.success('Logged In Successfully', { id: 'login' });
            queryClient.setQueryData(['authUser'], data.user);
            navigate('/home');
        },
        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const serverMessage = error.response?.data?.message;
                toast.error(serverMessage, { id: 'login' });
            }
            else {
                toast.error('Something went wrong', { id: 'login' });
            }
        },
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const res = await api.post('/api/auth/logout');
            return res.data;
        },
        onMutate: () => toast.loading('Logging Out...', { id: 'logout' }),
        onSuccess: () => {
            toast.success('Logged Out Successfully', { id: 'logout' });
            queryClient.clear();
            navigate('/', { replace: true });
        },
        onError: () => toast.error('Logout Failed Please try Again', { id: 'logout' }),
    });

    const forgotPasswordMutation = useMutation({
        mutationFn: async (email: string) => {
            const res = await api.post('/api/auth/forgot-password', { email });
            return res.data;
        },
        onMutate: () => toast.loading('Sending Link...', { id: 'forgot-password' }),
        onSuccess: (data) => {
            toast.success('Link sent Successfully', { id: 'forgot-password' });
            console.log(data.url)
        },
        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const serverMessage = error.response?.data?.message;
                toast.error(serverMessage, { id: 'forgot-password' });
            }
            else {
                toast.error('Something went wrong', { id: 'forgot-password' });
            }
        },
    });

    const resetPasswordMutation = useMutation({
        mutationFn: async ({ token, password }: { token: string, password: string }) => {
            const res = await api.post(`/api/auth/reset-password?token=${token}`, { newPassword: password });
            return res.data;
        },
        onMutate: () => toast.loading('Resetting Password...', { id: 'reset-password' }),
        onSuccess: () => {
            toast.success('Password Reset Successfully', { id: 'reset-password' });
            navigate('/login');
        },
        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const serverMessage = error.response?.data?.message;
                toast.error(serverMessage, { id: 'reset-password' });
            }
            else {
                toast.error('Something went wrong', { id: 'reset-password' });
            }
        },
    });

    const value: AuthContextType = {
        user: data ?? null,
        signup: (user) => signupMutation.mutate(user),
        verifyEmail: (code) => verifyEmailMutation.mutate(code),
        login: (user) => loginMutation.mutate(user),
        logout: () => logoutMutation.mutate(),
        resetPassword: (token, password) => resetPasswordMutation.mutate({ token, password }),
        checkAuth: () => refetch(),
        forgotPassword: (email) => forgotPasswordMutation.mutate(email),
        signupIsLoading: signupMutation.isPending,
        logoutIsLoading: logoutMutation.isPending,
        loginIsLoading: loginMutation.isPending,
        checkAuthIsLoading: checkAuthIsLoading,
        verifyEmailIsLoading: verifyEmailMutation.isPending,
        forgotPasswordIsLoading: forgotPasswordMutation.isPending,
        forgotPasswordIsError: forgotPasswordMutation.isError,
        resetPasswordIsLoading: resetPasswordMutation.isPending,
        resetPasswordError: resetPasswordMutation.error?.response?.data?.message,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}