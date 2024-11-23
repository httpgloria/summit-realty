import "./layout.scss";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/navbar";

function Layout() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="layout">
      {currentUser && <Navbar />}
      <div className={currentUser && "content"}>
        <Outlet />
      </div>
    </div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  return currentUser && <Outlet />;
}

export { Layout, RequireAuth };
