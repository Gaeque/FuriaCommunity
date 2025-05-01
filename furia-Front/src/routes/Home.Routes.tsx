import { Route, Routes } from "react-router-dom";
import { Home } from "../screens/Home/Home";
import { Profile } from "../screens/Profile/Profile";
import Chat from "../components/Chat/Chat";

function HomeRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<><Chat /><Home /></>} />
      <Route path="/profile" element={<><Chat /><Profile /></>} />
      <Route path="/" element={<><Chat /><Home /></>} />
    </Routes>
  );
}

export default HomeRoutes;
