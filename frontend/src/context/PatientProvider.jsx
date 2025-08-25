import { createContext, useState, useEffect } from "react";
import clientAxios from "../config/axios";

const PatientsContext = createContext()

export const PatientsProvider = ({children}) => {
    const [patients, setPatients] = useState([]);

    const savePatient = async (patient) => {
      console.log(patient)
    }

    return (
        <PatientsContext.Provider
            value={{
                patients,
                savePatient
            }}
        >
            {children}
        </PatientsContext.Provider>
    )
}


export default PatientsContext
