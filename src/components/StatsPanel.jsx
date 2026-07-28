import { STATUS, STATUS_LABELS } from "../utils/constants";

export default function StatsPanel({ applications}) {
    const counts = Object.values(STATUS).reduce((acc, status) => {
        acc[status] = applications.filter((app) => app.status === status).length;
        return acc;
    }, {});

    return (
        <div
         style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 24,
            padding: 16,
            border: "1px solid #ddd",
            borderRadius: 8,
         }}
         >
            <div>
                <strong>{applications.length}</strong>
                <div style={{ fontSize: 12, color: "#888"}}>Total</div>
            </div>
            {Object.values(STATUS).map((status) => (
                <div key={status}>
                    <strong>{counts[status]}</strong>
                    <div style={{ fontSize: 12, color: "#888"}}>
                        {STATUS_LABELS[status]}
                        </div>
                </div>
            ))}
        </div>
    )
}