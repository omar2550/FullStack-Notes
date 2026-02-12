import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
},
    { timestamps: true }
)

const Note = mongoose.model("Note", noteSchema);

export default Note;