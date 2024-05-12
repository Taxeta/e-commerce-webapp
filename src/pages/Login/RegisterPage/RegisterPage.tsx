/* eslint-disable no-console */
import { useState } from "react";
import supabase from "../../../../supabase.js"; // Asegúrate de importar correctamente
import { AuthResponseStructure, UserStructure } from "../../../types.js";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [user, setUser] = useState<UserStructure>({
    email: "",
    password: "",
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

    return data.length > 0; // Si data.length > 0, el correo electrónico existe
  }

  const handleSignUp = async () => {
    try {
      const { email, password } = user;
      if (!(await validarEmail(email))) {
        setErrorMessage(
          "Correo electrónico inválido. Porfavor ingresa una corre electrónico válido",
        );
      }
      const { data, error }: AuthResponseStructure = await supabase.auth.signUp(
        {
          email,
          password,
        },
      );

      if (data) {
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
    <div>
      <input
        type="email"
        placeholder="Correo electrónico"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      {errorMessage && <span className="error-message">{errorMessage}</span>}
      <button onClick={handleSignUp}>Registrarse</button>
    </div>
  );
}

export default SignUpPage;
