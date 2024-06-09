/* eslint-disable no-console */
import { useEffect, useState } from "react";
import logo from "../../assets/ecommercelogo.jpg";
import loginUser from "../../assets/login.png";
import menu from "../../assets/menu.png";
import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import supabase from "../../../supabase.js";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";

const Header = (): React.ReactElement => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 560);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = (
      event: AuthChangeEvent,
      session: Session | null,
    ) => {
      setUser((prevState) => {
        if (event && session) {
          return session.user; // Update with user object if logged in
        } else {
          return prevState; // Return previous state (null) if not logged in
        }
      });
    };
    const { data: authListener } =
      supabase.auth.onAuthStateChange(handleAuthChange);

    const currentSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user); // Update user state with user object if logged in
        console.log(user);
      }
    };

    currentSession();

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 560);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const userLogOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return (
    <>
      {!user ? (
        <header>
          <div className="top-header">lawebdepatricia@gmail.com</div>
          <div>
            {isMobile ? (
              <div className="header-mobile">
                <div className="buttons-position-mobile">
                  <button className="nav-bar-mobile">
                    <img src={menu} alt="login-icon" width={38} height={38} />
                  </button>
                  <NavLink to="/">
                    <img
                      className="logo-align-mobile"
                      src={logo}
                      alt="ecommerce-logo"
                      width={155}
                      height={50}
                    />
                  </NavLink>
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
              </div>
            ) : (
              <div className="header-web">
                <button className="nav-bar-web">
                  <img src={menu} alt="login-icon" width={38} height={38} />
                </button>
                <NavLink to="/">
                  <img
                    className="logo-align-web"
                    src={logo}
                    alt="ecommerce-logo"
                    width={240}
                    height={80}
                  />
                </NavLink>
                <NavLink to="/login" className="login-position-web">
                  <img
                    src={loginUser}
                    alt="login-icon"
                    width={48}
                    height={48}
                  />
                </NavLink>
              </div>
            )}
          </div>
        </header>
      ) : (
        <header>
          <div className="top-header">lawebdepatricia@gmail.com</div>
          <div>
            {isMobile ? (
              <div className="header-mobile">
                <div className="buttons-position-mobile">
                  <button className="nav-bar-mobile">
                    <img src={menu} alt="login-icon" width={38} height={38} />
                  </button>
                  <NavLink to="/">
                    <img
                      className="logo-align-mobile"
                      src={logo}
                      alt="ecommerce-logo"
                      width={155}
                      height={50}
                    />
                  </NavLink>
                  <button className="login-position-web" onClick={userLogOut}>
                    <img
                      src={"logout"}
                      alt="logout-icon"
                      width={48}
                      height={48}
                    />
                  </button>
                </div>
              </div>
            ) : (
              <div className="header-web">
                <button className="nav-bar-web">
                  <img src={menu} alt="login-icon" width={38} height={38} />
                </button>
                <NavLink to="/">
                  <img
                    className="logo-align-web"
                    src={logo}
                    alt="ecommerce-logo"
                    width={240}
                    height={80}
                  />
                </NavLink>
                <button className="login-position-web" onClick={userLogOut}>
                  <img
                    src={"logout"}
                    alt="logout-icon"
                    width={48}
                    height={48}
                  />
                </button>
              </div>
            )}
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
