import { Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginGithub from './components/LoginGithub';
import Profile from './components/Profile';
import Logout from './components/Logout';
import Proyectos from './components/Proyecto';
import Convocatorias from './components/Convocatorias';
import Convocado from './components/Convocado';
import DetalleProyecto from './components/detalleProyecto';
import Cookies from 'js-cookie';
import React from 'react';

const App = () => {
  const token = Cookies.get('token');

  return (
    <>
      <nav style={{ marginBottom: 20 }}>
        {token ? (
          <>
            <Link to="/perfil">Perfil</Link> |{" "}
            <Link to="/proyectos">Proyectos</Link> |{" "}
            <Link to="/convocatorias">Convocatorias</Link> |{" "}
            <Link to="/convocado">Convocado</Link> |{" "}
            <Logout />
          </>
        ) : (
          <Link to="/login">Login con GitHub</Link>
        )}
      </nav>

      <Routes>
        {/* Ruta de login */}
        <Route path="/login" element={<LoginGithub />} />

        {/* Perfil (protegido) */}
        <Route
          path="/perfil"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />

        {/* Proyectos (protegido) */}
        <Route
          path="/proyectos"
          element={token ? <Proyectos /> : <Navigate to="/login" />}
        />
        <Route path="/proyecto/:id" element={<DetalleProyecto />} />

        {/* Convocatorias (protegido) */}
        <Route
          path="/convocatorias"
          element={token ? <Convocatorias /> : <Navigate to="/login" />}
        />
        <Route
        path="/convocatoria"
        element={token ? <FormularioConvocatoria /> : <Navigate to="/login" />}
      />

      {/* Nueva ruta: Chat */}
      <Route
        path="/chatter"
        element={token ? <Chatter /> : <Navigate to="/login" />}
      />

        {/* Convocado (protegido) */}
        <Route
          path="/convocado"
          element={token ? <Convocado /> : <Navigate to="/login" />}
        />

        {/* Redirección por defecto */}
        <Route
          path="*"
          element={<Navigate to={token ? "/perfil" : "/login"} />}
        />
      </Routes>
    </>
  );
};

export default App;
