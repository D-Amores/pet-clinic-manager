import { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import useAuth from '../hooks/useAuth';
import clientAxios from '../config/axios';
 
 const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([email, password].includes('')) {
      setAlert({
        msg: 'Todos los campos son obligatorio',
        error: true
      });
      return;
    }

    try {
      const {data} = await clientAxios.post('/veterinarians/login', {email, password});
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/admin')
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error:true
      })
    }

  }

  const { msg } = alert;
  return (
    <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">
            Inicia Sesion y Administra tus {""}
            <span className="text-black">Pacientes</span>
          </h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          {msg && <Alert
            alert={alert}
          />}

          <form onSubmit={handleSubmit}>
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
                Contraseña
              </label>
              <input 
                type="password"
                placeholder="Ingresa tu contraseña" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <input 
              type="submit" 
              value="Iniciar Sesion"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />
          </form>

          <nav className='mt-10 lg:flex lg:justify-between'>
            <Link
              className='block text-center my-5 text-gray-500'
              to="/register">¿No tienes cuenta? - registrate</Link>
            <Link
              className='block text-center my-5 text-gray-500' 
              to="/forget-password">Olvide mi contraseña</Link>
          </nav>
        </div>
    </>
  )
}

export default Login