
import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import HealthForm from "./components/HealthForm";
import RecentStatistics from "./components/RecentStatistics";
import WeeklyTrends from "./components/WeeklyTrends";
import OverallData from "./components/OverallData";

function App() {
  const [records, setRecords] = useState(() => {
    try {
      const savedRecords = localStorage.getItem("healthAndFitness");
      return savedRecords ? JSON.parse(savedRecords) : [];
    } catch (error) {
      return [];
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  // Persist records in localStorage
  useEffect(() => {
    localStorage.setItem(
      "healthAndFitness",
      JSON.stringify(records)
    );
  }, [records]);

  // Open Add Data modal
  const handleAdd = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  // Open Edit Data modal
  const handleEdit = (record) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  // Add or update record
  const handleSubmit = (formData) => {
    if (editingRecord) {
      setRecords((previousRecords) =>
        previousRecords.map((record) =>
          record.id === editingRecord.id
            ? { ...record, ...formData }
            : record
        )
      );
    } else {
      const newRecord = {
        ...formData,
        id: Date.now().toString(),
      };

      setRecords((previousRecords) => [
        ...previousRecords,
        newRecord,
      ]);
    }

    setIsModalOpen(false);
    setEditingRecord(null);
  };

  // Delete record
  const handleDelete = (id) => {
    setRecords((previousRecords) =>
      previousRecords.filter((record) => record.id !== id)
    );
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
  };

  // Check whether any record exists in the last 7 calendar days
  const hasWeeklyData = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);

    return records.some((record) => {
      const recordDate = new Date(record.date + "T00:00:00");

      return (
        recordDate >= sevenDaysAgo &&
        recordDate <= today
      );
    });
  };

  // Calculate total calorie intake
  const totalIntake = records.reduce(
    (sum, record) =>
      sum + Number(record.caloriesIntake),
    0
  );

  // Calculate total calories burned
  const totalBurned = records.reduce(
    (sum, record) =>
      sum + Number(record.caloriesBurned),
    0
  );

  return (
    <div className="app">
      <Header />

      <main className="main-container">

        {/* Welcome Section */}
        <section className="welcome-section">
          <div>
            <span className="welcome-label">
              YOUR HEALTH DASHBOARD
            </span>

            <h1>Health And Fitness Tracker</h1>

            <p>
              Track your daily nutrition, monitor your activity,
              and stay consistent with your fitness goals.
            </p>
          </div>

          <button
            className="add-btn"
            onClick={handleAdd}
            type="button"
          >
            + Add data
          </button>
        </section>

        {/* Update Today's Data Heading */}
        <section className="update-section">
          <h2>Update Today's Data</h2>

          <p>
            Keep your daily health and fitness records updated.
          </p>
        </section>

        {/* Summary Cards */}
        <section className="summary-grid">

          <div className="summary-card intake-card">
            <div className="summary-icon">
              <span>🍽️</span>
            </div>

            <div>
              <p>Total Calories Intake</p>

              <h2>
                {totalIntake.toLocaleString()}
              </h2>

              <span>kcal overall</span>
            </div>
          </div>

          <div className="summary-card burned-card">
            <div className="summary-icon">
              <span>🔥</span>
            </div>

            <div>
              <p>Total Calories Burned</p>

              <h2>
                {totalBurned.toLocaleString()}
              </h2>

              <span>kcal overall</span>
            </div>
          </div>

        </section>

        {/* Recent Statistics and Overall Data */}
        <div className="dashboard-grid">

          <RecentStatistics
            records={records}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <OverallData records={records} />

        </div>

        {/* Show Weekly Chart Only When Recent Data Exists */}
        {hasWeeklyData() && (
          <WeeklyTrends records={records} />
        )}

      </main>

      {/* Add/Edit Modal */}
      <HealthForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        editingRecord={editingRecord}
      />

    </div>
  );
}

export default App;
