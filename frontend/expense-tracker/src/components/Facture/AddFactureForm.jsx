import React, { useState } from "react";
import Input from "../Inputs/Input";

const AddFactureForm = ({ onAddFacture }) => {
  const [facture, setFacture] = useState({
    title: "",
    amount: "",
    dueDate: "",
    status: "",
  });

  const handleChange = (key, value) => setFacture({ ...facture, [key]: value });
  return (
    <div>
      <Input
        value={facture.title}
        onChange={({ target }) => handleChange("title", target.value)}
        label="Facture Title"
        placeholder="Water Bill, Electricity Bill, etc."
        type="text"
      />

      <Input
        value={facture.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />

      <Input
        value={facture.dueDate}
        onChange={({ target }) => handleChange("dueDate", target.value)}
        label="Due Date"
        placeholder=""
        type="date"
      />

      <label>Status</label>
      <select
        value={facture.status}
        onChange={({ target }) => handleChange("status", target.value)}
        className="w-full p-2 border input-box border-gray-300 rounded mt-1 mb-4  dark:bg-slate-700 text-black dark:text-white"
      >
        <option value="">Select Status</option>
        <option value="paid">paid</option>
        <option value="unpaid">unpaid</option>
      </select>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddFacture(facture)}
        >
          Add Facture
        </button>
      </div>
    </div>
  );
};

export default AddFactureForm;
