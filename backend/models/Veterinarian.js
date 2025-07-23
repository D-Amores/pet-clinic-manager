import mongoose from "mongoose";

const veterinarianSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    phone: {
        type: String,
        default: null,
        trim: true,
    },
    web: {
        type: String,
        default: null,
    },
    token: {
        type: String
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
})

const Veterinarian = mongoose.model('Veterinarian', veterinarianSchema);
export default Veterinarian;
