import { useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"

type DialogProps = {
    open: boolean
    onChange: Dispatch<SetStateAction<boolean>>
    onConfirm: () => void
}

const Dialog = ({ open, onChange, onConfirm }: DialogProps) => {
    // ESC key handler
    useEffect(() => {
        if (!open) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onChange(false)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [open, onChange])

    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-30 flex items-center justify-center bg-black/50"
            onClick={() => onChange(false)} // click outside
        >
            <div
                className="modal-box"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="font-bold text-lg">Delete note</h3>
                <p className="py-4">Are you sure you want to delete this note?</p>

                <div className="modal-action">
                    <button className="btn" onClick={() => onChange(false)}>
                        Cancel
                    </button>

                    <button
                        className="btn btn-error"
                        onClick={() => {
                            onConfirm()
                            onChange(false)
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dialog
