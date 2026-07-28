import { STATUS_LABELS, STATUS_COLORS } from "../utils/constants";

export default function StatusBadge({ status }) {
    return (
        <span style={{backgroundColor: STATUS_COLORS[status],
            color: "#fff",
            padding: "2px 10px",
            borderRadius: 12,
            fontSize: 12,
            fontWeight: 600,
        }}>
            {STATUS_LABELS[status]}
        </span>
    );
}