"use client";
import { Grey_Qo } from "next/font/google";
import { useState } from "react";

export default function PartB() {

  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setMessage(data.message);
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

        <h2>Inventory Form</h2>

        <input
          placeholder="Eircode"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={(e)=>setForm({...form,eircode:e.target.value})}
        />

        <select
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={(e)=>setForm({...form,type:e.target.value})}
        >
          <option value="">Select Type</option>
          <option>Fridge</option>
          <option>Washing Machine</option>
          <option>TV</option>
        </select>

        <input
          placeholder="Brand"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={(e)=>setForm({...form,brand:e.target.value})}
        />

        <input
          placeholder="Model (123-123-1234)"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={(e)=>setForm({...form,model:e.target.value})}
        />

        <input
          placeholder="Serial (1234-1234-1234)"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={(e)=>setForm({...form,serial:e.target.value})}
        />

        <p style={{ margin: "10px 0 0 0", width: "45%" }}>Purchase date:</p>
        <input
          type="date"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={(e)=>setForm({...form,purchase:e.target.value})}
        />

        <p style={{ margin: "10px 0 0 0", width: "70%"}}>Warranty expiration date:</p>
        <input
          type="date"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={(e)=>setForm({...form,warranty:e.target.value})}
        />

        <button style={{ marginTop: "10px", padding: "10px", width: "100%"}}>
          Add to Inventory
        </button>

        <p style={{ marginTop: "10px" }}>{message}</p>

      </form>
    </div>
  );
}

