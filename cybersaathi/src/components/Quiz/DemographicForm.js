"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DemographicForm() {
  const [demographic, setDemographic] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mapping selection to appropriate level route
    if (demographic === "others") router.push("/level1");
    else if (demographic === "student") router.push("/level2");
    else if (demographic === "professional") router.push("/level3");
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "2rem 0" }}>
      <label>
        Select your demographic:&nbsp;
        <select
          value={demographic}
          onChange={(e) => setDemographic(e.target.value)}
          required
        >
          <option value="">Select...</option>
          <option value="others">Others</option>
          <option value="student">Student</option>
          <option value="professional">Professional</option>
        </select>
      </label>
      <button style={{ marginLeft: "1rem" }} type="submit">
        Continue
      </button>
    </form>
  );
}
