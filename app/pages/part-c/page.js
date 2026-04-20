//search, update, delete

"use client";
import { useState } from "react";

export default function PartC() {

  const [form, setForm] = useState({
    eircode: "", type: "", brand: "",
    model: "", serial: "", purchase: "", warranty: ""
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/validate", {
      method: "POST",
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      setErrors({});
      alert("Success!");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>

      <form
        onSubmit={handleSubmit}
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          width: "300px",
          textAlign: "center"
        }}
      >

        <h2>Inventory Validation</h2>

        <input
          value={form.eircode}
          placeholder="Eircode"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={(e)=>setForm({form,eircode:e.target.value})}
        />
        <p style={{ color: "red" }}>{errors.eircode}</p>

        <input
          value={form.brand}
          placeholder="Brand"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={(e)=>setForm({form,brand:e.target.value})}
        />
        <p style={{ color: "red" }}>{errors.brand}</p>

        <button style={{ marginTop: "10px", padding: "10px", width: "100%" }}>
          Validate
        </button>

      </form>
    </div>
  );
}