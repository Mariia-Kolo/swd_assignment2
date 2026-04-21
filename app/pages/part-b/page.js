//registre

"use client";
import { Grey_Qo } from "next/font/google";
import { useState } from "react";

export default function PartB() {

  //store data in fields
  const [form, setForm] = useState({
    //info fields
    firstName:"",
    lastName:"",
    address:"",
    mobile:"",
    email:"",
    eircode:"",
    type:"Fridge",
    brand:"",
    model:"",
    serial:"",
    purchaseDate:"",
    warranty:"",
    cost:""
  });
  const handleChange=(e)=>{
    //create copy of form state
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit = async (e) => {
    //prevent default behaviour
    e.preventDefault();

    //send request to api to add data
    const res=await fetch("/api/add", {
      method: "POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(form)
    });

    //check for errors
    if (!res.ok) {
      //make api response
      const err = await res.json();
      //error message
      alert(err.message);
      return;
    }else{
      //make api response
      const data = await res.json();
      //success message
      alert(data.message);
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

      <form
        onSubmit={handleSubmit}
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          width: "500px",
          textAlign: "center"
        }}
      >

        <h2>Register Appliance</h2>
        
        <input
          name="firstName"
          placeholder="First Name"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={handleChange}
          required
        />

        <input
          name="lastName"
          placeholder="Last Name"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={handleChange}
          required
        />

        <input
          name="address"
          placeholder="Address"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={handleChange}
          required
        />

        <input
          name="mobile"
          placeholder="Mobile"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={handleChange}
          required
        />

        <input
          name="eircode"
          placeholder="Eircode"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={handleChange}
          required
        />

        <select
          name="type"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={handleChange}
        >
          <option>Fridge</option>
          <option>Washing Machine</option>
          <option>TV</option>
        </select>

        <input
          name="brand"
          placeholder="Brand"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={handleChange}
          required
        />

        <input
          name="model"
          placeholder="Model (123-123-1234)"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={handleChange}
          required
        />

        <input
          name="serial"
          placeholder="Serial (1234-1234-1234)"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={handleChange}
          required
          />

        <p style={{display: "flex", justifyContent: "left"}}>Purchase date:</p>
        <input
          name="purchaseDate"
          type="date"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={handleChange}
          require="true"
          />

        <p style={{display: "flex", justifyContent: "left"}}>Warranty expiration date:</p>
        <input
          name="warranty"
          type="date"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={handleChange}
          require="true"
        />

        <input
          name="cost"
          placeholder="Cost"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={handleChange}
        />

        <button style={{ marginTop: "10px", padding: "10px", width: "100%"}}>
          Submit
        </button>

      </form>
    </div>
  );
}

