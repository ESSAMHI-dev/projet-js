import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import { useTranslation } from "react-i18next";

const colors = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }) => {
  const { t } = useTranslation();
  const balanceData = [
    { name: t("total_Balance"), amount: totalBalance },
    { name: t("total_expense"), amount: totalExpenses },
    { name: t("total_income"), amount: totalIncome },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg dark:text-gray-100">{t("financial_overview")}</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label={t("total_Balance")}
        totalAmount={`${totalBalance}`}
        colors={colors}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
