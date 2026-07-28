import {useAuth} from "./hooks/useAuth";
import LoginScreen from "./pages/LoginScreen";
import TrackerDashboard from "./pages/TrackerDashboard";

function App() {
  const { user, loading } = useAuth();

  if (loading){
      return <p>Loading... </p>;
    }
    return user ? <TrackerDashboard /> : <LoginScreen />;
}

export default App;

