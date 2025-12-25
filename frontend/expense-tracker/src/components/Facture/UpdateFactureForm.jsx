import { useState, useEffect } from "react";
import Input from "../Inputs/Input";

const UpdateFactureForm = ({ onUpdate, facture: initialFacture }) => {
  const [facture, setFacture] = useState({
    _id: "",
    title: "",
    amount: "",
    dueDate: "",
    status: "",
  });

  useEffect(() => {
    if (initialFacture) {
      setFacture({
        _id: initialFacture._id,
        title: initialFacture.title,
        amount: initialFacture.amount,
        dueDate:
          initialFacture.dueDate?.split("T")[0] || initialFacture.dueDate,
        status: initialFacture.status,
      });
    }
  }, [initialFacture]);
  const handleChange = (key, value) => setFacture({ ...facture, [key]: value });

  return (
    <div>
      <Input
        value={facture.title}
        onChange={({ target }) => handleChange("title", target.value)}
        label="Title"
        placeholder="electricity, water, etc."
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
          onClick={() => onUpdate(facture)}
        >
          Update Facture
        </button>
      </div>
    </div>
  );
};

export default UpdateFactureForm;
