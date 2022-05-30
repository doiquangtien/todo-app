import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import List from "../container/List";
import Layout from "../container/Layout";
import Todos from "../container/Todos";
import Login from "../component/Auth/Login";
import Register from "../component/Auth/Register.jsx";
import { useSelector } from "react-redux";
// import Test from "./Test";
function Router() {
  const { currentUser } = useSelector((state) => state.currentUser);

  const RequireAuth = ({ children }) =>
    currentUser ? children : <Navigate to="/login" />;

  const RequireLogin = ({ children }) =>
    currentUser ? <Navigate to="/" /> : children;
  return (
    <Layout>
      <Routes>
        {/* <Route path="/test" element={<Test />} /> */}
        <Route
          path="/login"
          element={
            <RequireLogin>
              <Login />
            </RequireLogin>
          }
        />
        <Route
          path="/register"
          element={
            <RequireLogin>
              <Register />
            </RequireLogin>
          }
        />
        <Route path="/">
          <Route
            index
            element={
              <RequireAuth>
                <List />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/list/:id">
          <Route
            index
            element={
              <RequireAuth>
                <Todos />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </Layout>
  );
}

export default Router;
