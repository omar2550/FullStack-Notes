import { useState } from "react"
import Header from "../components/layout/Header"
import NoteCard from "../components/NoteCard"
import RateLimitedUI from "../components/RateLimitedUI"
import { useDeleteNote, useNotes } from "../hooks/useNotes"
import Dialog from "../components/ui/dialog"
import NotesNotFound from "../components/NotesNotFound"
import Skeletone from "../components/ui/skeletone"

const Home = () => {
    const { data, isLoading, error } = useNotes();

    const isRateLimited = error?.response?.status === 429


    const [open, setOpen] = useState(false)
    const [id, setId] = useState('')

    const { mutate } = useDeleteNote(id)

    const deleteNote = () => {
        mutate();
    };

    if (isRateLimited) {
        return (
            <>
                <Header />
                <RateLimitedUI />
            </>
        )
    }



    return (
        <>
            <Header />
            <>
                <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        [...Array(9)].map((_, i) => <Skeletone key={i} />)
                    ) : data && data.length > 0 ? (
                        data.map(n => (
                            <NoteCard
                                key={n._id}
                                id={n._id}
                                title={n.title}
                                content={n.content}
                                createdAt={n.createdAt}
                                lastUpdate={n.updatedAt}
                                getId={setId}
                                onChange={setOpen}
                            />
                        ))
                    ) : (
                        <NotesNotFound />
                    )}
                </div>
                <Dialog open={open} onChange={setOpen} onConfirm={deleteNote} />
            </>
        </>
    )
}

export default Home