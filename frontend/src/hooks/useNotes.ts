import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";

type NotesType = {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

type NoteType = {
    title: string;
    content: string;
}

export const useNotes = () => (

    useQuery<NotesType[], AxiosError>({
        queryKey: ['notes'],
    queryFn: async () => {
        const res = await api.get(`/api/notes`)
        return res.data;
    },
    retry: (failureCount, error) => {
        if (error.response?.status === 429) return false;
        
        return failureCount < 3;
    }
})
)

export const useNote = (id: string) => (

    useQuery<NoteType, AxiosError>({
        queryKey: ['note', id],
    queryFn: async () => {
        const res = await api.get(`/api/notes/${id}`)
        return res.data;
    },
    retry: (failureCount, error) => {
        if (error.response?.status === 429) return false;
        
        return failureCount < 3;
    }
})
)

export const useCreateNote = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation<NoteType, AxiosError, NoteType>({
        mutationFn: async (note) => {
            const res = await api.post(`/api/notes/`, note)
            return res.data
        },
        onMutate: () => {
            toast.loading('Creating...', { id: 'saveToast' });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes']});
            toast.success('Note created successfully', { id: 'saveToast' });
            navigate('/home')
        },
        onError: (error) => {
            if (error.response?.status !== 429) 
            return toast.error('Failed to create note', { id: 'saveToast' });
        }
    })
}

export const useEditeNote = (id: string) => {
    const queryClient = useQueryClient()

    return useMutation<NoteType, AxiosError, NoteType>({
        mutationFn: async (note) => {
            const res = await api.put(`/api/notes/${id}`, note)
            return res.data
        },
        onMutate: () => {
            toast.loading('Saving...', { id: 'saveToast' });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['note', id]});
            queryClient.invalidateQueries({ queryKey: ['notes']});
            toast.success('Note updated successfully', { id: 'saveToast' });
        },
        onError: (error) => {
            if (error.response?.status !== 429) 
            return toast.error('Failed to update note', { id: 'saveToast' });
        }
    })
}

export const useDeleteNote = (id: string) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation<void, AxiosError>({
        mutationFn: async () => {
            await api.delete(`/api/notes/${id}`)
        },
        onMutate: () => {
            toast.loading('Deleting...', { id: 'saveToast' });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes']});
            toast.success('Note Deleted successfully', { id: 'saveToast' });
            navigate('/home')
        },
        onError: (error) => {
            if (error.response?.status !== 429) 
            return toast.error('Failed to Delete note', { id: 'saveToast' });
        }
    })
}