import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import Header from "../Header/Header";
import "./App.css";
import { Suspense } from "react";
import LoginUserPage from "../../pages/Login/LoginUserPage/LoginUserPage";
import SignUpPage from "../../pages/Login/RegisterPage/RegisterPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ServicesPage from "../../pages/ServicesPage/ServicesPage";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route
            path={"/"}
            element={
              <Suspense>
                <HomePage />
              </Suspense>
            }
          ></Route>
          <Route
            path={"/login"}
            element={
              <Suspense>
                <LoginUserPage />
              </Suspense>
            }
          ></Route>
          <Route
            path={"/registro"}
            element={
              <Suspense>
                <SignUpPage />
              </Suspense>
            }
          ></Route>
          <Route
            path={"/perfil-de-usuario"}
            element={
              <ProtectedRoute>
                <Suspense>
                  <ProfilePage />
                </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/servicios"}
            element={
              <Suspense>
                <ServicesPage />
              </Suspense>
            }
          ></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
