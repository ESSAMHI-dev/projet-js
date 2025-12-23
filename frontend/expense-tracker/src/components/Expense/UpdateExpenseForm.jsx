import { useState, useEffect } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const UpdateExpenseForm = ({ onUpdate, expense: initialExpense }) => {
  const [expense, setExpense] = useState({
    _id: "",
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  useEffect(() => {
    if (initialExpense) {
      setExpense({
        _id: initialExpense._id,
        category: initialExpense.category,
        amount: initialExpense.amount,
        date: initialExpense.date?.split('T')[0] || initialExpense.date,
        icon: initialExpense.icon,
      });
    }
  }, [initialExpense]);

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
        label="Category"
        placeholder="Food, Transport, etc."
        type="text"
      />
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onUpdate(expense)}
        > 
          Update Expense
        </button>
      </div>
    </div>
  );
};

export default UpdateExpenseForm;
