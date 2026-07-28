import { useState } from "react";
import { STATUS, STATUS_LABELS, STATUS_OPTIONS } from "../utils/constants";

const emptyForm = {
    company: "",
    position: "",
    jobPostingUrl: "",
    location: "",
    dateApplied: "",
    status: STATUS.APPLIED,
    source: "",
    notes: "",
};

export default function ApplicationForm({ initialData, onSubmit, onCancel}) {
    const [form, setForm] = useState(initialData || emptyForm);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData ? "Edit application" : "Add application"}</h2>

      <label>Company</label>
      <input name="company" value={form.company} onChange={handleChange} required style={inputStyle} />

      <label>Position</label>
      <input name="position" value={form.position} onChange={handleChange} required style={inputStyle} />

      <label>Job posting URL</label>
      <input name="jobPostingUrl" value={form.jobPostingUrl} onChange={handleChange} style={inputStyle} />

      <label>Location</label>
      <input name="location" value={form.location} onChange={handleChange} style={inputStyle} />

      <label>Date applied</label>
      <input type="date" name="dateApplied" value={form.dateApplied} onChange={handleChange} required style={inputStyle} />

      <label>Status</label>
      <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>{STATUS_LABELS[s]}</option>
        ))}
      </select>

      <label>Source</label>
      <input name="source" value={form.source} onChange={handleChange} placeholder="LinkedIn, referral, etc." style={inputStyle} />

      <label>Notes</label>
      <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} style={inputStyle} />

      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <button type="submit">{initialData ? "Save changes" : "Add"}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

const inputStyle = { width: "100%", padding: 8, marginBottom: 12, display: "block" } ;