import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_WITH_GITHUB } from '../graphql/mutations';
import Cookies from 'js-cookie';
import React from 'react';

const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;

const LoginGithub = () => {
  const [registerUserWithGithub, { loading, error }] = useMutation(REGISTER_WITH_GITHUB);

  const code = new URLSearchParams(window.location.search).get('code');

  useEffect(() => {
    const loginWithCode = async () => {
      if (!code) {
        console.log('[LoginGithub] No hay código en la URL.');
        return;
      }

      console.log('[LoginGithub] Código recibido:', code);

      try {
        const res = await registerUserWithGithub({ variables: { code } });

        console.log('[LoginGithub] Resultado de la mutación:', res);

        const user = res.data?.registerUserWithGithub;
        if (!user) {
          console.error('[LoginGithub] No se recibió usuario en la respuesta.');
          return;
        }
        console.log('[LoginGithub] Usuario registrado:', user);
        Cookies.set('token', user.token);
        Cookies.set('userId', user.id);

        console.log('[LoginGithub] Token y userId guardados. Redirigiendo...');
        window.location.href = '/perfil';
      } catch (err) {
        console.error('[LoginGithub] Error en la mutación:', err);
      }
    };

    loginWithCode();
  }, [code, registerUserWithGithub]);

  const redirectToGithub = () => {
    const scope = 'read:user user:email';
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = githubAuthUrl;
  };

  return (
    <div>
      <h2>Inicio de Sesión con GitHub</h2>
      <button onClick={redirectToGithub} disabled={loading}>
        Iniciar sesión con GitHub
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
};

export default LoginGithub;
