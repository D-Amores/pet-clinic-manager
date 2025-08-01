import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Alert from "../components/Alert";

const Register = () => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [alert, setAlert] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    const fields = [name, email, password, repeatPassword];

    const areFieldsEmpty = fields.some(field => field.trim() === '');
    if(areFieldsEmpty) {
      setAlert({msg: 'Hay campos vacios', error: true});
      return;
    }
    if(password !== repeatPassword) {
      setAlert({msg: 'Las contraseñas NO coinciden', error: true});
      return;
    }
    if(password.length < 6) {
      setAlert({msg: 'La contraseña es muy corta, agrega minimo 6 caracteres.', error: true});
      return;
    }

    setAlert({})

    try {
      const url = "http://localhost:4000/api/veterinarians";
      await axios.post(url, {name, email, password});
      setAlert({
        msg: 'Creado correctamente, revisa tu Email',
        error: false
      })
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

const { msg } = alert;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu cuenta y administra {""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          { msg && <Alert
            alert={alert}
          />}

          <form
            onSubmit={handleSubmit}
          >
            <div className="my-5">
              <label
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                Nombre
              </label>
              <input 
                type="text"
                placeholder="Ingresa tu Nombre" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="my-5">
              <label
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                Email
              </label>
              <input 
                type="email"
                placeholder="Ingresa tu Email" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="my-5">
              <label
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                Constraseña
              </label>
              <input 
                type="password"
                placeholder="Ingresa tu Constraseña" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="my-5">
              <label
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                Repite tu Contraseña
              </label>
              <input 
                type="password"
                placeholder="Ingresa de nuevo tu contraseña" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={repeatPassword}
                onChange={e => setRepeatPassword(e.target.value)}
              /> 
            </div>

            <input 
              type="submit" 
              value="Crear Cuenta"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />
          </form>

          <nav className='mt-10 lg:flex lg:justify-between'>
            <Link
              className='block text-center my-5 text-gray-500'
              to="/">¿Ya tienes una cuenta? - Inicia Sesion</Link>
            <Link
              className='block text-center my-5 text-gray-500' 
              to="/forget-password">Olvide mi contraseña</Link>
          </nav>
      </div>
    </>
  )
}

export default Register