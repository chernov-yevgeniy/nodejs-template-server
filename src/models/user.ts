import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true, 
            minlength: 4, 
            maxLength: 32
        },
        email: {
            type: String,
            required: true,
            minlength: 4,
            maxLength: 64,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 4,
            maxLength: 1024
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model('User', userSchema)