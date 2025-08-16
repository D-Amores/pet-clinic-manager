import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
    const { auth, loading } = useAuth();
    console.log(auth);
    console.log(loading);

    if(loading) return 'cargando...'
  return (
    <>
        <Header/>
        {auth?._id ? <Outlet/> : <Navigate to='/' />}
        <Footer/>
    </>
  )
}

export default ProtectedRoute;