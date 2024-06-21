/* eslint-disable no-console */
import { useEffect, useState } from "react";
import logo from "../../assets/ecommercelogo.jpg";
import loginUser from "../../assets/login.png";
import logout from "../../assets/logout.png";
import menu from "../../assets/menu.png";
import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import supabase from "../../../supabase.js";
import { Session } from "@supabase/supabase-js";
import { RootState } from "../../store/index.js";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUserActioncreator,
  setUserActionCreator,
} from "../../store/user/user.js";
import NavigationBar from "../NavigationBar/NavigationBar.js";

const Header = (): React.ReactElement => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 560);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = (_session: Session | null) => {
      if (_session?.user) {
        dispatch(setUserActionCreator(_session.user));
      } else {
        dispatch(clearUserActioncreator());
      }
    };
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        handleAuthChange(session);
      },
    );

    const currentSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        dispatch(setUserActionCreator(user));
      } else {
        dispatch(clearUserActioncreator());
      }
    };

    currentSession();

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, [dispatch]);

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
    dispatch(clearUserActioncreator());
    navigate("/");
  };

  const renderNavBar = () => {
    <NavigationBar />;
  };

  return (
    <>
      {!user ? (
        <header>
          <div className="top-header">
            <div className="top-header__animation">
              <span className="top-header__text">
                aliciaguerrero.hairbeauty@gmail.com
              </span>
              <span className="top-header__text">
                Lun-Vie: 9:00 - 17:00 | Sab: 9:00 - 14:00
              </span>
            </div>
          </div>
          <div>
            {isMobile ? (
              <div className="header-mobile">
                <div className="buttons-position-mobile">
                  <button className="nav-bar-mobile" onClick={renderNavBar}>
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
          <div className="top-header">
            <div className="top-header__animation">
              <span className="top-header__text">
                aliciaguerrero.hairbeauty@gmail.com
              </span>
              <span className="top-header__text">
                Lun-Vie: 9:00 - 17:00 | Sab: 9:00 - 14:00
              </span>
            </div>
          </div>
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
                      src={logout}
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
                  <img src={logout} alt="logout-icon" width={48} height={48} />
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
