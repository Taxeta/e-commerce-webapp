import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import Header from "../Header/Header";
import "./App.css";
import { Suspense } from "react";
import LoginUserPage from "../../pages/LoginUserPage/LoginUserPage";

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
        </Routes>
      </main>
    </>
  );
}

export default App;
