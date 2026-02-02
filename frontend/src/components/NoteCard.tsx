import { Edit2, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { type Dispatch, type SetStateAction } from "react";

type NoteCardType = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    lastUpdate: string;
    getId: Dispatch<SetStateAction<string>>
    onChange: Dispatch<SetStateAction<boolean>>

}

const NoteCard = ({ id, title, content, createdAt, lastUpdate, getId, onChange }: NoteCardType) => {

    const navigate = useNavigate()

    return (

        <div className="card bg-base-100 duration-300 transition-all hover:scale-105 hover:translate-y-1 border-t-4 border-primary">
            <div className="card-body">
                <h2 className="card-title text-primary">{title}</h2>
                <p className="line-clamp-2">{content}</p>
                <div className="card-actions items-center justify-between mt-3">
                    <div className="text-xs space-y-1 flex-1">
                        <p>Created at: {new Date(createdAt).toLocaleDateString('en', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
                        <p>Last Update: {new Date(lastUpdate).toLocaleDateString('en', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
                    </div>
                    <div className="space-x-1 flex items-center justify-end">
                        <button className="btn btn-sm"><Edit2 size={14} onClick={() => {
                            navigate(id)
                        }} /></button>
                        <button className="btn btn-sm text-error" onClick={() => {
                            getId(id)
                            onChange(true)
                        }}><Trash2 size={14} /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteCard