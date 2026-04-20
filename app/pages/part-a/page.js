"use client";
import { useState } from "react";

export default function PartA() {

  const movies = {
    'Wuthering Heights': ["10:00", "14:00"],
    'The Drama': ["12:00", "18:00"],
    'Project Hail Mary': ["16:00", "20:00"]
  };

  const [movie, setMovie] = useState("");
  const [showtime, setShowtime] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!movie || !showtime || !mobile.match(/^\d{9}$/)) {
      setMessage("Error: Fill all fields correctly");
      return;
    }

    setMessage(`Booking confirmed for ${movie} at ${showtime}`);
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
        <h2>Book Ticket</h2>

        <select
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={(e) => setMovie(e.target.value)}
        >
          <option value="">Select Movie</option>
          {Object.keys(movies).map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <select
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={(e) => setShowtime(e.target.value)}
        >
          <option value="">Select Showtime</option>
          {movie &&
            movies[movie].map((t) => (
              <option key={t}>{t}</option>
            ))}
        </select>

        <input
          type="text"
          placeholder="Mobile"
          style={{ margin: "10px 0", width: "100%", padding: "8px" }}
          onChange={(e) => setMobile(e.target.value)}
        />

        <button
          style={{
            marginTop: "10px",
            padding: "10px",
            width: "100%"
          }}
        >
          Book Tickets
        </button>

        <p style={{ marginTop: "10px" }}>{message}</p>
      </form>
    </div>
  );
}
