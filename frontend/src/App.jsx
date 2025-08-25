import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import ProtectedRoute from './layout/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgotPassword';
import ConfirmAccount from './pages/ConfirmAccount';
import NewPassword from './pages/NewPassword';
import ManagePatient from './pages/ManagePatient';

import { AuthProvider } from './context/AuthProvider';
import { PatientsProvider } from './context/PatientProvider';

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
      <PatientsProvider>
        <Routes>
          <Route path='/' element={<AuthLayout/>}>
            <Route index element={<Login />}/>

            <Route path='register' element={<Register/>} />
            <Route path='forget-password' element={<ForgetPassword/>} />
            <Route path='forget-password/:token' element={<NewPassword/>} />
            <Route path='confirm/:id' element={<ConfirmAccount/>} />
          </Route>

          <Route path='/admin' element={<ProtectedRoute/>}>
            <Route index element={<ManagePatient/>} />
          </Route>

        </Routes>
      </PatientsProvider>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
