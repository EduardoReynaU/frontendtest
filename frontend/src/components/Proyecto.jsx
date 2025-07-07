import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROYECTOS } from '../graphql/queries';
import { CREAR_PROYECTO, ELIMINAR_PROYECTO } from '../graphql/mutations';

const Proyectos = () => {
  const { data, loading, error, refetch } = useQuery(GET_PROYECTOS);
  const [crearProyecto] = useMutation(CREAR_PROYECTO);
  const [eliminarProyecto] = useMutation(ELIMINAR_PROYECTO);

  const [nuevo, setNuevo] = useState({
    titulo: '',
    descripcion: '',
    organizador: '',
    duracion: '',
    fecha: '',
    usuarioId: ''
  });

  const handleChange = (e) => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const handleCrear = async () => {
    await crearProyecto({ variables: { input: nuevo } });
    refetch();
  };

  const handleEliminar = async (id) => {
    await eliminarProyecto({ variables: { id } });
    refetch();
  };

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Proyectos</h2>
      <ul>
        {data.proyectos.map((p) => (
          <li key={p.id}>
            <strong>{p.titulo}</strong> - {p.organizador} ({p.fecha})
            <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h3>Nuevo Proyecto</h3>
      <input name="titulo" placeholder="Título" onChange={handleChange} />
      <input name="descripcion" placeholder="Descripción" onChange={handleChange} />
      <input name="organizador" placeholder="Organizador" onChange={handleChange} />
      <input name="duracion" placeholder="Duración" onChange={handleChange} />
      <input name="fecha" placeholder="Fecha" onChange={handleChange} />
      <input name="usuarioId" placeholder="ID Usuario" onChange={handleChange} />
      <button onClick={handleCrear}>Crear Proyecto</button>
    </div>
  );
};

export default Proyectos;
