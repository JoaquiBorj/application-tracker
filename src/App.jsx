import {useAuth} from "./hooks/useAuth";
import LoginScreen from "./components/LoginScreen";
import TrackerDashboard from "./components/TrackerDashboard";

function App() {
  const { user, loading } = useAuth();

  if (loading){
      return <p>Loading... </p>;
    }
    return user ? <TrackerDashboard /> : <LoginScreen />;
}

  export default App;

