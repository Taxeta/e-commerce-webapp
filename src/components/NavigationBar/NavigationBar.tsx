import { useSelector } from "react-redux";
import { RootState } from "../../store";

const NavigationBar = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <>
      {!user ? (
        <div>
          <ul>
            <li>Servicios</li>
          </ul>
        </div>
      ) : (
        <div>
          <ul>
            <li>Perfil</li>
            <li>Servicios</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavigationBar;
