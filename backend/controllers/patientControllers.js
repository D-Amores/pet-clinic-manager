import Patient from "../models/Patient.js";

const addPatients = async (req, res) => {
    const patient = new Patient(req.body);
    patient.veterinarian = req.veterinarian._id;
    
    try {
        const patientSaved = await patient.save();
        res.json(patientSaved);
    } catch (error) {
        console.log(error);
    }
};

const getPatients = async (req, res) => {
    const patients = await Patient.find().where('veterinarian').equals(req.veterinarian);

    res.json(patients);
};

const getPatient = async (req, res) => {
    const { id } = req.params;
    const patient = await Patient.findById(id);

    if(!patient) {
        return res.status(404).json({msg: 'No Encontrado...'})
    }

    if(patient.veterinarian._id.toString() !== req.veterinarian._id.toString()) {
        return res.json({msg: "Accion no valida..."})
    }

    res.json(patient)
};

const updatePatient = async (req, res) => {
    const { id } = req.params;
    const patient = await Patient.findById(id);

    if (!patient) {
        return res.status(404).json({msg: 'No Encontrado...'})
    }

    if(patient.veterinarian._id.toString() !== req.veterinarian._id.toString()) {
        return res.json({msg: "Accion no valida..."})
    }

    // update patient
    patient.name = req.body.name || patient.name;
    patient.owner = req.body.owner || patient.owner;
    patient.email = req.body.email || patient.email;
    patient.date = req.body.date || patient.date;
    patient.symptoms = req.body.symptoms || patient.symptoms;

    try {
        const updatedPatient = await patient.save();
        res.json(updatedPatient);
    } catch (error) {
        console.log(error);
    }
} 

const deletePatient = async (req, res) => {
    const { id } = req.params;
    const patient = await Patient.findById(id);

    if (!patient) {
        return res.status(404).json({msg: 'No Encontrado...'})
    }

    if(patient.veterinarian._id.toString() !== req.veterinarian._id.toString()) {
        return res.json({msg: "Accion no valida..."})
    }

    try {
        await patient.deleteOne();
        res.json({msg: 'paciente eliminado...'})
    } catch (error) {
        console.log(error);
    }
};



export {
    addPatients, 
    getPatients,
    getPatient,
    updatePatient,
    deletePatient
};
