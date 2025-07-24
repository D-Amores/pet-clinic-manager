import Veterinarian from "../models/Veterinarian.js";
import generateJWT from "../helpers/generateJwt.js";

const resgister = async (req, res) => {
    const { email}  = req.body

    const userExists = await Veterinarian.findOne({email});
    if (userExists) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }

    try {
        const veterinarian = new Veterinarian(req.body);
        const veterinarianSaved = await veterinarian.save();

    } catch (error) {
        console.log(error);
    }
};

const profile = (req, res) => {
    const {veterinarian} = req;

    res.json({profile: veterinarian})
}

const confirm = async (req, res) => {
    const {token} = req.params;
    const userConfirm = await Veterinarian.findOne({token})

    if (!userConfirm) {
        const error = new Error('Token no valido');
        return res.status(404).json({msg: error.message});
    }

    try {
        userConfirm.token = null;
        userConfirm.confirmed = true;
        await userConfirm.save();

        res.json({msg: 'confirmando cuenta...'})
    } catch (error) {
        console.log(error);
    }

    console.log(userConfirm);
    res.json({msg: 'confirmando cuenta...'})
}

const authenticate = async (req, res) => {
    const {email, password} = req.body;

    const user = await Veterinarian.findOne({email});

    if (!user) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }

    if (!user.confirmed) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({msg: error.message})
    }

    if (await user.checkPassword(password)) {
        res.json({token: generateJWT(user.id)})
    } else {
        const error = new Error('El password es incorrecto');
        return res.status(404).json({msg: error.message});
    }

}



export {
    resgister,
    profile,
    confirm,
    authenticate
} 
