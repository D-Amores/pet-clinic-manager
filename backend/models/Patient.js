import moongose from 'mongoose';

const patientSchema = moongose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    symptoms: {
        type: String,
        required: true,
    },
    veterinarian: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Veterinarian'
    }
}, {
    timestamps: true,
})

const Patient = moongose.model("Patient", patientSchema);

export default Patient;