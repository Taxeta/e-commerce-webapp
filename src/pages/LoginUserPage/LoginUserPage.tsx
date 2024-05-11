import { useState } from "react";
import "./LoginUserPage.css";
import { NavLink } from "react-router-dom";

const LoginUserPage = (): React.ReactElement => {
  const [showPassword, setShowPassword] = useState(false);

  const showThePassword = async () => {
    await setShowPassword(!showPassword);
  };

  return (
    <section className="login-page">
      <h1>Iniciar sesión con su cuenta</h1>
      <h2>Ya soy cliente</h2>
      <p>Si ya tienes cuenta, inicia sesión con tu correo electrónico</p>
      <div className="login-email">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="input-login"
          autoComplete="off"
          required
        />
      </div>
      <div className="login-password">
        <label className="password" htmlFor="password">
          Password
        </label>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="input-login"
            required
          />
          <button
            onClick={showThePassword}
            type="button"
            className="showpass-button"
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>
      </div>
      <span>
        ¿Olvidó su contraseña? Haz click
        <a href="/recuperar-contraseña"> aquí</a>
      </span>
      <div>
        <h2>Nuevo cliente</h2>
        <p>Si no tiene cuenta clique en este botón para crear una.</p>
        <NavLink to="/registro">
          <button className="newuser-button">CREAR CUENTA</button>
        </NavLink>
      </div>
    </section>
  );
};

export default LoginUserPage;
