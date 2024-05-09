import { useEffect, useState } from "react";
import logo from "../../assets/ecommercelogo.jpg";
import loginUser from "../../assets/login.png";
import menu from "../../assets/menu.png";
import "./header.css";
import { NavLink } from "react-router-dom";

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
                  <img src={menu} alt="login-icon" width={38} height={38} />
                </button>
                <NavLink to="/login">
                  <img
                    className="login-position"
                    src={loginUser}
                    alt="login-icon"
                    width={48}
                    height={48}
                  />
                </NavLink>
              </div>
              <img
                className="logo-align-mobile"
                src={logo}
                alt="ecommerce-logo"
                width={320}
                height={100}
              />
            </div>
          ) : (
            <div className="header-web">
              <button className="nav-bar-web">
                <img src={menu} alt="login-icon" width={38} height={38} />
              </button>
              <img
                className="logo-align-web"
                src={logo}
                alt="ecommerce-logo"
                width={320}
                height={100}
              />
              <NavLink to="/login" className="login-position-web">
                <img src={loginUser} alt="login-icon" width={48} height={48} />
              </NavLink>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
