import { useState, useEffect } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const UpdateIncomeForm = ({ onUpdate, income: initialIncome }) => {
  const [income, setIncome] = useState({
    _id: "",
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  useEffect(() => {
    if (initialIncome) {
      setIncome({
        _id: initialIncome._id,
        source: initialIncome.source,
        amount: initialIncome.amount,
        date: initialIncome.date?.split('T')[0] || initialIncome.date,
        icon: initialIncome.icon,
      });
    }
  }, [initialIncome]);

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(SelectedIcon) => handleChange("icon", SelectedIcon)}
      />

      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Source"
        placeholder="Salary, Freelance, etc."
        type="text"
      />
      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />
      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onUpdate(income)}
        > 
          Update Income
        </button>
      </div>
    </div>
  );
};

export default UpdateIncomeForm;
