import { Route, Routes } from "react-router-dom";
import { SignIn } from "../screens/SignIn/SignIn";
import { Register } from "../screens/Register/Register";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<SignIn />} />
    </Routes>
  );
}

export default AuthRoutes;
