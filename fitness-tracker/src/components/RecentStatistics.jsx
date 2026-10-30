import React from "react";
import { FaEdit, FaTrash, FaFire, FaUtensils } from "react-icons/fa";

const RecentStatistics = ({ records, onEdit, onDelete }) => {
  const sortedRecords = [...records].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <section className="statistics-section">
      <div className="section-heading">
        <div>
          <h2>Recent Health Statistics</h2>
          <p>Track your daily fitness activities</p>
        </div>
      </div>

      {sortedRecords.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <FaHeartbeatFallback />
          </div>
          <h3>No records yet</h3>
          <p>Add your first health record to get started!</p>
        </div>
      ) : (
        <div className="records-list">
          {sortedRecords.map((record) => (
            <div className="record-card" key={record.id}>
              <div className="record-date">
                <span className="date-day">
                  {new Date(record.date + "T00:00:00").getDate()}
                </span>
                <span>
                  {new Date(record.date + "T00:00:00").toLocaleDateString(
                    "en-US",
                    { month: "short" }
                  )}
                </span>
              </div>

              <div className="record-details">
                <h3>{record.description}</h3>

                <div className="record-metrics">
                  <span>
                    <FaUtensils />
                    Calories Intake = {record.caloriesIntake}
                  </span>

                  <span>
                    <FaFire />
                    Calories Burned = {record.caloriesBurned}
                  </span>
                </div>

                <small>{record.date}</small>
              </div>

              <div className="record-actions">
                <button
                  className="edit-btn"
                  onClick={() => onEdit(record)}
                  aria-label="Edit record"
                >
                  <FaEdit />
                </button>

                <button
                  className="delete-btn"
                  onClick={() => onDelete(record.id)}
                  aria-label="Delete record"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

// Small fallback icon
const FaHeartbeatFallback = () => <FaUtensils />;

export default RecentStatistics;