import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useApplications } from "../hooks/useApplications";
import Modal from "../components/Modal";
import ApplicationForm from "../components/ApplicationForm";


export default function TrackerDashboard() {

    const {user, logout} = useAuth();
    const {applications, addApplication, loading} = useApplications();
    const [modalOpen, setModalOpen] = useState(false);

    const handleAdd = async (data) => {
        await addApplication(data);
        setModalOpen(false);
    };

    return (
        <div style={{ maxWidth: 600, margin: "40px auto", padding: 24}}>

            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h1>Job Application Tracker</h1>
                <button onClick={logout}>
                    Logout
                </button>
            </div>
            <p>Logged in as: {user?.email}</p>

            <button onClick={() => setModalOpen(true)}>+ Add Application </button>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ marginTop: 24 }}>
                    <p>{applications.length} application(s) so far.</p>
                    {/* Application list goes here */}
                </div>
            )}

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <ApplicationForm onSubmit={handleAdd} onCancel={() => setModalOpen(false)} />
            </Modal> 
        </div>
    );
}