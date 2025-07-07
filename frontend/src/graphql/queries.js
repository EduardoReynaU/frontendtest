import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      names
      lastName
      username
      email
      avatarUrl
      provider
    }
  }
`;
export const GET_PROYECTOS = gql`
  query {
    proyectos {
      id
      titulo
      descripcion
      organizador
      duracion
      fecha
    }
  }
`;

export const GET_PROYECTO_BY_ID = gql`
  query($id: ID!) {
    proyecto(id: $id) {
      id
      titulo
      descripcion
    }
  }
`;

export const GET_CONVOCATORIAS = gql`
  query {
    convocatorias {
      id
      titulo
      descripcion
    }
  }
`;

export const GET_CONVOCATORIAS_POR_CONVOCADO = gql`
  query($correo: String!) {
    convocatoriasPorConvocado(correo: $correo) {
      id
      titulo
      descripcion
    }
  }
`;