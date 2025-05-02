import { AuthContextProvider } from "./contexts/AuthContext";
import IndexRoutes from "./routes/Index.Routes";

function App() {
  return (


    <AuthContextProvider >
      <IndexRoutes />
    </AuthContextProvider>
  );
}

export default App;
