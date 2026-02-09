import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCreateNote } from "../hooks/useNotes"
import { useState } from "react"
import toast from "react-hot-toast"
import RateLimitedUI from "../components/RateLimitedUI"

const CreateNote = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({ title: '', content: '' })
    const { mutate, isPending, error } = useCreateNote()

    if (error?.response?.status === 429)
        return <RateLimitedUI />

    const handelCreate = () => {
        if (!form.title.trim()) {
            toast.error('Title is required');
            return;
        }

        if (!form.content.trim()) {
            toast.error('Content is required');
            return;
        }

        mutate(form)
    }

    return (
        <div className="bg-base-200 min-h-screen bg-opacity-50 backdrop-filter backdrop-blur-xl backdrop-blu">
            <div className="mx-auto sm:w-[75%]">
                <div className="py-4">
                    <button className="btn btn-ghost" onClick={() => navigate('/home')}>
                        <ArrowLeft />
                        Back to Notes
                    </button>
                </div>
                <div className="card bg-base-100">
                    <div className="card-body space-y-4">
                        <h2 className="card-title text-white">Create New Note</h2>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Title</span>
                            </div>
                            <input type="text" value={form?.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="The Title..." className="input input-bordered w-full" />
                        </label>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Content</span>
                            </div>
                            <textarea rows={6} value={form?.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="textarea textarea-bordered resize-none" placeholder="The Content Is..."></textarea>
                        </label>
                        <div className="card-actions justify-end mt-3">
                            <button className={`btn btn-sm sm:btn-md btn-primary ${isPending && 'btn-disabled'}`} onClick={handelCreate}>
                                {isPending && (
                                    <span className="loading loading-spinner"></span>
                                )}
                                {isPending ? 'Creating' : 'Create Note'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CreateNote