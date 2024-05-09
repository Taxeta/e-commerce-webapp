import { useEffect, useState } from "react";
import logo from "../../assets/ecommercelogo.jpg";
import loginUser from "../../assets/login.png";
import "./header.css";

const Header = (): React.ReactElement => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 560);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 560);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header>
        <div className="top-header">lawebdepatricia@gmail.com</div>
        <div>
          {isMobile ? (
            <div className="header-mobile">
              <div className="buttons-position-mobile">
                <button>
                  <div>barra de navegación mobile</div>
                </button>
                <button>
                  <img
                    className="login-position"
                    src={loginUser}
                    alt="login-icon"
                    width={48}
                    height={48}
                  />
                </button>
              </div>
              <img
                className="logo-align-mobile"
                src={logo}
                alt="ecommerce-logo"
                width={320}
                height={200}
              />
            </div>
          ) : (
            <div className="header-web">
              <button className="nav-bar-web">
                <div>barra de navegación web</div>
              </button>
              <img src={logo} alt="ecommerce-logo" width={320} height={200} />
              <button className="login-position-web">
                <img src={loginUser} alt="login-icon" width={48} height={48} />
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
