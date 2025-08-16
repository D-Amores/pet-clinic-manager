import { useState } from "react";
const Form = () => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(Date.now());
  const [symptoms, setSymptoms] = useState('');

  const [alert, setAlert] = useState({});

  return (
    <>
      <p className="text-lg text-center mb-10">
        Añade tus pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
      >
        <div className="mb-5">
          <label 
            htmlFor="name"
            className="text-gray-700 uppercase font-bolds"
          >Nombre Mascota: </label>
          <input 
            id="name"
            type="text" 
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="owner"
            className="text-gray-700 uppercase font-bolds"
          >Nombre Propietario: </label>
          <input 
            id="owner"
            type="text" 
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={owner}
            onChange={e => setOwner(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="email"
            className="text-gray-700 uppercase font-bolds"
          >Email Propietario: </label>
          <input 
            id="email"
            type="email" 
            placeholder="Email del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="date"
            className="text-gray-700 uppercase font-bolds"
          >Fecha: </label>
          <input 
            id="date"
            type="date" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="symptoms"
            className="text-gray-700 uppercase font-bolds"
          >Sintomas: </label>
          <textarea
            id="symptoms"
            placeholder="Sintomas de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={symptoms}
            onChange={e => setSymptoms(e.target.value)}
          />
        </div>

        <input 
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value="Agregar Paciente"
        />
      </form>
    </>
  )
}

export default Form