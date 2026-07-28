import StatusBadge from "./StatusBadge";

export default function ApplicationCard({ application, onEdit, onDelete }) {
    return (
        <div
         style={{
            border: "1px solid #ddd",
            borderradius: 8,
            padding: 16,
            marginBottom: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
         }}
        >
            <div>
                <h3 style ={{ margin: "0 0 4px"}}>{application.position}</h3>
                <p style = {{ margin:"0 0 4px", color: "#555"}}>
                    Applied: {application.dateApplied} {application.location} && `· ${application.location}`
                </p>
                <StatusBadge status={application.status} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => onEdit(application)}>
                    Edit
                    </button>
                <button onClick={() => onDelete(application.id)}>
                    Delete
                    </button>
            </div>
        </div>
    )
}