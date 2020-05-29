import React from "react";

export default function Input({ type, name, value, label, errorMsg, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      />
      {errorMsg && <div className="text-danger">{errorMsg}</div>}
    </div>
  );
}
