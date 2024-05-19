import { useEffect } from "react";
import "./HomePage.css";

const HomePage = (): React.ReactElement => {
  useEffect(() => {
    document.title = "AGPeluquería | Inicio";
  }, []);

  return (
    <section className="homepage-styles">
      <h1 className="introduction-title">Esto va a ser el inicio de la App</h1>
      <h2 className="introduction-subtitle">
        renderizaremos una página inicial de muestra
      </h2>
    </section>
  );
};

export default HomePage;
