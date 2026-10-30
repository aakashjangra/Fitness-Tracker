import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#7357e8", "#ff9b54"];

const OverallData = ({ records }) => {
  const totalIntake = records.reduce(
    (sum, record) => sum + Number(record.caloriesIntake),
    0
  );

  const totalBurned = records.reduce(
    (sum, record) => sum + Number(record.caloriesBurned),
    0
  );

  const data = [
    { name: "Calories Intake", value: totalIntake },
    { name: "Calories Burned", value: totalBurned },
  ];

  return (
    <section className="chart-card overall-chart">
      <div className="chart-heading">
        <div>
          <h2>Overall Data</h2>
          <p>Your overall fitness summary</p>
        </div>
      </div>

      <div className="overall-total">
        <div>
          <span>Total Intake</span>
          <h3>{totalIntake.toLocaleString()} kcal</h3>
        </div>

        <div>
          <span>Total Burned</span>
          <h3>{totalBurned.toLocaleString()} kcal</h3>
        </div>
      </div>

      <div className="chart-container pie-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="75%"
              innerRadius="48%"
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default OverallData;