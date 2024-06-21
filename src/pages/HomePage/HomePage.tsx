import { useEffect } from "react";
import "./HomePage.css";

const HomePage = (): React.ReactElement => {
  useEffect(() => {
    document.title = "AGPeluquería | Inicio";
  }, []);

  return (
    <section className="homepage-styles">
      <h1 className="introduction-title">
        Aquí podría ir un slider to wapo de fondo con un texto de inicio
        presentación.
      </h1>
      <h2 className="introduction-subtitle">
        Aquí se podrían crear secciones dentro de la página en plan presentación
        superchuli.
      </h2>
    </section>
  );
};

export default HomePage;
