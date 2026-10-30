import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const WeeklyTrends = ({ records }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6);

  const weeklyRecords = records
    .filter((record) => {
      const recordDate = new Date(record.date + "T00:00:00");
      return recordDate >= sevenDaysAgo && recordDate <= today;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = weeklyRecords.map((record) => ({
    date: new Date(record.date + "T00:00:00").toLocaleDateString(
      "en-US",
      { day: "numeric", month: "short" }
    ),
    intake: Number(record.caloriesIntake),
    burned: Number(record.caloriesBurned),
  }));

  return (
    <section className="chart-card weekly-chart">
      <div className="chart-heading">
        <div>
          <h2>Weekly Health Trends</h2>
          <p>Your calorie intake and burned over the last 7 days</p>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="intake"
              name="Calories Intake"
              fill="#7357e8"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="burned"
              name="Calories Burned"
              fill="#ff9b54"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default WeeklyTrends;