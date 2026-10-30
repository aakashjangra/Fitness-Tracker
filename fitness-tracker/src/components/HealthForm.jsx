import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const HealthForm = ({ isOpen, onClose, onSubmit, editingRecord }) => {
  const [formData, setFormData] = useState({
    date: "",
    caloriesIntake: "",
    caloriesBurned: "",
    description: "",
  });

  useEffect(() => {
    if (editingRecord) {
      setFormData({
        date: editingRecord.date,
        caloriesIntake: editingRecord.caloriesIntake,
        caloriesBurned: editingRecord.caloriesBurned,
        description: editingRecord.description,
      });
    } else {
      setFormData({
        date: new Date().toLocaleDateString("en-CA"),
        caloriesIntake: "",
        caloriesBurned: "",
        description: "",
      });
    }
  }, [editingRecord, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.date ||
      formData.caloriesIntake === "" ||
      formData.caloriesBurned === "" ||
      !formData.description.trim()
    ) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <IoClose />
        </button>

        <h2>
          {editingRecord
            ? "Let's see what you want to change!"
            : "Update Today's Data"}
        </h2>

        <p className="modal-subtitle">
          {editingRecord
            ? "Make changes to your health statistics."
            : "Keep track of your daily health and fitness."}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Calories Intake</label>
            <input
              type="number"
              name="caloriesIntake"
              placeholder="Enter Today's Calorie Intake"
              value={formData.caloriesIntake}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Calories Burned</label>
            <input
              type="number"
              name="caloriesBurned"
              placeholder="Enter Today's Calorie Burned"
              value={formData.caloriesBurned}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Short Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter a short description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              Submit
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthForm;