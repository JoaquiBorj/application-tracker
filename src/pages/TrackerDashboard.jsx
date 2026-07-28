import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useApplications } from "../hooks/useApplications";
import Modal from "../components/Modal";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationCard from "../components/ApplicationCard";
import StatsPanel from "../components/StatsPanel";
import FilterBar from "../components/FilterBar";


export default function TrackerDashboard() {

    const {user, logout} = useAuth();
    const {applications, addApplication, updateApplication, deleteApplication, loading} = useApplications();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingApp, setEditingApp] = useState();
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest");

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

    const filteredApplications = applications
        .filter((app) => statusFilter === "all" || app.status === statusFilter)
        .sort((a,b) => {
            const dateA = new Date(a.dateApplied);
            const dateB = new Date(b.dateApplied);
            return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

    return (
        <div style={{ maxWidth: 700, margin: "40px auto", padding: 24}}>

            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h1>Job Application Tracker</h1>
                <button onClick={logout}>
                    Logout
                </button>
            </div>
            <p>Logged in as: {user?.email}</p>

            <StatsPanel applications={applications} />

            <button onClick={() => setModalOpen(true)}>+ Add Application </button>
            
            <FilterBar 
             statusFilter={statusFilter}
             setStatusFilter={setStatusFilter}
             sortOrder={sortOrder}
             setSortOrder={setSortOrder}
             />

            {loading ? (
                <p>Loading...</p>
            ) : applications.length === 0 ? (
                <p style={{ marginTop: 24, color: "#888" }}>No applications yet. Add your first one!</p>
            ) : (
                <div style={{ marginTop: 24 }}>
                {filteredApplications.map((app) => (
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