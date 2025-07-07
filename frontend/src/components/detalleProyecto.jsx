import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROYECTO_BY_ID } from '../graphql/queries';

const DetalleProyecto = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PROYECTO_BY_ID, {
    variables: { id }
  });

  if (loading) return <p>Cargando detalles del proyecto...</p>;
  if (error) return <p>Error al cargar el proyecto: {error.message}</p>;

  const proyecto = data.proyecto;

  return (
    <div>
      <h2>{proyecto.titulo}</h2>
      <p><strong>Organizador:</strong> {proyecto.organizador}</p>
      <p><strong>Descripción:</strong> {proyecto.descripcion}</p>
      <p><strong>Duración:</strong> {proyecto.duracion}</p>
      <p><strong>Modalidad:</strong> {proyecto.modalidad}</p>
      <p><strong>Habilidades:</strong> {proyecto.habilidades?.join(', ')}</p>
      <p><strong>Beneficios:</strong> {proyecto.beneficios?.join(', ')}</p>
      <p><strong>Fecha:</strong> {proyecto.fecha}</p>
    </div>
  );
};

export default DetalleProyecto;
