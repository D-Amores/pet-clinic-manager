import Veterinarian from "../models/Veterinarian.js";
import generateJWT from "../helpers/generateJwt.js";
import generateId from "../helpers/generateId.js";

const register = async (req, res) => {
    const { email}  = req.body

    const userExists = await Veterinarian.findOne({email});
    if (userExists) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }

    try {
    const veterinarian = new Veterinarian(req.body);
    const veterinarianSaved = await veterinarian.save();

    res.status(201).json({
        msg: 'Creado correctamente, revisa tu Email',
        veterinarian: veterinarianSaved
    });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor' });
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

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const existVeterinarian = await Veterinarian.findOne({email});

    if (!existVeterinarian) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({msg: error.message})
    }

    try {
        existVeterinarian.token = generateId();
        await existVeterinarian.save();
        res.json({msg: 'Hemos enviando un email con las instrucciones'})
    } catch (error) {
        console.log(error);
    }
};

const checkToken = async (req, res) => {
    const { token } = req.params;

    const validToken = await Veterinarian.findOne({ token })

    if(validToken) {
        res.json({ msg: 'token valido y el correo existe'});
    } else {
        const error = new Error('Token no valido - checktoken');
        return res.status(400).json({msg: error.message});
    }
};

const newPassword = async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;

    const veterinarian = await Veterinarian.findOne({token});
    if(!veterinarian){
        const error = new Error('Hubo un Error');
        return res.status(400).json({msg: error.message});
    }

    try {
        veterinarian.token = null;
        veterinarian.password = password;
        await veterinarian.save();
        res.json({ msg: 'Password modificado correctamente...'});
    } catch (error) {
        console.log(error);
    }
};



export {
    register,
    profile,
    confirm,
    authenticate,
    forgotPassword,
    checkToken,
    newPassword
} 
