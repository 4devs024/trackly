import React, { useState } from "react";
import { postAPI } from "../../api/ApiHandler";

function AddBusTemp() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [directorId, setDirectorId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const busData = { title, year: parseInt(year), directorId };

    try {
        const response = await fetch("http://localhost:9091/buses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(busData),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            console.log("Bus added:", data);
        } else {
            console.error("Error adding bus:", data);
        }
    } catch (error) {
        console.error("Error adding bus:", error);
    }
};


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Year"
      />
      <input
        type="text"
        value={directorId}
        onChange={(e) => setDirectorId(e.target.value)}
        placeholder="Director ID"
      />
      <button type="submit">Add Bus</button>
    </form>
  );
}

export default AddBusTemp;
