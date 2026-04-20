

"use client";
import { useState } from "react";

export default function PartC() {
  const [serial, setSerial] = useState("");
  const [result, setResult] = useState(null);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");  // This maps to ModelNumber in DB

  const handleSearch = async () => {
    if (!serial.trim()) {
      alert("Please enter a serial number");
      return;
    }

    try {
      const res = await fetch(`/api/search?serial=${encodeURIComponent(serial)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Search failed");
        setResult(null);
        setBrand("");
        setModel("");
        return;
      }

      alert(data.message);
      
      // Set the result and form fields from the response
      setResult(data);
      setBrand(data.brand || "");
      setModel(data.model || "");  // model contains ModelNumber from DB
      
    } catch (error) {
      console.error("Search error:", error);
      alert("An error occurred during search");
    }
  };

  const handleUpdate = async () => {
    if (!serial) {
      alert("No appliance selected to update");
      return;
    }

    try {
      const res = await fetch("/api/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          serial: serial,  // SerialNumber
          brand: brand,    // Brand
          model: model     // ModelNumber
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Update failed");
        return;
      }

      alert(data.message || "Updated successfully");
      
      // Refresh the data after update
      await handleSearch();
      
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred during update");
    }
  };

  const handleDelete = async () => {
    if (!serial) {
      alert("No appliance selected to delete");
      return;
    }

    if (!confirm(`Are you sure you want to delete appliance with serial number: ${serial}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/delete?serial=${encodeURIComponent(serial)}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      alert(data.message || "Deleted successfully");
      
      // Reset all form fields
      setResult(null);
      setSerial("");
      setBrand("");
      setModel("");
      
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred during deletion");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      padding: "20px",
      backgroundColor: "#f5f5f5"
    }}>
      <div
        style={{
          padding: "30px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "450px",
          textAlign: "center",
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Appliance Management</h2>

        <input
          placeholder="Serial Number"
          value={serial}
          style={{ 
            margin: "10px 0", 
            width: "100%", 
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "14px"
          }}
          onChange={(e) => setSerial(e.target.value)}
        />

        <button
          onClick={handleSearch}
          style={{ 
            marginTop: "10px", 
            padding: "10px", 
            width: "100%",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          Search Appliance
        </button>

        {result && (
          <div style={{ marginTop: "25px", borderTop: "1px solid #eee", paddingTop: "20px" }}>
            <h3 style={{ marginBottom: "15px", color: "#0070f3" }}>Appliance Details</h3>
            
            <div>
              <label style={{ display: "block", marginTop: "10px", fontWeight: "bold", textAlign: "left" }}>
                Brand
              </label>
              <input
                value={brand}
                style={{ 
                  margin: "5px 0 15px 0", 
                  width: "100%", 
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "5px"
                }}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: "block", marginTop: "10px", fontWeight: "bold", textAlign: "left" }}>
                Model Number
              </label>
              <input
                value={model}
                style={{ 
                  margin: "5px 0 15px 0", 
                  width: "100%", 
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "5px"
                }}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>

            {result.applianceType && (
              <div style={{ textAlign: "left", marginTop: "10px", color: "#666" }}>
                <small>Type: {result.applianceType}</small>
              </div>
            )}

            <button
              onClick={handleUpdate}
              style={{ 
                marginTop: "15px", 
                padding: "10px", 
                width: "100%",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold"
              }}
            >
              Update Appliance
            </button>

            <button
              onClick={handleDelete}
              style={{ 
                marginTop: "10px", 
                padding: "10px", 
                width: "100%",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold"
              }}
            >
              Delete Appliance
            </button>
          </div>
        )}
      </div>
    </div>
  );
}