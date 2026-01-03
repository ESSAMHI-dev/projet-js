import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import { useTranslation } from "react-i18next";

const AddExpenseForm = ({ onAddExpense }) => {
  const { t } = useTranslation();
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(SelectedIcon) => handleChange("icon", SelectedIcon)}
      />

      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label={t("category")}
        placeholder={t("category_placeholder")}
        type="text"
      />
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label={t("amount")}
        placeholder=""
        type="number"
      />
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label={t("date")}
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(expense)}
        > 
          {t("add_expense")}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
