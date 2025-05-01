import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AuthRoutes from "./Auth.Routes";
import HomeRoutes from "./Home.Routes";
import { useAuth } from "../hooks/UseAuth";

function IndexRoutes() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {user?.auth ? (
          <Route path="/*" element={<HomeRoutes />} />
        ) : (
          <Route path="/*" element={<AuthRoutes />} />
        )}
      </Routes>
    </Router>
  );
}

export default IndexRoutes;
