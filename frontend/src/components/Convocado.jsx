import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CONVOCATORIAS_POR_CONVOCADO } from '../graphql/queries';
import { ACEPTAR_CONVOCADO, RECHAZAR_CONVOCADO } from '../graphql/mutations';

const Convocado = () => {
  const [correo, setCorreo] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const { data, refetch } = useQuery(GET_CONVOCATORIAS_POR_CONVOCADO, {
    variables: { correo },
    skip: !correo
  });

  const [aceptar] = useMutation(ACEPTAR_CONVOCADO);
  const [rechazar] = useMutation(RECHAZAR_CONVOCADO);

  const handleBuscar = () => setCorreo(emailInput);

  const handleAceptar = async (idConvocatoria) => {
    const dummyDatos = {
      emailConvocado: correo,
      emailCreador: 'creador@mail.com',
      nombreConvocado: 'Juan',
      nombreCreador: 'Carlos',
      nombreProyecto: 'Proyecto Alpha'
    };
    await aceptar({ variables: { idConvocatoria, userId: '123', datosCorreo: dummyDatos } });
    refetch();
  };

  const handleRechazar = async (idConvocatoria) => {
    await rechazar({ variables: { idConvocatoria, userId: '123' } });
    refetch();
  };

  return (
    <div>
      <h2>Convocatorias por Correo</h2>
      <input
        placeholder="Correo del convocado"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
      />
      <button onClick={handleBuscar}>Buscar</button>

      {data?.convocatoriasPorConvocado?.map((c) => (
        <div key={c.id}>
          <p><strong>{c.titulo}</strong></p>
          <button onClick={() => handleAceptar(c.id)}>Aceptar</button>
          <button onClick={() => handleRechazar(c.id)}>Rechazar</button>
        </div>
      ))}
    </div>
  );
};

export default Convocado;
