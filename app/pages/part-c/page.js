//validate, apdate and delete
"use client";

import { useState } from "react";

export default function PartC() {
  //Stores the value entered by the user for search
  const [serial, setSerial] = useState("");
  //conditionaly display update and delete fields
  const [result, setResult] = useState(null);
  //display current values
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const handleSearch = async () => {
    //validate field is not empty
    if (!serial.trim()) {
      alert("Please enter a serial number");
      return;
    }

    //requestt api search
    try {
      const res = await fetch(`/api/search?serial=${encodeURIComponent(serial)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      //response from api
      const data = await res.json();

      //check if response is not error
      if (!res.ok) {
        //display error message
        alert(data.message || "Search failed");
        setResult(null);
        setBrand("");
        setModel("");
        return;
      }

      //display success message
      alert(data.message);
      
      //update state
      setResult(data);
      setBrand(data.brand || "");
      setModel(data.model || "");
      
      //handle other errors
    } catch (error) {
      console.error("Search error:", error);
      alert("An error occurred during search");
    }
  };

  //handle updadte 
  const handleUpdate = async () => {
    if (!serial) {
      alert("No appliance selected to update");
      return;
    }

    try {
      //send api request to nupdate data
      const res = await fetch("/api/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          serial: serial,
          brand: brand,
          model: model
        })
      });

      //get api's response
      const data = await res.json();

      //error message
      if (!res.ok) {
        alert(data.message || "Update failed");
        return;
      }

      //success message
      alert(data.message || "Updated successfully");
      
      // Refresh the data after update
      await handleSearch();
      
      //handle possible errors
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred during update");
    }
  };

  //send api request to delete data
  const handleDelete = async () => {
    //in case nothing is entered
    if (!serial) {
      alert("No appliance selected to delete");
      return;
    }

    //double verification
    if (!confirm(`Are you sure you want to delete appliance with serial number: ${serial}?`)) {
      return;
    }

    //delete data from api
    try {
      const res = await fetch(`/api/delete?serial=${encodeURIComponent(serial)}`, {
        method: "DELETE"
      });

      //get api's response
      const data = await res.json();

      //error message
      if (!res.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      //success message
      alert(data.message || "Deleted successfully");
      
      //clear fields
      setResult(null);
      setSerial("");
      setBrand("");
      setModel("");
      
      //handle possible errors
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred during deletion");
    }
  };

  //css and UI
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      marginTop: "130px",
      marginBottom: "130px"
    }}>
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          width: "500px",
          textAlign: "center"
        }}
      >
        <h2>Validate/Update/Delete Appliance</h2>

        <input
          placeholder="Serial Number"
          value={serial}
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={(e) => setSerial(e.target.value)}
        />

        <button
          onClick={handleSearch}
          style={{ marginTop: "10px", padding: "10px", width: "100%" }}
        >
          Search
        </button>

        {result && (
          <div style={{ marginTop: "20px" }}>
            <p style={{ display: "flex", justifyContent: "left", marginBottom: "5px" }}>Brand:</p>
            <input
              value={brand}
              style={{ margin: "10px 0", width: "100%", padding: "8px" }}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Brand"
            />

            <p style={{ display: "flex", justifyContent: "left", marginBottom: "5px" }}>Model Number:</p>
            <input
              value={model}
              style={{ margin: "10px 0", width: "100%", padding: "8px" }}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Model Number"
            />

            {result.applianceType && (
              <p style={{ display: "flex", justifyContent: "left", fontSize: "14px", color: "#666", marginTop: "10px" }}>
                Type: {result.applianceType}
              </p>
            )}

            <button
              onClick={handleUpdate}
              style={{ marginTop: "10px", padding: "10px", width: "100%" }}
            >
              Update
            </button>

            <button
              onClick={handleDelete}
              style={{ marginTop: "10px", padding: "10px", width: "100%" }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}