import mongoose from 'mongoose'

const noteShema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
},
    { timestamps: true }
)

const Note = mongoose.model("Note", noteShema);

export default Note;