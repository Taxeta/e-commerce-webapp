/* eslint-disable no-console */
import { useState } from "react";
import supabase from "../../../../supabase.js";
import { AuthResponseStructure, UserStructure } from "../../../types.js";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

function SignUpPage() {
  const [user, setUser] = useState<UserStructure>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function validarEmail(email: string): Promise<boolean> {
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("email", email);
    if (error) {
      console.error("Error al verificar correo electrónico:", error.message);
      return false;
    }

    return data.length > 0;
  }

  const handleSignUp = async () => {
    try {
      const { email, password, confirmPassword } = user;
      if (password !== confirmPassword) {
        return setErrorMessage(
          "Las contraseñas no coinciden. Por favor, asegúrate de que las contraseñas sean iguales",
        );
      }
      if (await validarEmail(email)) {
        return setErrorMessage(
          "Este correo electrónico ya está en uso. Por favor, ingresa un correo electrónico diferente",
        );
      }
      const { data, error }: AuthResponseStructure = await supabase.auth.signUp(
        {
          email,
          password,
        },
      );

      if (data && data.user) {
        navigate("/");
        console.log("Usuario correctamente registrado", data);
      } else {
        setErrorMessage(error!.message);
      }
    } catch {
      setErrorMessage("Error al registrar usuario, revise su conexión:");
    }
  };

  return (
    <div className="register_page">
      <h2 className="register-title">Introduzca sus datos para registrarse</h2>
      <input
        className="input-register"
        type="email"
        placeholder="Correo electrónico"
        required
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        className="input-register"
        type="password"
        placeholder="Contraseña"
        required
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <input
        className="input-register"
        type="password"
        placeholder="Confirmar contraseña"
        required
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
      />
      {errorMessage && <span className="error-message">{errorMessage}</span>}
      <button className="register_button" onClick={handleSignUp}>
        Registrarse
      </button>
    </div>
  );
}

export default SignUpPage;
