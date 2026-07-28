import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useApplications } from "../hooks/useApplications";
import Modal from "../components/Modal";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationCard from "../components/ApplicationCard";


export default function TrackerDashboard() {

    const {user, logout} = useAuth();
    const {applications, addApplication, updateApplication, deleteApplication, loading} = useApplications();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingApp, setEditingApp] = useState();

    const handleAdd = async (data) => {
        if (editingApp) {
            await updateApplication(editingApp.id, data);
        } else {
            await addApplication(data);
        }
        setModalOpen(false);
        setEditingApp(null);
    };

    const handleEdit = (app) => {
        setEditingApp(app);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm("Delete this application?")) {
            await deleteApplication(id);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setEditingApp(null);
    }

    return (
        <div style={{ maxWidth: 700, margin: "40px auto", padding: 24}}>

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
                ) : applications.length === 0 ? (
                    <p style={{ marginTop: 24, color: "#888" }}>No applications yet. Add your first one!</p>
                ) : (
                    <div style={{ marginTop: 24 }}>
                    {applications.map((app) => (
                        <ApplicationCard
                        key={app.id}
                        application={app}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        />
                    ))}
                    </div>
                )}

            <Modal isOpen={modalOpen} onClose={handleCloseModal}>
                <ApplicationForm 
                 initialData={editingApp}
                 onSubmit={handleAdd}
                 onCancel={handleCloseModal} />
            </Modal> 
        </div>
    );
}