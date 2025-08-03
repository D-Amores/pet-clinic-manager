import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clientAxios from '../config/axios';
import Alert from '../components/Alert';

const ConfirmAccount = () => {
  const [accountConfirmed, setAccountConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/veterinarians/confirm/${id}`
        const { data } = await clientAxios(url)
        setAccountConfirmed(true);
        setAlert({
          msg: data.msg,
          error: false
        })
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        });
      }

      setLoading(false);
    }
    confirmAccount();
  }, [id])

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu Cuenta y Empieza {""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {!loading && <Alert 
          alert={alert}
        />}

        {accountConfirmed && (
          <Link
              className='block text-center my-5 text-gray-500'
              to="/">Iniciar Sesion</Link>
        )}
      </div>
    </>
  )
}

export default ConfirmAccount