import { useState } from "react";
import "./LoginUserPage.css";
import { useNavigate } from "react-router-dom";
import supabase from "../../../../supabase.js";

const LoginUserPage = (): React.ReactElement => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const showThePassword = async () => {
    await setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setErrorMessage(error.message);
      } else {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage("Error desconocido al iniciar sesión");
    }
  };

  const handleSignIn = async () => {
    navigate("/registro");
  };

  return (
    <section className="login-page">
      <h1>Iniciar sesión con su cuenta</h1>
      <h2>Ya soy cliente</h2>
      <div className="login-container">
        <p>Si ya tienes cuenta, inicia sesión con tu correo electrónico</p>
        <div className="login-email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="input-login"
            autoComplete="off"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="user-btn" onClick={handleLogin}>
          INICIAR SESIÓN
        </button>
      </div>
      <div className="signin-container">
        <h2>Nuevo cliente</h2>
        <p>Si no tiene cuenta clique en este botón para crear una.</p>
        <button className="user-btn" onClick={handleSignIn}>
          CREAR CUENTA
        </button>
      </div>
    </section>
  );
};

export default LoginUserPage;
