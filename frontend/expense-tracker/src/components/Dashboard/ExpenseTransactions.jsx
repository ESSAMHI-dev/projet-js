import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import { useTranslation } from "react-i18next";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  const { t } = useTranslation();
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg dark:text-gray-100">{t("expenses")}</h5>

        <button className="card-btn" onClick={onSeeMore}>
          {t("see_more")} <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5).map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("MMM D, YYYY")}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
