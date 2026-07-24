import { useAuth } from "../hooks/useAuth";

export default function TrackerDashboard() {

    const {user, logout} = useAuth();

    return (
        <div style={{ maxWidth: 600, margin: "40px auto", padding: 24}}>

            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h1>Job Application Tracker</h1>
                <button onClick={logout}>
                    Logout
                </button>
            </div>

                <p>Logged in as: {user?.email}</p>
                <p style={{ marginTop: 24, color: "#888"}}>
                    Application list and dashboard state will go here.
                </p>

        </div>
    );
}