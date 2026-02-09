import { ArrowLeft, Trash2 } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { useDeleteNote, useEditeNote, useNote } from "../hooks/useNotes";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Dialog from "../components/ui/dialog";
import RateLimitedUI from "../components/RateLimitedUI";

const Note = () => {

    const navigate = useNavigate()
    const { id } = useParams();

    const { data, isLoading, error } = useNote(id!)
    const { mutate, isPending, error: editeError } = useEditeNote(id!)
    const { mutate: deleteMutate, error: deleteError } = useDeleteNote(id!)

    const [form, setForm] = useState({ title: '', content: '' })
    const [open, setOpen] = useState(false)

    const isRateLimited =
        error?.response?.status === 429 ||
        editeError?.response?.status === 429 ||
        deleteError?.response?.status === 429

    if (isRateLimited) {
        return <RateLimitedUI />
    }

    useEffect(() => {
        if (error?.response?.status === 404) {
            toast.error('Invalid ID');
        } else if (data) setForm({ title: data?.title, content: data?.content })
    }, [error, data]);

    const handelSubmit = () => {
        if (!form.title.trim()) {
            toast.error('Title is required');
            return;
        }

        if (!form.content.trim()) {
            toast.error('Content is required');
            return;
        }

        mutate(form);
    };
    const deleteNote = () => {
        deleteMutate();
    };

    return (
        <div className="bg-base-200 min-h-screen bg-opacity-50 backdrop-filter backdrop-blur-xl backdrop-blu">
            <Dialog open={open} onChange={setOpen} onConfirm={deleteNote} />
            <div className="mx-auto sm:w-[75%]">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-y-3 sm:justify-between py-4">
                    <button className={`btn btn-ghost`} onClick={() => navigate('/home')}>
                        <ArrowLeft />
                        Back to Notes
                    </button>
                    <button className={`btn btn-error btn-outline ${isLoading ? 'btn-disabled' : ''}`} onClick={() => setOpen(true)}>
                        <Trash2 size={20} />
                        Delete Note
                    </button>
                </div>
                <div className="card bg-base-100">
                    <div className="card-body space-y-4">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Title</span>
                            </div>
                            {isLoading ? (<div className="skeleton input" />) : (<input type="text" value={form?.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="The Title..." className="input input-bordered w-full" />)}
                        </label>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Content</span>
                            </div>
                            {isLoading ? (<div className="skeleton textarea h-36" />) : (<textarea rows={6} value={form?.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="textarea textarea-bordered resize-none" placeholder="The Content Is..."></textarea>)}
                        </label>
                        <div className="card-actions justify-end mt-3">
                            <button className="btn btn-sm sm:btn-md btn-primary" onClick={handelSubmit}>
                                {isPending && (
                                    <span className="loading loading-spinner"></span>
                                )}
                                {isPending ? 'Saving' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Note