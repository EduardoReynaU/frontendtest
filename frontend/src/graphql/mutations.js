import { gql } from '@apollo/client';

export const REGISTER_WITH_GITHUB = gql`
  mutation RegisterUserWithGithub($code: String!) {
    registerUserWithGithub(code: $code) {
      id
      names
      username
      email
      avatarUrl
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUserById($id: ID!, $input: UserInput!) {
    updateUserById(id: $id, input: $input) {
      id
      names
      username
      email
    }
  }
`;



export const CREAR_PROYECTO = gql`
  mutation($input: ProyectoInput!) {
    crearProyecto(input: $input) {
      id
      titulo
    }
  }
`;

export const ACTUALIZAR_PROYECTO = gql`
  mutation($id: ID, $input: ProyectoInput!) {
    actualizarProyecto(id: $id, input: $input) {
      id
      titulo
    }
  }
`;

export const ELIMINAR_PROYECTO = gql`
  mutation($id: ID!) {
    eliminarProyecto(id: $id)
  }
`;

export const CREAR_CONVOCATORIA = gql`
  mutation($input: ConvocatoriaInput!) {
    crearConvocatoria(input: $input) {
      id
      titulo
    }
  }
`;

export const ACEPTAR_CONVOCADO = gql`
  mutation($idConvocatoria: ID!, $userId: ID!, $datosCorreo: DatosCorreoConvocatoria!) {
    aceptarConvocado(idConvocatoria: $idConvocatoria, userId: $userId, datosCorreo: $datosCorreo) {
      id
      titulo
    }
  }
`;

export const RECHAZAR_CONVOCADO = gql`
  mutation($idConvocatoria: ID!, $userId: ID!) {
    rechazarConvocado(idConvocatoria: $idConvocatoria, userId: $userId) {
      id
      titulo
    }
  }
`;