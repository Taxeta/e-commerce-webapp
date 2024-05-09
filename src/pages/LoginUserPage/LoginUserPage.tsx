const LoginUserPage = (): React.ReactElement => {
  return (
    <section>
      <h1>
        Bienvenido a la página de usuario. Introduce tus datos para acceder a tu
        cuenta:
      </h1>
      <div className="login-email">
        <label htmlFor="email">Email:</label>
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
          Password:
        </label>
        <input type="text" id="password" className="input-login" required />
      </div>
    </section>
  );
};

export default LoginUserPage;
