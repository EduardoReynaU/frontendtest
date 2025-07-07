import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CONVOCATORIAS } from '../graphql/queries';
import { CREAR_CONVOCATORIA } from '../graphql/mutations';

const Convocatorias = () => {
  const { data, loading, error, refetch } = useQuery(GET_CONVOCATORIAS);
  const [crearConvocatoria] = useMutation(CREAR_CONVOCATORIA);

  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    fechaLimite: '',
    idProyecto: '',
    idUsuario: '',
    convocados: [],
    equipo: []
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCrear = async () => {
    await crearConvocatoria({ variables: { input: form } });
    refetch();
  };

  if (loading) return <p>Cargando convocatorias...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Convocatorias</h2>
      <ul>
        {data.convocatorias.map((c) => (
          <li key={c.id}>
            {c.titulo} - {c.descripcion}
          </li>
        ))}
      </ul>

      <h3>Nueva Convocatoria</h3>
      <input name="titulo" placeholder="Título" onChange={handleChange} />
      <input name="descripcion" placeholder="Descripción" onChange={handleChange} />
      <input name="fechaLimite" placeholder="Fecha límite" onChange={handleChange} />
      <input name="idProyecto" placeholder="ID Proyecto" onChange={handleChange} />
      <input name="idUsuario" placeholder="ID Usuario" onChange={handleChange} />
      <button onClick={handleCrear}>Crear Convocatoria</button>
    </div>
  );
};

export default Convocatorias;
