import {Outlet} from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
        <h1>Desde Auth LAyout</h1>

        <Outlet />
    </>
  )
}

export default AuthLayout