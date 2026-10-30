import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import HealthForm from "./components/HealthForm";
import RecentStatistics from "./components/RecentStatistics";
import WeeklyTrends from "./components/WeeklyTrends";
import OverallData from "./components/OverallData";

function App() {
  const [records, setRecords] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("healthAndFitness")
      ) || [];
    } catch {
      return [];
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  useEffect(() => {
    localStorage.setItem("healthAndFitness", JSON.stringify(records));
  }, [records]);

  const handleAdd = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

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

  const handleDelete = (id) => {
    setRecords((previousRecords) =>
      previousRecords.filter((record) => record.id !== id)
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
  };

  return (
    <div className="app">
      <Header />

      <main className="main-container">
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

        {/* Always visible form heading */}
        <section className="update-section">
          <h2>Update Today's Data</h2>
          <p>Keep your daily health and fitness records updated.</p>
        </section>

        <div className="dashboard-grid">
          <RecentStatistics
            records={records}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <OverallData records={records} />
        </div>

        {records.length > 0 && (
          <WeeklyTrends records={records} />
        )}
      </main>

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