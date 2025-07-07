import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../graphql/mutations';
import Cookies from 'js-cookie';

const FormularioConvocatoria = () => {
  const userId = Cookies.get('userId');
  const token = Cookies.get('token');

  const [form, setForm] = useState({
    rol: '',
    habilidades: '',
    experiencia: '',
    modalidad: '',
    disponibilidad: ''
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      }
    }
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const topLanguage = `
      Rol deseado: ${form.rol}
      Habilidades técnicas: ${form.habilidades}
      Experiencia laboral: ${form.experiencia}
      Modalidad preferida: ${form.modalidad}
      Disponibilidad horaria: ${form.disponibilidad}
    `;

    try {
      await updateUser({
        variables: {
          id: userId,
          input: { topLanguage }
        }
      });
      alert("Datos actualizados con éxito.");
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  return (
    <div>
      <h2>Formulario de Convocatoria</h2>
      <input name="rol" placeholder="Rol deseado" onChange={handleChange} />
      <textarea name="habilidades" placeholder="Lenguajes, frameworks, herramientas" onChange={handleChange} />
      <textarea name="experiencia" placeholder="Experiencia laboral (años, proyectos)" onChange={handleChange} />
      <select name="modalidad" onChange={handleChange}>
        <option value="">Seleccione una modalidad</option>
        <option value="Remoto">Remoto</option>
        <option value="Presencial">Presencial</option>
        <option value="Híbrido">Híbrido</option>
      </select>
      <input name="disponibilidad" placeholder="Disponibilidad horaria" onChange={handleChange} />
      <button onClick={handleSubmit}>Actualizar Perfil</button>
    </div>
  );
};

export default FormularioConvocatoria;
