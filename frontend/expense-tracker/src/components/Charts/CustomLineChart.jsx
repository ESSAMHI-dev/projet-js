import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
} from "recharts";

const CustomLineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-2 border border-gray-300 dark:border-slate-600">
          <p className="text-xs font-semibold text-purple-800 dark:text-purple-400 mb-1">
            {payload[0].payload.date}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Expense:{" "}
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              ${payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }
  };

  return (
    <div className="bg-transparent">
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke="none" />
        <XAxis
          dataKey="category"
          tick={{ fontSize: 12, fill: "#555" }}
          stroke="none"
        />
        <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
        <Tooltip content={<CustomTooltip />} />

        <Area
          type="monotone"
          dataKey="amount"
          stroke="#875cf5"
          fill="url(#incomeGradient)"
          strokeWidth={3}
          dot={{ r: 3, fill: "#ab8df8" }}
        />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
