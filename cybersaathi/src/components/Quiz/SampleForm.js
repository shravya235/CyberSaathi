import React, { useState } from "react";
import "./SampleForm.css";

const SampleForm = ({ onSelect }) => {
  const [userType, setUserType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userType) {
      alert("Please select a user type before proceeding!");
      return;
    }

    console.log("User type selected:", userType);
    console.log("Calling onSelect with:", userType);
    onSelect(userType);
  };

  const handleUserTypeSelect = (type) => {
    setUserType(type);
  };

  const userTypes = [
    { value: "Student", label: "Student", description: "Currently studying" },
    { value: "Professional", label: "Professional", description: "Working professional" },
    { value: "Others", label: "Other", description: "General user" }
  ];

  return (
    <div className="sample-form-container">
      <div className="sample-form-content">
        <h1 className="sample-form-title">CyberSaathi Quiz</h1>
        <p className="sample-form-subtitle">
          Select your demographic to receive personalized cyber safety tips
        </p>

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Select Your Demographic
              </label>
              <div className="user-type-options">
                {userTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`user-type-option ${userType === type.value ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      value={type.value}
                      checked={userType === type.value}
                      onChange={() => handleUserTypeSelect(type.value)}
                      required
                    />
                    <div>
                      <div className="font-semibold">{type.label}</div>
                      <div className="text-sm opacity-80">{type.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={!userType}
            >
              Continue to Tips
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SampleForm;
