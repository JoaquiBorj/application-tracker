import {STATUS_LABELS, STATUS_OPTIONS} from "../utils/constants";

export default function FilterBar({ statusFilter, setStatusFilter, sortOrder, setSortOrder}) {
    return (
        <div style={{
            display: "flex",
            gap: 12,
            marginBottom: 16
        }}>
            <select
             value={statusFilter}
             onchange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">
                    All statuses
                </option>
                {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                        {STATUS_LABELS[s]}
                    </option>
                ))}
            </select>

            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
            </select>
        </div>
    )
} 